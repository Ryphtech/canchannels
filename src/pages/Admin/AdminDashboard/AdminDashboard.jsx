import React, { useEffect, useState } from "react";
import { supabase } from "../../../backend/supabaseClient";
import PostCard from "../../../components/Admin/PostCard/PostCard";
import AddPostModal from "../../../components/Admin/AddPostModal/AddPostModal";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    recent: 0
  });

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
      // Generate a UUID for the post ID
      const postId = crypto.randomUUID();
      
      const { data, error } = await supabase
        .from("posts")
        .insert([{
          id: postId,
          title: postData.title,
          subtitle: postData.subtitle,
          content: postData.content,
          featured: postData.featured,
          image: postData.image ? URL.createObjectURL(postData.image) : null,
          links: postData.links,
          created_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error("Error adding post:", error);
        alert("Failed to add post. Please try again.");
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
  const handleEditPost = (postId) => {
    // TODO: Implement edit functionality
    console.log("Edit post:", postId);
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
      {/* Header */}
      <div className="bg-base-200 border-b border-base-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-base-content">Admin Dashboard</h1>
              <p className="text-base-content/70 mt-1">Manage your content and posts</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-primary btn-lg gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Post
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="stat bg-base-200 rounded-lg shadow-sm">
            <div className="stat-figure text-primary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="stat-title">Total Posts</div>
            <div className="stat-value text-primary">{stats.total}</div>
          </div>
          
          <div className="stat bg-base-200 rounded-lg shadow-sm">
            <div className="stat-figure text-secondary">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <div className="stat-title">Featured Posts</div>
            <div className="stat-value text-secondary">{stats.featured}</div>
          </div>
          
          <div className="stat bg-base-200 rounded-lg shadow-sm">
            <div className="stat-figure text-accent">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="stat-title">Recent (7 days)</div>
            <div className="stat-value text-accent">{stats.recent}</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-base-200 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
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
            
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select select-bordered"
              >
                <option value="all">All Posts</option>
                <option value="featured">Featured Only</option>
                <option value="recent">Recent (7 days)</option>
              </select>
              
              <button
                onClick={fetchPosts}
                className="btn btn-outline gap-2"
                disabled={loading}
              >
                <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-base-content">
              {searchTerm || filterType !== "all" ? "Filtered Posts" : "All Posts"}
              {filteredPosts.length > 0 && (
                <span className="text-base-content/60 text-lg font-normal ml-2">
                  ({filteredPosts.length})
                </span>
              )}
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex items-center gap-3">
                <div className="loading loading-spinner loading-lg text-primary"></div>
                <span className="text-base-content/70">Loading posts...</span>
              </div>
            </div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                  isFeatured={post.featured}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-base-content/40 text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-base-content mb-2">
                {searchTerm || filterType !== "all" ? "No posts found" : "No posts yet"}
              </h3>
              <p className="text-base-content/60 mb-6">
                {searchTerm || filterType !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Get started by creating your first post"
                }
              </p>
              {!searchTerm && filterType === "all" && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="btn btn-primary gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Your First Post
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Post Modal */}
      {showAddModal && (
        <AddPostModal
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddPost}
        />
      )}
    </div>
  );
}
