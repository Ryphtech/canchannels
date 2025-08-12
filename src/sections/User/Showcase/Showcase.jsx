import React, { useState, useEffect } from 'react';
import CanPostCard from '../../../components/User/CanPostCard/CanPostCard';
import { postsService } from '../../../backend/postsService';

const Showcase = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock videos data (keeping this as requested - only ads sections should have mock data)
  const youtubeVideos = [
    {
      title: 'Official Trailer: The Return',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      title: 'Teaser: Galactic Wars 2',
      url: 'https://www.youtube.com/embed/tgbNymZ7vqY'
    }
  ];

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await postsService.fetchPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter cinema-related posts (Can Exclusive category)
  const cinemaPosts = posts.filter(post =>
    ['Can Exclusive'].includes(post.category)
  );

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Can Exclusive and Releases
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - YouTube Videos */}
          <div className="flex flex-col space-y-6">
            {youtubeVideos.map((video, index) => (
              <div key={index}>
                <div className="aspect-w-16 aspect-h-9 mb-2">
                  <iframe
                    className="w-full h-64"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-base font-semibold">{video.title}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Cinema News Cards */}
          <div className="h-[600px] overflow-y-auto pr-2 scrollbar-hide">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Loading posts...</span>
                </div>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Posts</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <button
                  onClick={fetchPosts}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : cinemaPosts.length > 0 ? (
              <div className="grid gap-6 grid-cols-2">
                {cinemaPosts.map((post, index) => (
                  <CanPostCard
                    key={post.id || index}
                    image={post.image}
                    title={post.title}
                    description={post.description}
                    link={post.link}
                    publishedOn={post.publishedOn}
                    category={post.category}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Exclusive Content</h3>
                <p className="text-gray-600">Check back later for exclusive content and releases.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Showcase;
