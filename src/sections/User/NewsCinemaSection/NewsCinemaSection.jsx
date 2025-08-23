import React, { useState, useEffect } from 'react';
import CanPostCard from '../../../components/User/CanPostCard/CanPostCard';
import { postsService } from '../../../backend/postsService';

const NewsCinemaSection = () => {
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
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts by category
  const canNewsPosts = posts.filter(post =>
    ['Can News'].includes(post.category)
  );

  const cinemaPosts = posts.filter(post =>
    ['Cinema'].includes(post.category)
  );

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Can News & Cinema
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Can News */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 bg-blue-900 p-3 text-white">Can News</h2>
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
                             ) : canNewsPosts.length > 0 ? (
                 <div className="grid gap-6 grid-cols-2">
                   {canNewsPosts.map((post, index) => (
                    <CanPostCard
                      key={post.id || index}
                      id={post.id}
                      image={post.image}
                      title={post.title}
                      description={post.description}
                      link={post.link}
                      publishedOn={post.publishedOn}
                      category={post.category}
                      links={post.links}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📰</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No News Content</h3>
                  <p className="text-gray-600">Check back later for the latest Can News.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Cinema */}
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold mb-4 bg-blue-900 p-3 text-white">Cinema</h2>
            <div className="h-[600px] overflow-y-auto pr-2 scrollbar-hide">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
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
                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
                             ) : cinemaPosts.length > 0 ? (
                 <div className="grid gap-6 grid-cols-2">
                   {cinemaPosts.map((post, index) => (
                    <CanPostCard
                      key={post.id || index}
                      id={post.id}
                      image={post.image}
                      title={post.title}
                      description={post.description}
                      link={post.link}
                      publishedOn={post.publishedOn}
                      category={post.category}
                      links={post.links}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🎬</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Cinema Content</h3>
                  <p className="text-gray-600">Check back later for the latest cinema updates.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsCinemaSection;
