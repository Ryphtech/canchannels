import React, { useState, useEffect } from 'react';
import { postsService } from '../../../backend/postsService';

const RecentUploadsModal = ({ onClose, onSelectImage }) => {
  const [recentImages, setRecentImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageLoadStates, setImageLoadStates] = useState({});

  useEffect(() => {
    fetchRecentImages();
  }, []);

  const fetchRecentImages = async () => {
    try {
      setLoading(true);
      setError(null);
      const images = await postsService.fetchRecentContentImages(50);
      setRecentImages(images);
    } catch (err) {
      setError('Failed to load recent images. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageSelect = (imageUrl) => {
    onSelectImage(imageUrl);
    onClose();
  };

  const handleImageLoad = (imageUrl) => {
    setImageLoadStates(prev => ({
      ...prev,
      [imageUrl]: 'loaded'
    }));
  };

  const handleImageError = (imageUrl) => {
    setImageLoadStates(prev => ({
      ...prev,
      [imageUrl]: 'error'
    }));
  };



  const filteredImages = recentImages.filter(image =>
    image.postTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-base-100 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="text-gray-600">Loading recent images...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-base-content">Recent Uploads</h2>
              <p className="text-base-content/60 mt-1">
                Select from previously uploaded content images
              </p>
            </div>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="form-control">
              <input
                type="text"
                placeholder="Search images by post title or URL..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>



                                           {/* Error State */}
            {error && (
              <div className="alert alert-error mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

          {/* Images Grid */}
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🖼️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {searchTerm ? 'No images found' : 'No recent images'}
              </h3>
              <p className="text-gray-600">
                {searchTerm 
                  ? 'Try adjusting your search terms' 
                  : 'Upload some content images first to see them here'
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image, index) => (
                                 <div
                   key={`${image.url}-${index}`}
                   className="group cursor-pointer bg-base-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:scale-105"
                   onClick={() => handleImageSelect(image.url)}
                 >
                                       <div className="relative aspect-square bg-gray-100">
                      {/* Error State */}
                      {imageLoadStates[image.url] === 'error' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                          <div className="text-center">
                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <div className="text-sm text-gray-500">Image Unavailable</div>
                          </div>
                        </div>
                      )}
                     
                      <img
                        src={image.url}
                        alt={`Recent upload ${index + 1}`}
                        className="w-full h-full object-cover"
                        onLoad={() => handleImageLoad(image.url)}
                        onError={() => handleImageError(image.url)}
                        style={{ minHeight: '200px' }}
                      />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                        Select
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm font-medium text-base-content line-clamp-2 mb-1">
                      {image.postTitle}
                    </div>
                    <div className="text-xs text-base-content/60">
                      Used in: {image.usedIn}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

                                           {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-base-300 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={fetchRecentImages}
                className="btn btn-outline"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RecentUploadsModal;
