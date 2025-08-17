// Cookie utility functions
export const cookieUtils = {
  // Set a cookie with optional expiration days
  setCookie: (name, value, days = 365) => {
    try {
      const expires = new Date();
      expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
      
      // Build cookie string with security attributes
      let cookieString = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
      
      // Add security attributes if not in development
      if (window.location.protocol === 'https:') {
        cookieString += ';Secure';
      }
      
      cookieString += ';SameSite=Lax';
      
      document.cookie = cookieString;
      return true;
    } catch (error) {
      console.error('Error setting cookie:', error);
      return false;
    }
  },

  // Get a cookie value by name
  getCookie: (name) => {
    try {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting cookie:', error);
      return null;
    }
  },

  // Delete a cookie
  deleteCookie: (name) => {
    try {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
      return true;
    } catch (error) {
      console.error('Error deleting cookie:', error);
      return false;
    }
  },

  // Check if cookies are enabled
  areCookiesEnabled: () => {
    try {
      // Test if we can set and get a cookie
      const testName = 'cookie-test-' + Date.now();
      const testValue = 'test-value';
      
      // Try to set a test cookie
      if (!cookieUtils.setCookie(testName, testValue, 1)) {
        return false;
      }
      
      // Try to get the test cookie
      const retrievedValue = cookieUtils.getCookie(testName);
      
      // Clean up the test cookie
      cookieUtils.deleteCookie(testName);
      
      return retrievedValue === testValue;
    } catch (e) {
      return false;
    }
  },

  // Get all cookies as an object
  getAllCookies: () => {
    try {
      const cookies = {};
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf('=') > 0) {
          const name = c.substring(0, c.indexOf('='));
          const value = c.substring(c.indexOf('=') + 1, c.length);
          cookies[name] = decodeURIComponent(value);
        }
      }
      return cookies;
    } catch (error) {
      console.error('Error getting all cookies:', error);
      return {};
    }
  },

  // Check if a specific cookie exists
  hasCookie: (name) => {
    return cookieUtils.getCookie(name) !== null;
  },

  // Get cookie expiration date
  getCookieExpiration: (name) => {
    try {
      const nameEQ = name + "=";
      const ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) {
          // Extract expiration from the cookie string
          const cookieStr = c.substring(nameEQ.length, c.length);
          const expiresMatch = cookieStr.match(/expires=([^;]+)/);
          if (expiresMatch) {
            return new Date(expiresMatch[1]);
          }
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting cookie expiration:', error);
      return null;
    }
  }
};

// Cookie consent types
export const COOKIE_TYPES = {
  NECESSARY: 'necessary',
  ANALYTICS: 'analytics',
  MARKETING: 'marketing',
  PREFERENCES: 'preferences'
};

// Default cookie settings
export const DEFAULT_COOKIE_SETTINGS = {
  [COOKIE_TYPES.NECESSARY]: true, // Always enabled
  [COOKIE_TYPES.ANALYTICS]: false,
  [COOKIE_TYPES.MARKETING]: false,
  [COOKIE_TYPES.PREFERENCES]: false
};
