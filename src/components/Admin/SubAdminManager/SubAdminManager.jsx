import React, { useState, useEffect } from 'react';
import { supabase } from '../../../backend/supabaseClient';

const SubAdminManager = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'moderator',
    permissions: {
      managePosts: false,
      manageAdvertisements: false,
      manageUsers: false,
      systemSettings: false
    }
  });

  // Fetch existing sub-admins
  const fetchSubAdmins = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .in('role', ['admin', 'moderator', 'editor'])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching sub-admins:', error);
        return;
      }

      setSubAdmins(data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubAdmins();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-set permissions based on role selection
    if (name === 'role') {
      const rolePermissions = {
        editor: {
          managePosts: true,
          manageAdvertisements: false,
          manageUsers: false,
          systemSettings: false
        },
        moderator: {
          managePosts: true,
          manageAdvertisements: true,
          manageUsers: false,
          systemSettings: false
        },
        admin: {
          managePosts: true,
          manageAdvertisements: true,
          manageUsers: true,
          systemSettings: true
        }
      };
      
      setFormData(prev => ({
        ...prev,
        permissions: rolePermissions[value] || prev.permissions
      }));
    }
  };

  // Handle permission changes
  const handlePermissionChange = (permission) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [permission]: !prev.permissions[permission]
      }
    }));
  };

  // Create new sub-admin
  const handleCreateSubAdmin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Create user using regular signup (this will trigger the profile creation)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: formData.role,
            permissions: formData.permissions
          }
        }
      });

      if (authError) {
        throw authError;
      }

      if (authData.user) {
        // Wait a moment for the trigger to create the profile
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Update the profile with the correct role and permissions
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            role: formData.role,
            permissions: formData.permissions
          })
          .eq('id', authData.user.id);

        if (profileError) {
          console.warn('Could not update profile immediately:', profileError);
          // Try again after another delay
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const { error: retryError } = await supabase
            .from('profiles')
            .update({
              role: formData.role,
              permissions: formData.permissions
            })
            .eq('id', authData.user.id);
            
          if (retryError) {
            console.error('Failed to update profile after retry:', retryError);
            throw new Error('Profile created but role/permissions could not be set. Please update manually.');
          }
        }

        // Reset form and close modal
        setFormData({
          email: '',
          password: '',
          role: 'moderator',
          permissions: {
            managePosts: false,
            manageAdvertisements: false,
            manageUsers: false,
            systemSettings: false
          }
        });
        setShowAddModal(false);
        
        // Refresh the list
        await fetchSubAdmins();
        
        alert('Sub-admin created successfully! The user will receive an email confirmation.');
      }
    } catch (error) {
      console.error('Error creating sub-admin:', error);
      alert(`Failed to create sub-admin: ${error.message}`);
    }
  };

  // Delete sub-admin
  const handleDeleteSubAdmin = async (userId, email) => {
    if (!window.confirm(`Are you sure you want to delete ${email}? This action cannot be undone.`)) {
      return;
    }

    try {
      // Delete from profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);

      if (profileError) {
        throw profileError;
      }

      // Note: Auth user deletion requires server-side admin privileges
      // The user will be removed from the profiles table but may still exist in auth
      // You may need to manually delete them from Supabase Dashboard if needed
      console.log('Profile deleted. Auth user may need manual deletion from Supabase Dashboard.');

      await fetchSubAdmins();
      alert('Sub-admin profile deleted successfully! Note: Auth user may need manual deletion from Supabase Dashboard.');
    } catch (error) {
      console.error('Error deleting sub-admin:', error);
      alert(`Failed to delete sub-admin: ${error.message}`);
    }
  };

  // Update sub-admin role
  const handleRoleUpdate = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);

      if (error) {
        throw error;
      }

      await fetchSubAdmins();
      alert('Role updated successfully!');
    } catch (error) {
      console.error('Error updating role:', error);
      alert(`Failed to update role: ${error.message}`);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'admin': return 'badge-error';
      case 'moderator': return 'badge-warning';
      case 'editor': return 'badge-info';
      default: return 'badge-ghost';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-base-content">Sub-Admin Management</h2>
          <p className="text-base-content/70">Manage admin users and their permissions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Sub-Admin
        </button>
      </div>

      {/* Sub-Admins List */}
      <div className="bg-base-100 rounded-lg shadow-sm border border-base-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Current Sub-Admins</h3>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
          ) : subAdmins.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Permissions</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subAdmins.map((admin) => (
                    <tr key={admin.id}>
                      <td className="font-medium">{admin.email}</td>
                      <td>
                        <div className="dropdown dropdown-top">
                          <div tabIndex={0} role="button" className={`badge ${getRoleBadgeColor(admin.role)} cursor-pointer`}>
                            {admin.role}
                          </div>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32">
                            <li><button onClick={() => handleRoleUpdate(admin.id, 'editor')}>Editor</button></li>
                            <li><button onClick={() => handleRoleUpdate(admin.id, 'moderator')}>Moderator</button></li>
                            <li><button onClick={() => handleRoleUpdate(admin.id, 'admin')}>Admin</button></li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1">
                          {admin.permissions?.managePosts && <span className="badge badge-xs badge-success">Posts</span>}
                          {admin.permissions?.manageAdvertisements && <span className="badge badge-xs badge-success">Ads</span>}
                          {admin.permissions?.manageUsers && <span className="badge badge-xs badge-success">Users</span>}
                          {admin.permissions?.systemSettings && <span className="badge badge-xs badge-success">System</span>}
                        </div>
                      </td>
                      <td>{new Date(admin.created_at).toLocaleDateString()}</td>
                      <td>
                        <button
                          onClick={() => handleDeleteSubAdmin(admin.id, admin.email)}
                          className="btn btn-error btn-xs"
                          disabled={admin.role === 'admin'}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-base-content/70">No sub-admins found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Sub-Admin Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box w-11/12 max-w-2xl">
            <h3 className="font-bold text-lg mb-4">Add New Sub-Admin</h3>
            
            <form onSubmit={handleCreateSubAdmin} className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text">Email Address *</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="subadmin@example.com"
                    required
                  />
                </div>
                
                <div>
                  <label className="label">
                    <span className="label-text">Password *</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="editor">Editor - Basic content management</option>
                  <option value="moderator">Moderator - Content and ad management</option>
                  <option value="admin">Admin - Full system access</option>
                </select>
              </div>

              {/* Permissions */}
              <div>
                <label className="label">
                  <span className="label-text">Permissions</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.managePosts}
                      onChange={() => handlePermissionChange('managePosts')}
                      className="checkbox checkbox-sm"
                    />
                    <span>Manage Posts</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.manageAdvertisements}
                      onChange={() => handlePermissionChange('manageAdvertisements')}
                      className="checkbox checkbox-sm"
                    />
                    <span>Manage Advertisements</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.manageUsers}
                      onChange={() => handlePermissionChange('manageUsers')}
                      className="checkbox checkbox-sm"
                    />
                    <span>Manage Users</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.permissions.systemSettings}
                      onChange={() => handlePermissionChange('systemSettings')}
                      className="checkbox checkbox-sm"
                    />
                    <span>System Settings</span>
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="modal-action">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Sub-Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAdminManager;
