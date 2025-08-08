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

  const secondaryArticles = [
    {
      id: 1,
      title: "Tech Giants Announce Record-Breaking Quarterly Earnings",
      subtitle: "Major technology companies report unprecedented growth in Q3"
    },
    {
      id: 2,
      title: "New Scientific Discovery Promises Breakthrough in Medicine",
      subtitle: "Researchers uncover potential treatment for chronic diseases"
    },
    {
      id: 3,
      title: "Travel Restrictions Lifted: Popular Destinations Reopen",
      subtitle: "Tourism industry sees surge as borders reopen worldwide"
    }
  ]

  const newsArticles = [
    {
      id: 1,
      title: "Tech Giants Announce Record-Breaking Quarterly Earnings",
      date: "August 14, 2024"
    },
    {
      id: 2,
      title: "New Scientific Discovery Promises Breakthrough in Medicine",
      date: "August 13, 2024"
    },
    {
      id: 3,
      title: "Travel Restrictions Lifted: Popular Destinations Reopen",
      date: "August 11, 2024"
    },
    {
      id: 4,
      title: "Music Festival Sells Out in Record Time: Lineup Revealed",
      date: "August 9, 2024"
    },
    {
      id: 5,
      title: "Educational Reforms Aim to Improve Student Outcomes",
      date: "August 7, 2024"
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-3 space-y-8">
          {/* Today's Highlight Section */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-base-content">Today's Highlight</h1>
            
            {/* Primary Highlight Area */}
            <div className="bg-base-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-base-content/50 text-6xl">🏔️</div>
            </div>

            {/* Primary Content Details */}
            <div className="space-y-2">
              <div className="h-4 bg-base-300 rounded w-3/4"></div>
              <div className="h-4 bg-base-300 rounded w-1/2"></div>
              <div className="h-4 bg-base-300 rounded w-2/3"></div>
            </div>
          </div>

          {/* Secondary Content/Article Previews */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {secondaryArticles.map((article) => (
                <div key={article.id} className="space-y-3">
                  {/* Article Thumbnail */}
                  <div className="bg-base-200 rounded-lg h-48 flex items-center justify-center">
                    <div className="text-base-content/50 text-4xl">📰</div>
                  </div>
                  
                  {/* Article Details */}
                  <div className="space-y-2">
                    <div className="h-3 bg-base-300 rounded w-full"></div>
                    <div className="h-3 bg-base-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
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
            {newsArticles.map((article) => (
              <div key={article.id} className="p-4 bg-base-200 rounded-lg">
                <h4 className="text-sm font-medium text-base-content leading-tight hover:text-primary cursor-pointer transition-colors duration-200">
                  {article.title}
                </h4>
                <p className="text-xs text-base-content/60 mt-1">
                  {article.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero