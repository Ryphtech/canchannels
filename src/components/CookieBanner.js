import React, { useState } from 'react';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 bg-opacity-90 text-white p-3 sm:p-4 z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs sm:text-sm">
            This website uses cookies. By continuing to use this website you are giving consent to cookies being used. 
            Visit our <a href="/privacy-policy" className="text-blue-300 hover:text-blue-200 underline">Privacy and Cookie Policy</a>.
          </p>
        </div>
        <button 
          onClick={() => setIsVisible(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded font-semibold text-xs sm:text-sm transition-colors sm:ml-4"
        >
          I Agree
        </button>
      </div>
    </div>
  );
};

export default CookieBanner; 