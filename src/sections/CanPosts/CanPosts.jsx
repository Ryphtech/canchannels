import React, { useState } from "react";
import CanNewsCard from "../../components/CanPostCard/CanPostCard";
import Navlinks from "../../components/NavLinks/Navlinks";

const CanPosts = ({ newsList }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredNews = newsList.filter(
    (news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Recent Posts
          </h1>
        </div>

        {/* Search bar with filter icon */}
        <div className="mb-6 flex items-center gap-2 w-full md:w-50">
          <input
            type="text"
            placeholder="Search Posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2  transition-transform duration-300 ease-in-out"
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

        {/* News cards */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {filteredNews.length > 0 ? (
    filteredNews.map((news, index) => (
      <CanNewsCard
        key={index}
        image={news.image}
        title={news.title}
        description={news.description}
        link={news.link}
        publishedOn={news.publishedOn}
        category={news.category}
      />
    ))
  ) : (
    <p className="col-span-full text-center">
      No news found for "<span className="font-medium">{searchQuery}</span>"
    </p>
  )}
</div>

      </div>
    </section>
  );
};

export default CanPosts;
