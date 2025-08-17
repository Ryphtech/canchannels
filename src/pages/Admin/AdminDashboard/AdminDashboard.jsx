import React, { useEffect, useState } from "react";
import { supabase } from "../../../backend/supabaseClient";
import PostCard from "../../../components/Admin/PostCard/PostCard";
import AddPostModal from "../../../components/Admin/AddPostModal/AddPostModal";
import EditPostModal from "../../../components/Admin/EditPostModal/EditPostModal";
import AdminHeader from "../../../components/Admin/AdminHeader/AdminHeader";
import AdvertisementManager from "../../../components/Admin/AdvertisementManager/AdvertisementManager";
import SubAdminManager from "../../../components/Admin/SubAdminManager/SubAdminManager";
import { useAdminAuth } from "../../../contexts/AdminAuthContext";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [userRole, setUserRole] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    recent: 0
  });
  
  const { admin } = useAdminAuth();

  // Fetch user role when admin changes
  useEffect(() => {
    const fetchUserRole = async () => {
      if (admin?.id) {
        try {
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', admin.id)
            .single();
          
          if (!error && profile?.role) {
            setUserRole(profile.role);
            
            // If user is not admin and tries to access subadmins tab, redirect to posts
            if (profile.role !== 'admin' && activeTab === 'subadmins') {
              setActiveTab('posts');
            }
          }
        } catch (error) {
          console.error('Error fetching user role:', error);
        }
      }
    };

    fetchUserRole();
  }, [admin, activeTab]);

  // Test Supabase connection
  const testConnection = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Database connection test failed:', error);
        alert(`Database connection failed: ${error.message}`);
      } else {
        console.log('Database connection successful');
        alert('Database connection successful!');
      }
    } catch (error) {
      console.error('Connection test error:', error);
      alert('Connection test failed. Check console for details.');
    }
  };

  // Test storage connection
  const testStorage = async () => {
    try {
      // Test if we can list files in the bucket
      const { data, error } = await supabase.storage
        .from('post-images')
        .list();
      
      if (error) {
        console.error('Storage test failed:', error);
        alert(`Storage test failed: ${error.message}`);
      } else {
        console.log('Storage connection successful');
        alert('Storage connection successful!');
      }
    } catch (error) {
      console.error('Storage test error:', error);
      alert('Storage test failed. Check console for details.');
    }
  };

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      // Ensure links field is always an array
      const processedData = (data || []).map(post => ({
        ...post,
        links: Array.isArray(post.links) ? post.links : []
      }));
      setPosts(processedData);
      updateStats(processedData);
    }
    setLoading(false);
  };

  // Update statistics
  const updateStats = (postsData) => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    setStats({
      total: postsData.length,
      featured: postsData.filter(post => post.featured).length,
      recent: postsData.filter(post => new Date(post.created_at) > oneWeekAgo).length
    });
  };

  // Handle adding new post
  const handleAddPost = async (postData) => {
    try {
      // Validate required fields
      if (!postData.title.trim()) {
        alert('Please enter a title for the post');
        return;
      }

      // Generate a UUID for the post ID
      const postId = Date.now(); // Use timestamp as integer ID instead of UUID
      
      // Handle image upload if present
      let imageUrl = null;
      if (postData.image) {
        // Check if storage is configured
        const storageEnabled = true; // Re-enabled now that policies are set up
        
        if (!storageEnabled) {
          console.log('Image upload disabled - continuing without image');
        } else {
          try {
            // Upload image to Supabase Storage
            const fileExt = postData.image.name.split('.').pop();
            const fileName = `${postId}.${fileExt}`;
            
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('post-images')
              .upload(fileName, postData.image);

            if (uploadError) {
              console.error('Error uploading image:', uploadError);
              console.error('Error details:', {
                message: uploadError.message,
                details: uploadError.details,
                hint: uploadError.hint,
                code: uploadError.code
              });
              // If storage bucket doesn't exist, continue without image
              if (uploadError.message.includes('bucket') || uploadError.message.includes('not found')) {
                console.warn('Storage bucket not found, continuing without image upload');
                alert('Image upload failed (storage not configured), but post will be created without image.');
              } else if (uploadError.message.includes('policy') || uploadError.message.includes('permission')) {
                console.error('Storage policy/permission error');
                alert('Image upload failed due to storage permissions. Please check storage policies.');
              } else {
                alert(`Failed to upload image: ${uploadError.message}`);
                return;
              }
            } else {
              // Get public URL for the uploaded image
              const { data: urlData } = supabase.storage
                .from('post-images')
                .getPublicUrl(fileName);
              
              imageUrl = urlData.publicUrl;
            }
          } catch (uploadError) {
            console.error('Error handling image upload:', uploadError);
            alert('Image upload failed, but post will be created without image.');
          }
        }
      }

      // Prepare post data for database
      const postToInsert = {
        id: postId,
        title: postData.title.trim(),
        subtitle: postData.subtitle?.trim() || null,
        content: postData.content?.trim() || null,
        featured: postData.featured || false,
        image: imageUrl,
        links: postData.links || [],
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from("posts")
        .insert([postToInsert])
        .select();

      if (error) {
        console.error("Error adding post:", error);
        alert(`Failed to add post: ${error.message}`);
      } else {
        await fetchPosts();
        setShowAddModal(false);
        alert("Post added successfully!");
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add post. Please try again.");
    }
  };

  // Handle editing post
  const handleEditPost = async (postData) => {
    try {
      // Validate required fields
      if (!postData.title.trim()) {
        alert('Please enter a title for the post');
        return;
      }

      // Handle image upload if a new image was selected
      let imageUrl = editingPost.image; // Keep existing image by default
      if (postData.image) {
        try {
          // Upload new image to Supabase Storage
          const fileExt = postData.image.name.split('.').pop();
          const fileName = `${editingPost.id}.${fileExt}`;
          
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('post-images')
            .upload(fileName, postData.image, { upsert: true }); // Overwrite existing file

          if (uploadError) {
            console.error('Error uploading image:', uploadError);
            if (uploadError.message.includes('bucket') || uploadError.message.includes('not found')) {
              console.warn('Storage bucket not found, continuing without image upload');
              alert('Image upload failed (storage not configured), but post will be updated without image.');
            } else if (uploadError.message.includes('policy') || uploadError.message.includes('permission')) {
              console.error('Storage policy/permission error');
              alert('Image upload failed due to storage permissions. Please check storage policies.');
            } else {
              alert(`Failed to upload image: ${uploadError.message}`);
              return;
            }
          } else {
            // Get public URL for the uploaded image
            const { data: urlData } = supabase.storage
              .from('post-images')
              .getPublicUrl(fileName);
            
            imageUrl = urlData.publicUrl;
          }
        } catch (uploadError) {
          console.error('Error handling image upload:', uploadError);
          alert('Image upload failed, but post will be updated without image.');
        }
      }

      // Prepare post data for database update
      const postToUpdate = {
        title: postData.title.trim(),
        subtitle: postData.subtitle?.trim() || null,
        content: postData.content?.trim() || null,
        featured: postData.featured || false,
        image: imageUrl,
        links: postData.links || []
      };

      const { data, error } = await supabase
        .from("posts")
        .update(postToUpdate)
        .eq("id", editingPost.id)
        .select();

      if (error) {
        console.error("Error updating post:", error);
        alert(`Failed to update post: ${error.message}`);
      } else {
        await fetchPosts();
        setShowEditModal(false);
        setEditingPost(null);
        alert("Post updated successfully!");
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert("Failed to update post. Please try again.");
    }
  };

  // Open edit modal for a specific post
  const openEditModal = (post) => {
    setEditingPost(post);
    setShowEditModal(true);
  };

  // Handle deleting post
  const handleDeletePost = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const { error } = await supabase
          .from("posts")
          .delete()
          .eq("id", postId);

        if (error) {
          console.error("Error deleting post:", error);
          alert("Failed to delete post. Please try again.");
        } else {
          await fetchPosts();
          alert("Post deleted successfully!");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Failed to delete post. Please try again.");
      }
    }
  };

  // Filter and search posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (post.subtitle && post.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === "all" || 
                         (filterType === "featured" && post.featured) ||
                         (filterType === "recent" && new Date(post.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesFilter;
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <AdminHeader />
      {/* Header */}
      <div className="bg-base-200 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Admin Dashboard</h1>
              <p className="text-base-content/70 mt-1 text-sm sm:text-base">Manage your content and posts</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-sm sm:btn-lg gap-2 w-full sm:w-auto"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">Add Post</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Tab Navigation */}
        <div className="tabs tabs-boxed bg-base-200 p-1 mb-6">
          <button
            className={`tab ${activeTab === 'posts' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Posts Management
          </button>
          <button
            className={`tab ${activeTab === 'advertisements' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('advertisements')}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Advertisement Management
          </button>
          {userRole === 'admin' && (
            <button
              className={`tab ${activeTab === 'subadmins' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('subadmins')}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Sub-Admin Management
            </button>
          )}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'posts' ? (
          <>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="stat bg-base-200 rounded-lg shadow-sm p-4 sm:p-6">
                <div className="stat-figure text-primary">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="stat-title text-sm sm:text-base">Total Posts</div>
                <div className="stat-value text-primary text-2xl sm:text-3xl">{stats.total}</div>
              </div>
              
              <div className="stat bg-base-200 rounded-lg shadow-sm p-4 sm:p-6">
                <div className="stat-figure text-secondary">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <div className="stat-title text-sm sm:text-base">Featured Posts</div>
                <div className="stat-value text-secondary text-2xl sm:text-3xl">{stats.featured}</div>
              </div>
              
              <div className="stat bg-base-200 rounded-lg shadow-sm p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
                <div className="stat-figure text-accent">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="stat-title text-sm sm:text-base">Recent (7 days)</div>
                <div className="stat-value text-accent text-2xl sm:text-3xl">{stats.recent}</div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="bg-base-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
              <div className="flex flex-col gap-4">
                {/* Search Bar */}
                <div className="w-full">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input input-bordered w-full pl-10"
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
                
                {/* Filters and Actions */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                  <div className="flex flex-col sm:flex-row gap-2 flex-1">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="select select-bordered w-full sm:w-auto"
                    >
                      <option value="all">All Posts</option>
                      <option value="featured">Featured Only</option>
                      <option value="recent">Recent (7 days)</option>
                    </select>
                    
                    <button
                      onClick={fetchPosts}
                      className="btn btn-outline gap-2 w-full sm:w-auto"
                      disabled={loading}
                    >
                      <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="hidden sm:inline">Refresh</span>
                      <span className="sm:hidden">Refresh</span>
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={testConnection}
                      className="btn btn-outline btn-sm gap-2 flex-1 sm:flex-none"
                      title="Test database connection"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="hidden sm:inline">Test DB</span>
                      <span className="sm:hidden">DB</span>
                    </button>
                    
                    <button
                      onClick={testStorage}
                      className="btn btn-outline btn-sm gap-2 flex-1 sm:flex-none"
                      title="Test storage connection"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="hidden sm:inline">Test Storage</span>
                      <span className="sm:hidden">Storage</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Posts Section */}
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-base-content">
                  {searchTerm || filterType !== "all" ? "Filtered Posts" : "All Posts"}
                  {filteredPosts.length > 0 && (
                    <span className="text-base-content/60 text-base sm:text-lg font-normal ml-2">
                      ({filteredPosts.length})
                    </span>
                  )}
                </h2>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-8 sm:py-12">
                  <div className="flex items-center gap-3">
                    <div className="loading loading-spinner loading-lg text-primary"></div>
                    <span className="text-base-content/70 text-sm sm:text-base">Loading posts...</span>
                  </div>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onEdit={() => openEditModal(post)}
                      onDelete={handleDeletePost}
                      isFeatured={post.featured}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-base-content/40 text-4xl sm:text-6xl mb-4">📝</div>
                  <h3 className="text-lg sm:text-xl font-semibold text-base-content mb-2">
                    {searchTerm || filterType !== "all" ? "No posts found" : "No posts yet"}
                  </h3>
                  <p className="text-base-content/60 mb-6 text-sm sm:text-base">
                    {searchTerm || filterType !== "all" 
                      ? "Try adjusting your search or filter criteria"
                      : "Get started by creating your first post"
                    }
                  </p>
                  {!searchTerm && filterType === "all" && (
                    <button
                      onClick={() => setShowAddModal(true)}
                      className="btn btn-primary gap-2 btn-sm sm:btn-md"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                      </svg>
                      <span className="hidden sm:inline">Create Your First Post</span>
                      <span className="sm:hidden">Create Post</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        ) : activeTab === 'subadmins' ? (
          userRole === 'admin' ? (
            <SubAdminManager />
          ) : (
            <div className="text-center py-8">
              <div className="alert alert-error">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <span>Access Denied. Only administrators can access Sub-Admin Management.</span>
              </div>
            </div>
          )
        ) : (
          <AdvertisementManager />
        )}
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
        onClose={() => {
          setShowEditModal(false);
          setEditingPost(null);
        }}
        onSubmit={handleEditPost}
        post={editingPost}
      />
    )}
  </div>
);
}
