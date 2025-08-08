import React from 'react'
import AdBanner from '../../components/Adbanner/Adbanner'

const Hero = () => {
  

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
    <div  className="max-w-7xl mx-auto px-4 py-8 bg-base-100 min-h-screen transition-colors duration-300">

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
          <AdBanner image = 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg' link="https://example.com"/>
        </div>
      </div>
    </div>
  )
}

export default Hero