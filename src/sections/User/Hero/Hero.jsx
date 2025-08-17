import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdBanner from '../../../components/User/Adbanner/Adbanner'
import { postsService } from '../../../backend/postsService'

const Hero = () => {
  const navigate = useNavigate();
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured posts for Today's Highlight
  const fetchFeaturedPosts = async () => {
    try {
      const posts = await postsService.fetchFeaturedPosts();
      setFeaturedPosts(posts);
    } catch (err) {
      console.error('Error fetching featured posts:', err);
    }
  };

  // Fetch recent posts for Today's News
  const fetchRecentPosts = async () => {
    try {
      const posts = await postsService.fetchPosts();
      // Get the most recent 5 posts
      setRecentPosts(posts.slice(0, 5));
    } catch (err) {
      console.error('Error fetching recent posts:', err);
    }
  };

  // Fetch all data
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([fetchFeaturedPosts(), fetchRecentPosts()]);
    } catch (err) {
      console.error('Error fetching hero data:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Get the main featured post (first one)
  const mainFeaturedPost = featuredPosts[0];
  // Get secondary featured posts (next 3)
  const secondaryFeaturedPosts = featuredPosts.slice(1, 4);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 bg-base-100 min-h-screen transition-colors duration-300">
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading content...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 bg-base-100 min-h-screen transition-colors duration-300">
        <div className="text-center py-12">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Content</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-base-100 min-h-screen transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-3 space-y-8">
          {/* Today's Highlight Section */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-base-content">Today's Highlight</h1>
            
            {/* Primary Highlight Area */}
            {mainFeaturedPost ? (
              <div 
                className="bg-base-200 rounded-lg h-96 relative overflow-hidden cursor-pointer hover:opacity-90 transition-opacity duration-200"
                onClick={() => navigate(`/content/${mainFeaturedPost.id}`)}
              >
                <img
                  src={mainFeaturedPost.image}
                  alt={mainFeaturedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-xl font-bold mb-2">{mainFeaturedPost.title}</h2>
                  <p className="text-sm opacity-90">{mainFeaturedPost.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-primary px-2 py-1 rounded">{mainFeaturedPost.category}</span>
                    <span className="text-xs opacity-75">{mainFeaturedPost.publishedOn}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-base-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-base-content/50 text-6xl mb-4">🏔️</div>
                  <p className="text-base-content/60">No featured content available</p>
                </div>
              </div>
            )}

            {/* Secondary Content/Article Previews */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {secondaryFeaturedPosts.length > 0 ? (
                  secondaryFeaturedPosts.map((post) => (
                    <div 
                      key={post.id} 
                      className="space-y-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
                      onClick={() => navigate(`/content/${post.id}`)}
                    >
                      {/* Article Thumbnail */}
                      <div className="bg-base-200 rounded-lg h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Article Details */}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-base-content line-clamp-2">{post.title}</h3>
                        <div className="flex items-center justify-between text-xs text-base-content/60">
                          <span className="bg-primary/20 px-2 py-1 rounded">{post.category}</span>
                          <span>{post.publishedOn}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Show placeholder cards if no secondary featured posts
                  Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="space-y-3">
                      <div className="bg-base-200 rounded-lg h-48 flex items-center justify-center">
                        <div className="text-base-content/50 text-4xl">📰</div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-3 bg-base-300 rounded w-full"></div>
                        <div className="h-3 bg-base-300 rounded w-3/4"></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Today's News Heading */}
          <div className="border-b border-base-300 pb-2">
            <h3 className="text-xl font-bold text-base-content">
              Today's News
            </h3>
          </div>

          {/* News List Area */}
          <div className="space-y-4">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <div 
                  key={post.id} 
                  className="p-4 bg-base-200 rounded-lg cursor-pointer hover:bg-base-300 transition-colors duration-200"
                  onClick={() => navigate(`/content/${post.id}`)}
                >
                  <h4 className="text-sm font-medium text-base-content leading-tight hover:text-primary transition-colors duration-200">
                    {post.title}
                  </h4>
                  <p className="text-xs text-base-content/60 mt-1">
                    {post.publishedOn}
                  </p>
                </div>
              ))
            ) : (
              // Show placeholder items if no recent posts
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="p-4 bg-base-200 rounded-lg">
                  <div className="h-3 bg-base-300 rounded w-full mb-2"></div>
                  <div className="h-2 bg-base-300 rounded w-1/3"></div>
                </div>
              ))
            )}
          </div>
          <AdBanner position="hero-section" fallbackImage="https://www.svgrepo.com/show/508699/landscape-placeholder.svg" fallbackLink="https://example.com"/>
        </div>
      </div>
    </div>
  )
}

export default Hero