import React, { useState, useEffect } from 'react';
import { postsService } from '../../../backend/postsService';

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await postsService.fetchPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Get the first post for main content display
  const mainPost = posts[0];
  const recommendedPosts = posts.slice(1, 4);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading content...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Content</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchPosts}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!mainPost) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Content Available</h3>
        <p className="text-gray-600">Check back later for new content.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Left Section */}
      <div className="w-full md:w-3/4 space-y-6">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4">
          <h2 className="text-2xl font-bold mb-4">{mainPost.title}</h2>

          <img
            src={mainPost.image}
            alt={mainPost.title}
            className="w-full h-48 md:h-64 object-cover rounded-lg mb-4"
          />
          
          {mainPost.link && (
            <a
              href={mainPost.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline font-medium text-right"
            >
              Read More →
            </a>
          )}

          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4 text-justify leading-relaxed">
            {mainPost.description}
          </p>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span className="font-medium border px-2 py-1 rounded">{mainPost.category}</span>
            <span>{mainPost.publishedOn}</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/4 space-y-4">
        {/* Watch Now - Keeping this as mock data since it's for ads/videos */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Watch Now</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-48 rounded"
            />
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-4">Recommendations</h3>
          <div className="space-y-4">
            {recommendedPosts.length > 0 ? (
              recommendedPosts.map((post, index) => (
                <div key={post.id || index} className="flex gap-3">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold line-clamp-2">{post.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                      {post.description.slice(0, 60)}...
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recommendations available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
