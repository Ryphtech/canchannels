import React, { useEffect, useState } from "react";
import logo_small from '../../../assets/can-channels-logo-small.png'
import Navlinks from "../NavLinks/Navlinks";
import { postsService } from '../../../backend/postsService';

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date as "Aug 15"
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Format time as HH:MM:SS AM/PM
  const formattedTime = currentDateTime.toLocaleTimeString();

  const [theme, setTheme] = useState('light')
  
    // Check for saved theme preference or default to light mode
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light'
      setTheme(savedTheme)
      // Apply theme to document element
      document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    // Apply theme to document element
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('theme', newTheme)
  }

  // Toggle search bar
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  // Handle search
  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);
      const results = await postsService.searchPosts(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input change with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSearch && !event.target.closest('.search-container')) {
        setShowSearch(false);
        setSearchQuery('');
        setSearchResults([]);
      }
    };

    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearch]);

  return (
    <div className="search-container">
      <div className="navbar bg-base-100 shadow-sm md:px-20 lg:px-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About Us</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
              <li>
                <a>Today's News</a>
              </li>
            </ul>
          </div>
          <div>
          <div className="ml-4 text-center text-sm leading-tight">
          <img src={logo_small} className="w-35 md:w-40 rounded bg-transparent" alt="logo" />
            <div><small>{formattedDate} | {formattedTime}</small></div>
          </div>
          {/* <a className="btn btn-ghost text-xl">Can Channels</a> */}
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a>Today's News</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
  {/* Advertise Button */}
  <a className="btn btn-ghost">Advertise</a>

  {/* Search Icon Button */}
  <button 
    onClick={toggleSearch}
    className={`btn btn-ghost btn-circle ${showSearch ? 'bg-primary text-primary-content' : ''}`} 
    aria-label="Search"
  >
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
      />
    </svg>
  </button>

  {/* Theme Toggle Button */}
  <button
    onClick={toggleTheme}
    className="btn btn-circle bg-gray-300"
    aria-label="Toggle theme"
  >
    {theme === 'dark' ? (
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    )}
  </button>
</div>

      </div>

      {/* Search Bar Section */}
      {showSearch && (
        <div className="bg-base-200 border-t border-base-300 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="relative">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input input-bordered w-full pl-10 pr-4"
                    autoFocus
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-base-content/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <button
                  onClick={toggleSearch}
                  className="btn btn-ghost btn-sm"
                >
                  ✕
                </button>
              </div>

              {/* Search Results */}
              {(searchQuery.trim() || isSearching) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        <span className="text-sm text-base-content/70">Searching...</span>
                      </div>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((post) => (
                        <div
                          key={post.id}
                          className="px-4 py-3 hover:bg-base-200 cursor-pointer border-b border-base-200 last:border-b-0"
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-base-content line-clamp-1">
                                {post.title}
                              </h4>
                              <p className="text-sm text-base-content/70 line-clamp-1">
                                {post.description}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs bg-primary/20 px-2 py-1 rounded">
                                  {post.category}
                                </span>
                                <span className="text-xs text-base-content/50">
                                  {post.publishedOn}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.trim() ? (
                    <div className="p-4 text-center text-base-content/70">
                      No posts found for "{searchQuery}"
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <Navlinks/>
    </div>
  );
};

export default Header;
