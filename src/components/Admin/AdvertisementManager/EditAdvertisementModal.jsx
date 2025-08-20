import React, { useState } from 'react';
import { supabase } from '../../../backend/supabaseClient';

const EditAdvertisementModal = ({ onClose, onSubmit, advertisement, positions }) => {
  const [formData, setFormData] = useState({
    title: advertisement.title || '',
    description: advertisement.description || '',
    image_url: advertisement.image_url || '',
    link_url: advertisement.link_url || '',
    position: advertisement.position || 'homepage-top',
    is_active: advertisement.is_active !== undefined ? advertisement.is_active : true
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    if (!formData.image_url && !imageFile) {
      alert('Please provide an image URL or upload an image');
      return;
    }

    if (!formData.link_url.trim()) {
      alert('Please enter a link URL');
      return;
    }

    try {
      setUploading(true);
      let finalImageUrl = formData.image_url;

      // Upload image if file is selected
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `ad-${Date.now()}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('advertisement-images')
          .upload(fileName, imageFile);

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          alert('Failed to upload image. Please try again.');
          return;
        }

        // Get public URL for the uploaded image
        const { data: urlData } = supabase.storage
          .from('advertisement-images')
          .getPublicUrl(fileName);
        
        finalImageUrl = urlData.publicUrl;
      }

      // Prepare advertisement data
      const advertisementData = {
        ...formData,
        image_url: finalImageUrl
      };

      await onSubmit(advertisementData);
    } catch (error) {
      console.error('Error updating advertisement:', error);
      alert('Failed to update advertisement. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      setImageFile(file);
      setFormData(prev => ({ ...prev, image_url: '' })); // Clear URL when file is selected

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImageFile = () => {
    setImageFile(null);
    setImagePreview(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-base-content">Edit Advertisement</h2>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Title *</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter advertisement title"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter advertisement description (optional)"
                className="textarea textarea-bordered w-full h-24 resize-none"
              />
            </div>

            {/* Position */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Position *</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                required
              >
                {positions.map(pos => (
                  <option key={pos.value} value={pos.value}>{pos.label}</option>
                ))}
              </select>
            </div>

            {/* Link URL */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Link URL *</span>
              </label>
              <input
                type="url"
                name="link_url"
                value={formData.link_url}
                onChange={handleInputChange}
                placeholder="https://example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Current Image Preview */}
            {!imageFile && formData.image_url && (
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Current Image</span>
                </label>
                <div className="relative">
                  <img
                    src={formData.image_url}
                    alt="Current advertisement"
                    className="w-full h-48 object-contain rounded-lg border border-base-300"
                  />
                </div>
              </div>
            )}

            {/* Image Section */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Update Image</span>
              </label>
              
              {/* Image URL Input */}
              <div className="mb-4">
                <input
                  type="url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="input input-bordered w-full"
                  disabled={!!imageFile}
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Enter new image URL or upload an image file below
                </p>
              </div>

              {/* Image Upload */}
              <div className="border-2 border-dashed border-base-300 rounded-lg p-6 text-center hover:border-primary transition-colors duration-200">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="hidden"
                  id="ad-image-upload-edit"
                  disabled={!!formData.image_url}
                />
                <label
                  htmlFor="ad-image-upload-edit"
                  className={`cursor-pointer flex flex-col items-center gap-2 ${formData.image_url ? 'opacity-50' : ''}`}
                >
                  <svg className="w-12 h-12 text-base-content/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <div className="text-base-content/60">
                    <span className="font-medium text-primary">Click to upload</span> or drag and drop
                  </div>
                  <div className="text-sm text-base-content/40">
                    PNG, JPG, GIF up to 5MB
                  </div>
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded-lg border border-base-300"
                  />
                  <button
                    type="button"
                    onClick={removeImageFile}
                    className="absolute top-2 right-2 btn btn-sm btn-circle btn-error shadow-lg"
                    title="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="mt-2 text-sm text-base-content/60 text-center">
                    {imageFile?.name} ({(imageFile?.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                </div>
              )}
            </div>

            {/* Active Status */}
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text font-medium">Active Status</span>
                <input
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="checkbox checkbox-primary"
                />
              </label>
              <p className="text-xs text-base-content/60 ml-4">
                Active advertisements will be displayed on the user panel
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline flex-1"
                disabled={uploading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex-1"
                disabled={uploading}
              >
                {uploading ? (
                  <>
                    <div className="loading loading-spinner loading-sm"></div>
                    Updating...
                  </>
                ) : (
                  'Update Advertisement'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAdvertisementModal;
