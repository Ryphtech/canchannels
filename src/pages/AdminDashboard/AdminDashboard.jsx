import React, { useState, useEffect } from 'react'
import PostCard from '../../components/PostCard/PostCard'
import AddPostModal from '../../components/AddPostModal/AddPostModal'
import EditPostModal from '../../components/EditPostModal/EditPostModal'

const AdminDashboard = () => {
  const [theme, setTheme] = useState('light')
  const [posts, setPosts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingPost, setEditingPost] = useState(null)

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  // Initialize with sample posts
  useEffect(() => {
    const initialPosts = [
      {
        id: 1,
        title: "Tech Giants Announce Record-Breaking Quarterly Earnings",
        subtitle: "Major technology companies report unprecedented growth in Q3",
        date: "August 14, 2024",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        featured: true,
        image: null, // Placeholder for featured post without image
        links: []
      },
      {
        id: 2,
        title: "New Scientific Discovery Promises Breakthrough in Medicine",
        subtitle: "Researchers uncover potential treatment for chronic diseases",
        date: "August 13, 2024",
        content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        featured: false,
        image: null,
        links: []
      },
      {
        id: 3,
        title: "Travel Restrictions Lifted: Popular Destinations Reopen",
        subtitle: "Tourism industry sees surge as borders reopen worldwide",
        date: "August 11, 2024",
        content: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        featured: false,
        image: null,
        links: []
      },
      {
        id: 4,
        title: "Music Festival Sells Out in Record Time: Lineup Revealed",
        subtitle: "Artists from around the world to perform at the annual event",
        date: "August 9, 2024",
        content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        featured: false,
        image: null,
        links: []
      },
      {
        id: 5,
        title: "Educational Reforms Aim to Improve Student Outcomes",
        subtitle: "New policies focus on personalized learning and technology integration",
        date: "August 7, 2024",
        content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
        featured: false,
        image: null,
        links: []
      }
    ]
    setPosts(initialPosts)
  }, [])

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Handle post deletion
  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(posts.filter(post => post.id !== postId))
    }
  }

  // Handle post editing
  const handleEditPost = (postId) => {
    const postToEdit = posts.find(post => post.id === postId)
    if (postToEdit) {
      setEditingPost(postToEdit)
      setShowEditModal(true)
    }
  }

  // Handle adding new post
  const handleAddPost = (newPost) => {
    const post = {
      ...newPost,
      id: Math.max(...posts.map(p => p.id), 0) + 1,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      }),
      // Convert image file to URL for display (in a real app, you'd upload to a server)
      image: newPost.image ? URL.createObjectURL(newPost.image) : null,
      // Include the links array
      links: newPost.links || []
    }
    setPosts([post, ...posts])
    setShowAddModal(false)
  }

  // Handle updating existing post
  const handleUpdatePost = (postId, updatedPost) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          ...updatedPost,
          // Handle image update - if new image uploaded, create URL, otherwise keep existing
          image: updatedPost.image && updatedPost.image !== post.image 
            ? (typeof updatedPost.image === 'string' ? updatedPost.image : URL.createObjectURL(updatedPost.image))
            : post.image,
          // Update links
          links: updatedPost.links || []
        }
      }
      return post
    }))
    setShowEditModal(false)
    setEditingPost(null)
  }

  // Handle closing edit modal
  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setEditingPost(null)
  }

  const featuredPost = posts.find(post => post.featured)
  const regularPosts = posts.filter(post => !post.featured)
  const sidebarPosts = regularPosts.slice(0, 5)
  const gridPosts = regularPosts.slice(0, 3)

  return (
    <div data-theme={theme} className="max-w-7xl mx-auto px-4 py-8 bg-base-100 min-h-screen transition-colors duration-300">
      {/* Theme Toggle Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="btn btn-primary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Post
          </button>
        </div>
        
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-primary shadow-lg"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-3 space-y-8">
          {/* Featured Post Section */}
          {featuredPost && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-base-content">Featured Post</h1>
              
              <PostCard
                post={featuredPost}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                isFeatured={true}
              />
            </div>
          )}

          {/* Secondary Content/Article Previews */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-base-content">Recent Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {gridPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  isFeatured={false}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* All Posts Heading */}
          <div className="border-b border-base-300 pb-2">
            <h3 className="text-xl font-bold text-base-content">
              All Posts ({posts.length})
            </h3>
          </div>

          {/* Posts List Area */}
          <div className="space-y-4">
            {sidebarPosts.map((post) => (
              <div key={post.id} className="p-4 bg-base-200 rounded-lg relative group">
                <h4 className="text-sm font-medium text-base-content leading-tight hover:text-primary cursor-pointer transition-colors duration-200 pr-16">
                  {post.title}
                </h4>
                <p className="text-xs text-base-content/60 mt-1">
                  {post.date}
                </p>
                
                {/* Action buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
                  <button
                    onClick={() => handleEditPost(post.id)}
                    className="btn btn-xs btn-primary"
                    title="Edit post"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    className="btn btn-xs btn-error"
                    title="Delete post"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Post Modal */}
      {showAddModal && (
        <AddPostModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddPost}
        />
      )}

      {/* Edit Post Modal */}
      {showEditModal && editingPost && (
        <EditPostModal
          post={editingPost}
          onClose={handleCloseEditModal}
          onSubmit={handleUpdatePost}
        />
      )}
    </div>
  )
}

export default AdminDashboard
