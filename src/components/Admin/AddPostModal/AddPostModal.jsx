import React, { useState } from 'react'

const AddPostModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: '',
    keywords: '',
    content: '',
    featured: false,
    image: null,
    links: []
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [currentLink, setCurrentLink] = useState({ url: '', title: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }
    if (!formData.category) {
      alert('Please select a category')
      return
    }
    
    // Debug logging
    console.log('=== ADD POST MODAL DEBUG ===');
    console.log('FormData being submitted:', formData);
    console.log('Links array:', formData.links);
    console.log('Links length:', formData.links.length);
    console.log('=== END DEBUG ===');
    
    onSubmit(formData)
    setFormData({
      title: '',
      subtitle: '',
      category: '',
      keywords: '',
      content: '',
      featured: false,
      image: null,
      links: []
    })
    setImagePreview(null)
    setCurrentLink({ url: '', title: '' })
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file')
        return
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB')
        return
      }

      setFormData(prev => ({
        ...prev,
        image: file
      }))

      // Create preview URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null
    }))
    setImagePreview(null)
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]')
    if (fileInput) fileInput.value = ''
  }

  const handleLinkChange = (e) => {
    const { name, value } = e.target
    setCurrentLink(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addLink = () => {
    if (!currentLink.url.trim()) {
      alert('Please enter a URL')
      return
    }

    // Basic URL validation
    try {
      new URL(currentLink.url)
    } catch (error) {
      alert('Please enter a valid URL (e.g., https://example.com)')
      return
    }

    const newLink = {
      id: Date.now(),
      url: currentLink.url.trim(),
      title: currentLink.title.trim() || currentLink.url.trim()
    }

    setFormData(prev => ({
      ...prev,
      links: [...prev.links, newLink]
    }))

    setCurrentLink({ url: '', title: '' })
  }

  const removeLink = (linkId) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter(link => link.id !== linkId)
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-base-100 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-base-content">Add New Post</h2>
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
                placeholder="Enter post title"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Subtitle */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Subtitle</span>
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="Enter post subtitle (optional)"
                className="input input-bordered w-full"
              />
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Category *</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select a category</option>
                <option value="can-news">Can News</option>
                <option value="can-exclusive">Can Exclusive</option>
                <option value="cinema">Cinema</option>
                <option value="general">General</option>
              </select>
            </div>

            {/* Keywords */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Keywords</span>
              </label>
              <input
                type="text"
                name="keywords"
                value={formData.keywords}
                onChange={handleInputChange}
                placeholder="Enter keywords separated by commas (e.g., news, politics, technology)"
                className="input input-bordered w-full"
              />
              <div className="text-sm text-base-content/60 mt-1">
                Keywords help users find related content and improve search suggestions
              </div>
            </div>

            {/* Content */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Content</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter post content (optional)"
                className="textarea textarea-bordered w-full h-32 resize-none"
              />
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Post Image</span>
              </label>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-base-300 rounded-lg p-6 text-center hover:border-primary transition-colors duration-200">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
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
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-base-300"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 btn btn-sm btn-circle btn-error shadow-lg"
                    title="Remove image"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="mt-2 text-sm text-base-content/60 text-center">
                    {formData.image?.name} ({(formData.image?.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                </div>
              )}
            </div>

            {/* Link Attachments */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Attach Links</span>
              </label>
              
              {/* Add Link Form */}
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    name="url"
                    value={currentLink.url}
                    onChange={handleLinkChange}
                    placeholder="Enter URL (e.g., https://example.com)"
                    className="input input-bordered flex-1"
                  />
                  <input
                    type="text"
                    name="title"
                    value={currentLink.title}
                    onChange={handleLinkChange}
                    placeholder="Link title (optional)"
                    className="input input-bordered flex-1"
                  />
                  <button
                    type="button"
                    onClick={addLink}
                    className="btn btn-primary"
                    title="Add link"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                {/* Display Added Links */}
                {formData.links.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-base-content/70">
                      Attached Links ({formData.links.length}):
                    </div>
                    {formData.links.map((link) => (
                      <div key={link.id} className="flex items-center gap-2 p-3 bg-base-200 rounded-lg">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-base-content truncate">
                            {link.title}
                          </div>
                          <div className="text-xs text-base-content/60 truncate">
                            {link.url}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLink(link.id)}
                          className="btn btn-xs btn-error"
                          title="Remove link"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Featured checkbox */}
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="checkbox checkbox-primary"
                />
                <span className="label-text font-medium">Mark as Featured Post</span>
              </label>
              <div className="text-sm text-base-content/60 ml-8">
                Featured posts appear prominently at the top of the page
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-base-300">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddPostModal
