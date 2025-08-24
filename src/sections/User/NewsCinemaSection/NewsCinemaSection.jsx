import React, { useState, useEffect } from "react";
import CanPostCard from "../../../components/User/CanPostCard/CanPostCard";
import AdBanner from "../../../components/User/Adbanner/Adbanner";
import { postsService } from "../../../backend/postsService";

const NewsCinemaSection = () => {
  const [newsPosts, setNewsPosts] = useState([]);
  const [cinemaPosts, setCinemaPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to intersperse posts with ads
  const interspersePostsWithAds = (posts, adPosition = 3) => {
    if (posts.length === 0) return [];
    
    const result = [];
    posts.forEach((post, index) => {
      result.push(post);
      // Add ad after every 'adPosition' number of posts
      if ((index + 1) % adPosition === 0 && index < posts.length - 1) {
        result.push({ type: 'ad', id: `ad-${index}` });
      }
    });
    return result;
  };

  // Fetch posts and separate by category
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await postsService.fetchPosts();
      
      // Separate posts by category
      const news = fetchedPosts.filter(post => 
        post.category && post.category.toLowerCase().includes('news')
      );
      const cinema = fetchedPosts.filter(post => 
        post.category && post.category.toLowerCase().includes('cinema')
      );
      
      setNewsPosts(news);
      setCinemaPosts(cinema);
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

  // Create mixed content arrays with ads
  const newsWithAds = interspersePostsWithAds(newsPosts, 3);
  const cinemaWithAds = interspersePostsWithAds(cinemaPosts, 3);

  // Render mixed content (posts and ads)
  const renderMixedContent = (mixedContent, columnType) => {
    if (mixedContent.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="text-gray-400 text-4xl mb-4">
            {columnType === 'news' ? '📰' : '🎬'}
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            No {columnType} posts available at the moment.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {mixedContent.map((item, index) => {
          if (item.type === 'ad') {
            return (
              <div key={item.id} className="my-4">
                <AdBanner 
                  position={`${columnType}-column-${item.id}`}
                  fallbackImage="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                  fallbackLink="https://example.com"
                />
              </div>
            );
          }
          
          return (
            <CanPostCard
              key={item.id || index}
              id={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              link={item.link}
              publishedOn={item.publishedOn}
              category={item.category}
              links={item.links}
            />
          );
        })}
      </div>
    );
  };

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can News & Cinema
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Stay updated with the latest news and cinema releases
          </p>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="text-gray-600 dark:text-gray-400">Loading posts...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Error Loading Posts</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <button
              onClick={fetchPosts}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Two Column Layout */}
        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* News Column */}
            <div className="rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-blue-600">📰</span>
                  Can News
                </h3>
                <span className="text-sm bg-blue-500 px-3 py-1 rounded-full">
                  {newsPosts.length} posts
                </span>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto scrollbar-hide pr-2">
                {renderMixedContent(newsWithAds, 'news')}
              </div>
            </div>

            {/* Cinema Column */}
            <div className="rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <span className="text-purple-600">🎬</span>
                  Can Cinema
                </h3>
                <span className="text-sm bg-blue-500 px-3 py-1 rounded-full">
                  {cinemaPosts.length} posts
                </span>
              </div>
              
              <div className="max-h-[600px] overflow-y-auto scrollbar-hide pr-2">
                {renderMixedContent(cinemaWithAds, 'cinema')}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsCinemaSection;
