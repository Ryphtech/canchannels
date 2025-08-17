import React, { useState } from 'react';
import { useCookieConsent } from '../../../contexts/CookieConsentContext';
import { COOKIE_TYPES } from '../../../utils/cookieUtils';

const CookiePreferences = ({ isOpen, onClose }) => {
  const { 
    cookieConsent, 
    saveCookieConsent, 
    acceptAllCookies, 
    acceptNecessaryCookies,
    updateCookieTypeConsent 
  } = useCookieConsent();

  const [localConsent, setLocalConsent] = useState(cookieConsent);

  if (!isOpen) return null;

  const handleToggleCookieType = (type) => {
    if (type === COOKIE_TYPES.NECESSARY) return;
    
    setLocalConsent(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    saveCookieConsent(localConsent);
    onClose();
  };

  const handleReset = () => {
    setLocalConsent(cookieConsent);
  };

  const handleAcceptAll = () => {
    const allAccepted = {
      [COOKIE_TYPES.NECESSARY]: true,
      [COOKIE_TYPES.ANALYTICS]: true,
      [COOKIE_TYPES.MARKETING]: true,
      [COOKIE_TYPES.PREFERENCES]: true
    };
    setLocalConsent(allAccepted);
  };

  const handleNecessaryOnly = () => {
    setLocalConsent({
      [COOKIE_TYPES.NECESSARY]: true,
      [COOKIE_TYPES.ANALYTICS]: false,
      [COOKIE_TYPES.MARKETING]: false,
      [COOKIE_TYPES.PREFERENCES]: false
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              🍪 Cookie Preferences
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <p className="text-gray-600 dark:text-gray-300">
              Manage your cookie preferences below. You can change these settings at any time.
            </p>

            {/* Cookie Type Controls */}
            <div className="space-y-4">
              {/* Necessary Cookies */}
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Necessary Cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Essential for the website to function properly. These cookies cannot be disabled.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localConsent[COOKIE_TYPES.NECESSARY]}
                      disabled
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Always Active</span>
                  </div>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Analytics Cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localConsent[COOKIE_TYPES.ANALYTICS]}
                      onChange={() => handleToggleCookieType(COOKIE_TYPES.ANALYTICS)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable</span>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Marketing Cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Used to deliver personalized advertisements and track marketing campaign performance.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localConsent[COOKIE_TYPES.MARKETING]}
                      onChange={() => handleToggleCookieType(COOKIE_TYPES.MARKETING)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable</span>
                  </div>
                </div>
              </div>

              {/* Preferences Cookies */}
              <div className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Preference Cookies</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      Remember your preferences and settings for a better browsing experience.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={localConsent[COOKIE_TYPES.PREFERENCES]}
                      onChange={() => handleToggleCookieType(COOKIE_TYPES.PREFERENCES)}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Enable</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAcceptAll}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  Accept All
                </button>
                <button
                  onClick={handleNecessaryOnly}
                  className="px-4 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
                >
                  Necessary Only
                </button>
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Reset to Saved
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-600">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferences;
