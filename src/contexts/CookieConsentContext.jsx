import React, { createContext, useContext, useState, useEffect } from 'react';
import { cookieUtils, COOKIE_TYPES, DEFAULT_COOKIE_SETTINGS } from '../utils/cookieUtils';

const CookieConsentContext = createContext();

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

export const CookieConsentProvider = ({ children }) => {
  const [cookieConsent, setCookieConsent] = useState(DEFAULT_COOKIE_SETTINGS);
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [cookiesEnabled, setCookiesEnabled] = useState(true);

  // Check if cookies are enabled and load saved consent
  useEffect(() => {
    const checkCookiesAndLoadConsent = () => {
      // Check if cookies are enabled
      const cookiesWork = cookieUtils.areCookiesEnabled();
      setCookiesEnabled(cookiesWork);

      if (cookiesWork) {
        // Try to load from cookies first
        const savedConsent = cookieUtils.getCookie('cookie-consent');
        const savedBannerState = cookieUtils.getCookie('cookie-banner-hidden');
        
        if (savedConsent) {
          try {
            const parsedConsent = JSON.parse(savedConsent);
            setCookieConsent(parsedConsent);
            setHasConsented(true);
          } catch (error) {
            console.error('Error parsing saved cookie consent:', error);
            // Fallback to localStorage if cookie parsing fails
            loadFromLocalStorage();
          }
        }
        
        if (savedBannerState === 'true') {
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      } else {
        // Cookies disabled, try localStorage
        loadFromLocalStorage();
      }
    };

    const loadFromLocalStorage = () => {
      try {
        const savedConsent = localStorage.getItem('cookie-consent');
        const savedBannerState = localStorage.getItem('cookie-banner-hidden');
        
        if (savedConsent) {
          const parsedConsent = JSON.parse(savedConsent);
          setCookieConsent(parsedConsent);
          setHasConsented(true);
        }
        
        if (savedBannerState === 'true') {
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      } catch (error) {
        console.error('Error loading from localStorage:', error);
        setShowBanner(true);
      }
    };

    checkCookiesAndLoadConsent();
  }, []);

  // Save cookie consent with fallback to localStorage
  const saveCookieConsent = (consent) => {
    setCookieConsent(consent);
    setHasConsented(true);
    setShowBanner(false);
    
    try {
      if (cookiesEnabled) {
        // Save to cookies
        cookieUtils.setCookie('cookie-consent', JSON.stringify(consent), 365);
        cookieUtils.setCookie('cookie-banner-hidden', 'true', 365);
      } else {
        // Fallback to localStorage
        localStorage.setItem('cookie-consent', JSON.stringify(consent));
        localStorage.setItem('cookie-banner-hidden', 'true');
      }
      
      // Apply cookie settings
      applyCookieSettings(consent);
    } catch (error) {
      console.error('Error saving cookie consent:', error);
      // Try localStorage as last resort
      try {
        localStorage.setItem('cookie-consent', JSON.stringify(consent));
        localStorage.setItem('cookie-banner-hidden', 'true');
      } catch (localStorageError) {
        console.error('Error saving to localStorage:', localStorageError);
      }
    }
  };

  // Accept all cookies
  const acceptAllCookies = () => {
    const allAccepted = {
      [COOKIE_TYPES.NECESSARY]: true,
      [COOKIE_TYPES.ANALYTICS]: true,
      [COOKIE_TYPES.MARKETING]: true,
      [COOKIE_TYPES.PREFERENCES]: true
    };
    saveCookieConsent(allAccepted);
  };

  // Accept only necessary cookies
  const acceptNecessaryCookies = () => {
    saveCookieConsent(DEFAULT_COOKIE_SETTINGS);
  };

  // Update specific cookie type consent
  const updateCookieTypeConsent = (type, value) => {
    const updatedConsent = { ...cookieConsent, [type]: value };
    setCookieConsent(updatedConsent);
  };

  // Apply cookie settings based on consent
  const applyCookieSettings = (consent) => {
    // Analytics cookies
    if (consent[COOKIE_TYPES.ANALYTICS]) {
      // Enable analytics tracking
      console.log('Analytics cookies enabled');
      // Add your analytics initialization here
      // Example: Google Analytics, etc.
    } else {
      // Disable analytics tracking
      console.log('Analytics cookies disabled');
      // Add your analytics cleanup here
    }

    // Marketing cookies
    if (consent[COOKIE_TYPES.MARKETING]) {
      // Enable marketing cookies
      console.log('Marketing cookies enabled');
      // Add your marketing cookie initialization here
      // Example: Facebook Pixel, Google Ads, etc.
    } else {
      // Disable marketing cookies
      console.log('Marketing cookies disabled');
      // Add your marketing cookie cleanup here
    }

    // Preferences cookies
    if (consent[COOKIE_TYPES.PREFERENCES]) {
      // Enable preference cookies
      console.log('Preference cookies enabled');
      // Add your preference cookie initialization here
      // Example: Theme preferences, language settings, etc.
    } else {
      // Disable preference cookies
      console.log('Preference cookies disabled');
      // Add your preference cookie cleanup here
    }
  };

  // Check if a specific cookie type is allowed
  const isCookieTypeAllowed = (type) => {
    return cookieConsent[type] || false;
  };

  // Get current cookie consent status
  const getCookieConsentStatus = () => {
    return {
      hasConsented,
      cookieConsent,
      showBanner,
      cookiesEnabled
    };
  };

  // Reset cookie consent
  const resetCookieConsent = () => {
    setCookieConsent(DEFAULT_COOKIE_SETTINGS);
    setHasConsented(false);
    setShowBanner(true);
    
    try {
      if (cookiesEnabled) {
        cookieUtils.deleteCookie('cookie-consent');
        cookieUtils.deleteCookie('cookie-banner-hidden');
      } else {
        localStorage.removeItem('cookie-consent');
        localStorage.removeItem('cookie-banner-hidden');
      }
    } catch (error) {
      console.error('Error resetting cookie consent:', error);
    }
  };

  const value = {
    cookieConsent,
    hasConsented,
    showBanner,
    cookiesEnabled,
    saveCookieConsent,
    acceptAllCookies,
    acceptNecessaryCookies,
    updateCookieTypeConsent,
    isCookieTypeAllowed,
    getCookieConsentStatus,
    setShowBanner,
    resetCookieConsent
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
};
