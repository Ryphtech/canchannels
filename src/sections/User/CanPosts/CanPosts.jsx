import React, { useState, useEffect } from "react";
import CanPostCard from "../../../components/User/CanPostCard/CanPostCard";
import Navlinks from "../../../components/User/NavLinks/Navlinks";
import AdBanner from "../../../components/User/Adbanner/Adbanner";
import AdvertiseSection from "../../../components/User/AdvertiseSection/AdvertiseSection";
import Socialmedia from "../SocialMedia/Socialmedia";
import { postsService } from "../../../backend/postsService";

const CanPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
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

  // Search posts
  const handleSearch = async (query) => {
    if (!query.trim()) {
      await fetchPosts();
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await postsService.searchPosts(query);
      setPosts(searchResults);
    } catch (err) {
      console.error('Error searching posts:', err);
      setError('Failed to search posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter posts locally based on search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle search input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        fetchPosts();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Recent Posts</h1>
        </div>

        <div className="md:flex h-auto md:h-screen gap-4  order-2 md:order-1">
          {/* Right Column (wider on medium+) */}
          <div className="w-full md:w-3/4 p-4 order-1 md:order-2">
            {/* Search bar with filter icon */}
            <div className="mb-6 flex items-center gap-2 w-full">
              <input
                type="text"
                placeholder="Search Posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 transition-transform duration-300 ease-in-out"
                aria-label="Toggle Filters"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-5 h-5 transform transition-transform duration-300 ${
                    showFilters ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 019 17v-3.586L3.293 6.707A1 1 0 013 6V4z"
                  />
                </svg>
              </button>
            </div>

            {/* Navlinks toggle section */}
            {showFilters && (
              <div className="mb-6">
                <Navlinks />
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="flex items-center gap-3">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="text-gray-600">Loading posts...</span>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && !loading && (
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
            )}

            {/* Scrollable News Cards */}
            {!loading && !error && (
              <div className="max-h-[70vh] overflow-y-auto scrollbar-hide pr-2">
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post, index) => (
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
                    ))
                  ) : (
                    <p className="col-span-full text-center">
                      {searchQuery ? (
                        <>
                          No posts found for "
                          <span className="font-medium">{searchQuery}</span>"
                        </>
                      ) : (
                        "No posts available at the moment."
                      )}
                    </p>
                  )}
                </div>
              </div>
            )}
            <Socialmedia/>
          </div>
          {/* Left Column (narrower on medium+) */}
          <div className="w-full md:w-1/4 p-4 mb-6 md:mb-0">
            <AdBanner
              position="can-posts-sidebar"
              fallbackImage="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
              fallbackLink="https://example.com"
            />
            <AdvertiseSection />
          </div>

        </div>
      </div>
    </section>
  );
};

export default CanPosts;
