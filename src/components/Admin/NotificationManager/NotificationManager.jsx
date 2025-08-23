import React, { useState } from 'react';
import { useNotifications } from '../../../hooks/useNotifications';
import { useAdminAuth } from '../../../contexts/AdminAuthContext';
import { FaBell, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaYoutube } from 'react-icons/fa';

const NotificationManager = () => {
  const { admin } = useAdminAuth();
  const {
    notifications,
    loading,
    error,
    fetchAllNotifications,
    createNotification,
    updateNotification,
    deleteNotification,
    toggleNotificationStatus,
    formatTimeAgo
  } = useNotifications();

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    youtube_link: ''
  });

  // Load all notifications when component mounts
  React.useEffect(() => {
    fetchAllNotifications();
  }, []);

  const handleAddNotification = async (e) => {
    e.preventDefault();
    try {
      await createNotification(formData);
      setFormData({ title: '', message: '', youtube_link: '' });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  };

  const handleEditNotification = async (e) => {
    e.preventDefault();
    try {
      await updateNotification(editingNotification.id, formData);
      setFormData({ title: '', message: '', youtube_link: '' });
      setShowEditModal(false);
      setEditingNotification(null);
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  const handleDeleteNotification = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await deleteNotification(id);
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    }
  };

  const openEditModal = (notification) => {
    setEditingNotification(notification);
    setFormData({
      title: notification.title,
      message: notification.message,
      youtube_link: notification.youtube_link
    });
    setShowEditModal(true);
  };

  const resetForm = () => {
    setFormData({ title: '', message: '', youtube_link: '' });
    setEditingNotification(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-base-content flex items-center gap-2">
          <FaBell className="text-primary" />
          Notification Manager
        </h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary text-white flex items-center gap-2"
        >
          <FaPlus />
          Add Notification
        </button>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>Error: {error}</span>
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-base-content/60">
            No notifications found. Create your first notification!
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`border rounded-lg p-4 ${
                notification.is_active ? 'border-success/20 bg-success/10' : 'border-base-300 bg-base-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-base-content">{notification.title}</h3>
                    {notification.is_active ? (
                      <span className="badge badge-success badge-sm">Active</span>
                    ) : (
                      <span className="badge badge-secondary badge-sm">Inactive</span>
                    )}
                  </div>
                  <p className="text-base-content/70 mb-2">{notification.message}</p>
                  {notification.youtube_link && (
                    <div className="flex items-center gap-2 text-sm text-base-content/60">
                      <FaYoutube className="text-error" />
                      <a
                        href={notification.youtube_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        YouTube Link
                      </a>
                    </div>
                  )}
                  <p className="text-xs text-base-content/50 mt-2">
                    Created: {formatTimeAgo(notification.created_at)}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => toggleNotificationStatus(notification.id, !notification.is_active)}
                    className="btn btn-sm btn-ghost"
                    title={notification.is_active ? 'Deactivate' : 'Activate'}
                  >
                    {notification.is_active ? <FaEyeSlash /> : <FaEye />}
                  </button>
                  <button
                    onClick={() => openEditModal(notification)}
                    className="btn btn-sm btn-ghost text-info"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteNotification(notification.id)}
                    className="btn btn-sm btn-ghost text-error"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Notification Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-base-content">Add New Notification</h3>
            <form onSubmit={handleAddNotification}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Title *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">YouTube Link</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered"
                  value={formData.youtube_link}
                  onChange={(e) => setFormData({ ...formData, youtube_link: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Add Notification
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Notification Modal */}
      {showEditModal && editingNotification && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4 text-base-content">Edit Notification</h3>
            <form onSubmit={handleEditNotification}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Title *</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Message</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">YouTube Link</span>
                </label>
                <input
                  type="url"
                  className="input input-bordered"
                  value={formData.youtube_link}
                  onChange={(e) => setFormData({ ...formData, youtube_link: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update Notification
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => {
                    setShowEditModal(false);
                    resetForm();
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;
