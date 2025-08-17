import React from 'react';
import { useCookieConsent } from '../../../contexts/CookieConsentContext';

const CookieBanner = () => {
  const { showBanner, acceptAllCookies, acceptNecessaryCookies, setShowBanner } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-95 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
        <div className="flex-1 text-center lg:text-left">
          <h3 className="font-semibold text-lg mb-2">🍪 We use cookies</h3>
          <p className="text-sm text-gray-200 leading-relaxed">
            This website uses cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
            By continuing to use this site, you consent to our use of cookies. 
            <a href="/privacy-policy" className="text-blue-300 hover:text-blue-200 underline ml-1">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
          <button 
            onClick={acceptNecessaryCookies}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            Necessary Only
          </button>
          <button 
            onClick={acceptAllCookies}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner; 