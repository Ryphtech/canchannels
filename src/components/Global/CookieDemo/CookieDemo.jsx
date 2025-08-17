import React, { useState } from 'react';
import { useCookieConsent } from '../../../contexts/CookieConsentContext';
import { cookieUtils } from '../../../utils/cookieUtils';

const CookieDemo = () => {
  const { 
    cookieConsent, 
    hasConsented, 
    isCookieTypeAllowed,
    cookiesEnabled,
    resetCookieConsent 
  } = useCookieConsent();
  
  const [customCookieName, setCustomCookieName] = useState('');
  const [customCookieValue, setCustomCookieValue] = useState('');
  const [customCookieDays, setCustomCookieDays] = useState(30);
  const [allCookies, setAllCookies] = useState({});

  const handleSetCustomCookie = () => {
    if (customCookieName && customCookieValue) {
      const success = cookieUtils.setCookie(customCookieName, customCookieValue, customCookieDays);
      if (success) {
        alert(`Cookie "${customCookieName}" set successfully!`);
        refreshCookies();
        setCustomCookieName('');
        setCustomCookieValue('');
      } else {
        alert('Failed to set cookie');
      }
    }
  };

  const handleDeleteCustomCookie = (name) => {
    const success = cookieUtils.deleteCookie(name);
    if (success) {
      alert(`Cookie "${name}" deleted successfully!`);
      refreshCookies();
    } else {
      alert('Failed to delete cookie');
    }
  };

  const refreshCookies = () => {
    setAllCookies(cookieUtils.getAllCookies());
  };

  const testCookieFunctionality = () => {
    const testResult = cookieUtils.areCookiesEnabled();
    alert(`Cookies are ${testResult ? 'enabled' : 'disabled'} on this browser`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🍪 Cookie Management Demo
      </h2>

      {/* Cookie Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Cookie Status</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-medium">Cookies Enabled:</span> {cookiesEnabled ? '✅ Yes' : '❌ No'}</p>
            <p><span className="font-medium">Has Consented:</span> {hasConsented ? '✅ Yes' : '❌ No'}</p>
            <p><span className="font-medium">Banner Hidden:</span> {!hasConsented ? '❌ No' : '✅ Yes'}</p>
          </div>
        </div>

        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Current Consent</h3>
          <div className="space-y-1 text-sm">
            {Object.entries(cookieConsent).map(([type, allowed]) => (
              <p key={type}>
                <span className="font-medium capitalize">{type}:</span> {allowed ? '✅' : '❌'}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Test Cookie Functionality */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3">Test Cookie Functionality</h3>
        <button
          onClick={testCookieFunctionality}
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded text-sm transition-colors"
        >
          Test if Cookies Work
        </button>
      </div>

      {/* Custom Cookie Management */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Custom Cookie Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
          <input
            type="text"
            placeholder="Cookie Name"
            value={customCookieName}
            onChange={(e) => setCustomCookieName(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
          <input
            type="text"
            placeholder="Cookie Value"
            value={customCookieValue}
            onChange={(e) => setCustomCookieValue(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
          <input
            type="number"
            placeholder="Days"
            value={customCookieDays}
            onChange={(e) => setCustomCookieDays(parseInt(e.target.value) || 30)}
            className="px-3 py-2 border border-gray-300 rounded text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
          />
          <button
            onClick={handleSetCustomCookie}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Set Cookie
          </button>
        </div>
      </div>

      {/* All Cookies Display */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 dark:text-white">All Cookies</h3>
          <button
            onClick={refreshCookies}
            className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
          >
            Refresh
          </button>
        </div>
        <div className="max-h-40 overflow-y-auto">
          {Object.keys(allCookies).length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-sm">No cookies found. Click refresh to load.</p>
          ) : (
            <div className="space-y-2">
              {Object.entries(allCookies).map(([name, value]) => (
                <div key={name} className="flex items-center justify-between bg-white dark:bg-gray-600 p-2 rounded text-sm">
                  <div>
                    <span className="font-medium">{name}:</span> {value}
                  </div>
                  <button
                    onClick={() => handleDeleteCustomCookie(name)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-xs"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center">
        <button
          onClick={resetCookieConsent}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Reset All Cookie Preferences
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          This will reset all cookie preferences and show the banner again
        </p>
      </div>
    </div>
  );
};

export default CookieDemo;
