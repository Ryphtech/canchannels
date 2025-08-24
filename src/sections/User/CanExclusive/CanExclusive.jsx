import React, { useState, useEffect } from 'react';
import CanPostCard from '../../../components/User/CanPostCard/CanPostCard';
import { postsService } from '../../../backend/postsService';

const CanExclusive = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

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

  // Filter exclusive posts
  const exclusivePosts = posts.filter(post =>
    ['Can Exclusive', 'Exclusive'].includes(post.category)
  );

  // Show only first 6 posts initially, then all when "Show More" is clicked
  const displayedPosts = showAll ? exclusivePosts : exclusivePosts.slice(0, 6);

  return (
    <section className="py-8 px-4 bg-base-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            🎬 Can Exclusive
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Discover our exclusive content, behind-the-scenes footage, and special releases that you won't find anywhere else.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="text-base-content/70">Loading exclusive content...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="text-error text-6xl mb-4">⚠</div>
            <h3 className="text-xl font-semibold text-base-content mb-2">Error Loading Content</h3>
            <p className="text-base-content/70 mb-6">{error}</p>
            <button
              onClick={fetchPosts}
              className="btn btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : exclusivePosts.length > 0 ? (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {displayedPosts.map((post, index) => (
                <div key={post.id || index} className="transform hover:scale-105 transition-transform duration-300">
                  <CanPostCard
                    id={post.id}
                    image={post.image}
                    title={post.title}
                    description={post.description}
                    link={post.link}
                    publishedOn={post.publishedOn}
                    category={post.category}
                    links={post.links}
                  />
                </div>
              ))}
            </div>

            {/* Show More Button */}
            {exclusivePosts.length > 6 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="btn btn-primary btn-lg transform hover:scale-105 transition-all duration-300"
                >
                  {showAll ? 'Show Less' : `Show More (${exclusivePosts.length - 6} more)`}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-primary text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-base-content mb-2">No Exclusive Content Yet</h3>
            <p className="text-base-content/70 mb-4">
              We're working on bringing you amazing exclusive content.
            </p>
            <p className="text-sm text-base-content/50">
              Check back soon for behind-the-scenes footage and special releases!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CanExclusive;