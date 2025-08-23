import React, { useState } from 'react';
import { FaBell, FaTimes, FaYoutube } from 'react-icons/fa';
import { useNotifications } from '../../../hooks/useNotifications';

const NotificationBell = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, loading, formatTimeAgo } = useNotifications();

  return (
    <>
      {/* Notification Bell */}
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative bg-can-red text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-can-dark-red transition-colors"
        >
          <FaBell className="text-lg sm:text-xl" />
          {notifications.length > 0 && (
            <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full flex items-center justify-center">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-can-red rounded-full"></div>
            </div>
          )}
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
              {loading ? (
                <div className="p-4 text-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-can-red mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div key={notification.id} className="p-3 sm:p-4 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-can-red rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-800 text-xs sm:text-sm">{notification.title}</h4>
                        {notification.message && (
                          <p className="text-xs sm:text-sm text-gray-600 mt-1">{notification.message}</p>
                        )}
                        {notification.youtube_link && (
                          <div className="flex items-center gap-2 mt-2">
                            <FaYoutube className="text-red-500 text-sm" />
                            <a
                              href={notification.youtube_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-can-red hover:underline"
                            >
                              Watch on YouTube
                            </a>
                          </div>
                        )}
                        <p className="text-xs text-gray-500 mt-1 sm:mt-2">
                          {formatTimeAgo(notification.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationBell; 