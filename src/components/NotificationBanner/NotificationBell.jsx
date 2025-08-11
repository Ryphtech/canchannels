import React, { useState } from 'react';
import { FaBell, FaTimes, FaInfoCircle } from 'react-icons/fa';

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showElectronicsPopup, setShowElectronicsPopup] = useState(true);

  const notifications = [
    {
      id: 1,
      title: "പുതിയ വാർത്ത",
      message: "കേരളത്തിലെ പുതിയ രാഷ്ട്രീയ വികാസങ്ങൾ",
      time: "2 minutes ago"
    },
    {
      id: 2,
      title: "സിനിമ റിലീസ്",
      message: "പുതിയ മലയാള സിനിമ റിലീസ് ചെയ്തു",
      time: "1 hour ago"
    },
    {
      id: 3,
      title: "കാലാവസ്ഥ അപ്ഡേറ്റ്",
      message: "കേരളത്തിൽ ഇന്ന് മഴ പ്രതീക്ഷിക്കുന്നു",
      time: "3 hours ago"
    }
  ];

  return (
    <>
      {/* Notification Bell */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative bg-can-red text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-can-dark-red transition-colors"
        >
          <FaBell className="text-lg sm:text-xl" />
          <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-can-red rounded-full"></div>
          </div>
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute bottom-16 right-0 w-72 sm:w-80 bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="p-3 sm:p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
            </div>
            <div className="max-h-48 sm:max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <div key={notification.id} className="p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-can-red rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 text-xs sm:text-sm">{notification.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1 sm:mt-2">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Electronics Popup */}
      {showElectronicsPopup && (
        <div className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 z-30">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 sm:p-4 w-56 sm:w-64">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center space-x-2">
                <FaInfoCircle className="text-blue-500 text-sm sm:text-base" />
                <span className="text-xs sm:text-sm font-medium text-gray-800">इलेक्ट्रॉनिक्स</span>
              </div>
              <button
                onClick={() => setShowElectronicsPopup(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
              പുതിയ ഇലക്ട്രോണിക് ഉത്പന്നങ്ങൾ ഇപ്പോൾ ലഭ്യമാണ്
            </p>
            <button className="w-full bg-can-green text-white py-2 rounded text-xs sm:text-sm font-medium hover:bg-green-600 transition-colors">
              കൂടുതൽ കാണുക
            </button>
          </div>
        </div>
      )}

      {/* Loading/Refresh Icon */}
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-30">
        <div className="bg-can-blue text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg">
          <div className="animate-spin rounded-full h-4 w-4 sm:h-6 sm:w-6 border-b-2 border-white"></div>
        </div>
      </div>
    </>
  );
};

export default NotificationBell; 