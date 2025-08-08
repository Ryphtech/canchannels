import React, { useState, useEffect } from 'react'

const Hero = () => {
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

  const newsArticles = [
    {
      id: 1,
      title: "Tech Giants Announce Record-Breaking Quarterly Earnings",
      date: "August 14, 2024",
      image: "https://via.placeholder.com/60x60/e5e7eb/6b7280?text=📊"
    },
    {
      id: 2,
      title: "New Scientific Discovery Promises Breakthrough in Medicine",
      date: "August 13, 2024",
      image: "https://via.placeholder.com/60x60/e5e7eb/6b7280?text=🔬"
    },
    {
      id: 3,
      title: "Travel Restrictions Lifted: Popular Destinations Reopen",
      date: "August 11, 2024",
      image: "https://via.placeholder.com/60x60/e5e7eb/6b7280?text=✈️"
    },
    {
      id: 4,
      title: "Music Festival Sells Out in Record Time: Lineup Revealed",
      date: "August 9, 2024",
      image: "https://via.placeholder.com/60x60/e5e7eb/6b7280?text=🎵"
    },
    {
      id: 5,
      title: "Educational Reforms Aim to Improve Student Outcomes",
      date: "August 7, 2024",
      image: "https://via.placeholder.com/60x60/e5e7eb/6b7280?text=📚"
    },
    {
      id: 6,
      title: "Top Restaurants Awarded Michelin Stars for Culinary Excellence",
      date: "August 6, 2024",
      image: "https://via.placeholder.com/60x60/e5e7eb/6b7280?text=🍽️"
    }
  ]

  return (
    <div data-theme={theme} className="max-w-7xl mx-auto px-4 py-8 bg-base-100 min-h-screen transition-colors duration-300">
      {/* Theme Toggle Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 btn btn-circle btn-primary shadow-lg"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Top Advertisement */}
          <div className="bg-neutral text-neutral-content text-center py-4 rounded-lg">
            <span className="font-semibold">ADVERTISEMENT</span>
          </div>

          {/* Main Image Placeholder */}
          <div className="bg-base-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-base-content/50 text-6xl">🏔️</div>
          </div>

          {/* Today's Highlights Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-base-content">Today's Highlights</h1>
            
            {/* Category Tag */}
            <div className="badge badge-primary text-primary-content px-4 py-2 text-sm font-medium">
              BUSINESS
            </div>

            {/* Article Title */}
            <h2 className="text-2xl font-bold text-base-content leading-tight">
              Mastering Digital Marketing for Small Businesses: A Comprehensive Guide
            </h2>

            {/* Article Description */}
            <p className="text-base-content/70 leading-relaxed">
              Uncover the essential strategies and tools to effectively market your small business online. 
              From SEO to social media, learn how to build a strong digital presence and drive growth in 
              today's competitive landscape.
            </p>

            {/* Metadata and Read More */}
            <div className="flex justify-between items-center pt-4">
              <div className="text-sm text-base-content/60">
                <span>August 15, 2024</span>
                <span className="mx-2">•</span>
                <span>10 min read</span>
              </div>
              <a href="#" className="link link-primary font-medium">
                Read More
              </a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* News Today Heading */}
          <div className="border-b border-base-300 pb-2">
            <h3 className="text-xl font-bold text-base-content uppercase tracking-wide">
              News Today
            </h3>
          </div>

          {/* News Articles List */}
          <div className="space-y-4">
            {newsArticles.map((article) => (
              <div key={article.id} className="flex space-x-3">
                <div className="flex-shrink-0">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-16 h-16 rounded object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-base-content leading-tight hover:text-primary cursor-pointer transition-colors duration-200">
                    {article.title}
                  </h4>
                  <p className="text-xs text-base-content/60 mt-1">
                    {article.date}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Advertisement */}
          <div className="bg-neutral text-neutral-content text-center py-4 rounded-lg mt-8">
            <span className="font-semibold">ADVERTISEMENT</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero