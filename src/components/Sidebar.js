import React, { useState } from 'react';
import { FaTimes, FaInfoCircle } from 'react-icons/fa';

const Sidebar = () => {
  const [showOnlineCoursePopup, setShowOnlineCoursePopup] = useState(true);

  const trendingNews = [
    {
      id: 1,
      title: "കേരളത്തിലെ പുതിയ രാഷ്ട്രീയ വികാസങ്ങൾ",
      category: "CAN POLITICS",
      time: "2 hours ago"
    },
    {
      id: 2,
      title: "മലയാള സിനിമയിലെ പുതിയ റിലീസുകൾ",
      category: "CINEMA",
      time: "4 hours ago"
    },
    {
      id: 3,
      title: "കേരളത്തിലെ കാലാവസ്ഥ മാറ്റങ്ങൾ",
      category: "CAN NEWS",
      time: "6 hours ago"
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Exclusive Interview Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 border-b-2 border-can-red pb-2">
            EXCLUSIVE INTERVIEW
          </h3>
        </div>
        
        <div className="relative">
          {/* Main Interview Image */}
          <div className="relative w-full h-60 sm:h-80 bg-gradient-to-br from-blue-600 to-blue-800">
            {/* Placeholder for the two men image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl">👨‍🦱</span>
                </div>
                <div className="w-16 h-16 sm:w-24 sm:h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-2xl sm:text-4xl">👨</span>
                </div>
              </div>
            </div>
            
            {/* Malayalam Text Overlay */}
            <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
              <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2 opacity-90">
                ആ ക്ലിപ്പ് കണ്ടപ്പോൾത്തന്നെ ലാലേട്ടൻ വിളിച്ചുപറഞ്ഞു
              </p>
              <h4 className="text-lg sm:text-2xl font-bold">
                വില്ലൻ
              </h4>
            </div>
          </div>
          
          {/* Call to Action Button */}
          <div className="p-3 sm:p-4 bg-gray-50">
            <button className="w-full bg-can-red text-white py-2 px-3 sm:px-4 rounded font-semibold hover:bg-can-dark-red transition-colors text-sm">
              M'PEN ITA
            </button>
          </div>
        </div>
      </div>

      {/* Online Course Popup */}
      {showOnlineCoursePopup && (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 sm:p-4 relative">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setShowOnlineCoursePopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <FaInfoCircle className="text-white text-xs sm:text-sm" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-800">
                सिनेमाई विषय पर ऑनलाइन कोर्स
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
            പുതിയ ഇലക്ട്രോണിക് ഉത്പന്നങ്ങൾ ഇപ്പോൾ ലഭ്യമാണ്
          </p>
          <button className="w-full bg-can-green text-white py-2 rounded text-xs sm:text-sm font-medium hover:bg-green-600 transition-colors">
            കൂടുതൽ കാണുക
          </button>
        </div>
      )}

      {/* Trending News Section */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 border-b-2 border-can-blue pb-2">
          TRENDING NEWS
        </h3>
        
        <div className="space-y-3 sm:space-y-4">
          {trendingNews.map((news) => (
            <div key={news.id} className="border-b border-gray-200 pb-2 sm:pb-3 last:border-b-0">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <div className="w-2 h-2 bg-can-red rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm font-medium text-gray-800 mb-1">
                    {news.title}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-can-red font-semibold">
                      {news.category}
                    </span>
                    <span className="text-xs text-gray-500">{news.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 border-b-2 border-can-purple pb-2">
          വേഗ ലിങ്കുകൾ
        </h3>
        
        <div className="space-y-1 sm:space-y-2">
          {['CAN NEWS', 'CINEMA', 'CAN POLITICS', 'ASTRO', 'CELE VIDEOS'].map((link) => (
            <a 
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="block text-xs sm:text-sm text-gray-700 hover:text-can-red transition-colors py-1"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 