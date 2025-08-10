import React from 'react';

const MainContent = () => {
  const featuredNews = [
    {
      id: 1,
      title: "കേരളത്തിലെ പുതിയ രാഷ്ട്രീയ വികാസങ്ങൾ",
      excerpt: "കേരള സർക്കാരിന്റെ പുതിയ നയങ്ങളും വികസന പദ്ധതികളും",
      category: "CAN POLITICS",
      image: "https://via.placeholder.com/400x250/DC2626/FFFFFF?text=News+1",
      date: "2 hours ago"
    },
    {
      id: 2,
      title: "മലയാള സിനിമയിലെ പുതിയ റിലീസുകൾ",
      excerpt: "ഈ ആഴ്ച റിലീസ് ചെയ്യുന്ന പ്രധാന മലയാള സിനിമകൾ",
      category: "CINEMA",
      image: "https://via.placeholder.com/400x250/2563EB/FFFFFF?text=News+2",
      date: "4 hours ago"
    },
    {
      id: 3,
      title: "കേരളത്തിലെ കാലാവസ്ഥ മാറ്റങ്ങൾ",
      excerpt: "ഇന്ന് കേരളത്തിൽ പ്രതീക്ഷിക്കുന്ന മഴയും കാലാവസ്ഥയും",
      category: "CAN NEWS",
      image: "https://via.placeholder.com/400x250/059669/FFFFFF?text=News+3",
      date: "6 hours ago"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Featured News Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 border-b-2 border-can-red pb-2">
          പ്രധാന വാർത്തകൾ
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {featuredNews.map((news) => (
            <div key={news.id} className="card overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-40 sm:h-48 object-cover"
              />
              <div className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-can-red uppercase">
                    {news.category}
                  </span>
                  <span className="text-xs text-gray-500">{news.date}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm sm:text-base">
                  {news.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">
                  {news.excerpt}
                </p>
                <button className="mt-2 sm:mt-3 text-can-red hover:text-can-dark-red font-medium text-xs sm:text-sm">
                  കൂടുതൽ വായിക്കുക →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Breaking News Ticker */}
      <div className="bg-can-red text-white p-3 sm:p-4 rounded-lg">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span className="font-bold text-xs sm:text-sm">BREAKING:</span>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              <span className="mr-4 sm:mr-8 text-xs sm:text-sm">
                കേരളത്തിലെ പുതിയ COVID-19 കേസുകൾ | 
                മലയാള സിനിമയിലെ പുതിയ റിലീസുകൾ | 
                കേരള സർക്കാരിന്റെ പുതിയ നയങ്ങൾ |
                കേരളത്തിലെ കാലാവസ്ഥ മാറ്റങ്ങൾ
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Updates */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
          ഏറ്റവും പുതിയ അപ്ഡേറ്റുകൾ
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 hover:bg-gray-50 rounded">
              <div className="w-2 h-2 bg-can-red rounded-full mt-2 flex-shrink-0"></div>
              <div className="flex-1">
                <p className="text-xs sm:text-sm text-gray-800">
                  കേരളത്തിലെ പുതിയ വികസന പദ്ധതികൾ ഇന്ന് ആരംഭിക്കുന്നു
                </p>
                <span className="text-xs text-gray-500">{item} hour{item !== 1 ? 's' : ''} ago</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent; 