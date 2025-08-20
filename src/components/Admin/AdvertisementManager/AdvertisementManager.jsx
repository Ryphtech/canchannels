import React, { useState, useEffect } from 'react';
import { advertisementsService } from '../../../backend/advertisementsService';
import AddAdvertisementModal from './AddAdvertisementModal';
import EditAdvertisementModal from './EditAdvertisementModal';

const AdvertisementManager = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAd, setEditingAd] = useState(null);
  const [filterPosition, setFilterPosition] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fetch advertisements
  const fetchAdvertisements = async () => {
    setLoading(true);
    try {
      const data = await advertisementsService.fetchAdvertisements();
      setAdvertisements(data);
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding new advertisement
  const handleAddAdvertisement = async (adData) => {
    try {
      await advertisementsService.addAdvertisement(adData);
      await fetchAdvertisements();
      setShowAddModal(false);
      alert('Advertisement added successfully!');
    } catch (error) {
      console.error('Error adding advertisement:', error);
      alert('Failed to add advertisement. Please try again.');
    }
  };

  // Handle editing advertisement
  const handleEditAdvertisement = async (adData) => {
    try {
      await advertisementsService.updateAdvertisement(editingAd.id, adData);
      await fetchAdvertisements();
      setShowEditModal(false);
      setEditingAd(null);
      alert('Advertisement updated successfully!');
    } catch (error) {
      console.error('Error updating advertisement:', error);
      alert('Failed to update advertisement. Please try again.');
    }
  };

  // Handle deleting advertisement
  const handleDeleteAdvertisement = async (id) => {
    if (window.confirm('Are you sure you want to delete this advertisement?')) {
      try {
        await advertisementsService.deleteAdvertisement(id);
        await fetchAdvertisements();
        alert('Advertisement deleted successfully!');
      } catch (error) {
        console.error('Error deleting advertisement:', error);
        alert('Failed to delete advertisement. Please try again.');
      }
    }
  };

  // Handle toggling advertisement status
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await advertisementsService.toggleAdvertisementStatus(id, !currentStatus);
      await fetchAdvertisements();
      alert(`Advertisement ${!currentStatus ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error toggling advertisement status:', error);
      alert('Failed to update advertisement status. Please try again.');
    }
  };

  // Open edit modal
  const openEditModal = (advertisement) => {
    setEditingAd(advertisement);
    setShowEditModal(true);
  };

  // Filter advertisements
  const filteredAdvertisements = advertisements.filter(ad => {
    const matchesPosition = filterPosition === 'all' || ad.position === filterPosition;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && ad.is_active) || 
      (filterStatus === 'inactive' && !ad.is_active);
    return matchesPosition && matchesStatus;
  });

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const positions = [
    { value: 'homepage-top', label: 'Homepage Top' },
    { value: 'homepage-sidebar', label: 'Homepage Sidebar' },
    { value: 'hero-section', label: 'Hero Section' },
    { value: 'can-posts-sidebar', label: 'Can Posts Sidebar' },
    { value: 'content-page-sidebar', label: 'Content Page Sidebar' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-base-content">Advertisement Management</h2>
          <p className="text-base-content/70 text-sm sm:text-base mt-1">Manage advertisements across the user panel</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn btn-primary btn-sm sm:btn-md gap-2 w-full sm:w-auto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">Add Advertisement</span>
          <span className="sm:hidden">Add Ad</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-base-200 rounded-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="label">
              <span className="label-text text-sm font-medium">Position</span>
            </label>
            <select
              value={filterPosition}
              onChange={(e) => setFilterPosition(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Positions</option>
              {positions.map(pos => (
                <option key={pos.value} value={pos.value}>{pos.label}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="label">
              <span className="label-text text-sm font-medium">Status</span>
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Advertisements List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex items-center gap-3">
              <div className="loading loading-spinner loading-lg text-primary"></div>
              <span className="text-base-content/70 text-sm sm:text-base">Loading advertisements...</span>
            </div>
          </div>
        ) : filteredAdvertisements.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {filteredAdvertisements.map((ad) => (
              <div key={ad.id} className="bg-base-200 rounded-lg p-4 sm:p-6 space-y-4">
                {/* Advertisement Image */}
                <div className="relative">
                  <img
                    src={ad.image_url}
                    alt={ad.title}
                    className="w-full h-32 sm:h-40 object-contain rounded-lg"
                  />
                  <div className="absolute top-2 left-2">
                    <span className={`badge badge-sm ${ad.is_active ? 'badge-success' : 'badge-error'}`}>
                      {ad.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="badge badge-sm badge-primary">{ad.position}</span>
                  </div>
                </div>

                {/* Advertisement Details */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-base-content text-sm sm:text-base line-clamp-2">
                    {ad.title}
                  </h3>
                  <p className="text-base-content/70 text-xs sm:text-sm line-clamp-2">
                    {ad.description}
                  </p>
                  <div className="text-xs text-base-content/60">
                    <p>Link: <a href={ad.link_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline truncate">{ad.link_url}</a></p>
                    <p>Created: {new Date(ad.created_at).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => openEditModal(ad)}
                    className="btn btn-sm btn-outline gap-2 flex-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleStatus(ad.id, ad.is_active)}
                    className={`btn btn-sm gap-2 flex-1 ${ad.is_active ? 'btn-warning' : 'btn-success'}`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {ad.is_active ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDeleteAdvertisement(ad.id)}
                    className="btn btn-sm btn-error gap-2 flex-1"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-base-content/40 text-4xl sm:text-6xl mb-4">📢</div>
            <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-2">
              {filterPosition !== 'all' || filterStatus !== 'all' ? 'No advertisements found' : 'No advertisements yet'}
            </h3>
            <p className="text-base-content/60 mb-6 text-sm sm:text-base">
              {filterPosition !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your filter criteria'
                : 'Get started by creating your first advertisement'
              }
            </p>
            {filterPosition === 'all' && filterStatus === 'all' && (
              <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary gap-2 btn-sm sm:btn-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                <span className="hidden sm:inline">Create Your First Advertisement</span>
                <span className="sm:hidden">Create Ad</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Advertisement Modal */}
      {showAddModal && (
        <AddAdvertisementModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddAdvertisement}
          positions={positions}
        />
      )}

      {/* Edit Advertisement Modal */}
      {showEditModal && editingAd && (
        <EditAdvertisementModal
          onClose={() => {
            setShowEditModal(false);
            setEditingAd(null);
          }}
          onSubmit={handleEditAdvertisement}
          advertisement={editingAd}
          positions={positions}
        />
      )}
    </div>
  );
};

export default AdvertisementManager;
