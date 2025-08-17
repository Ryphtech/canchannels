# Cookie Implementation Guide

This document explains how the cookie consent system works in the CanChannels application.

## Overview

The application implements a comprehensive cookie consent system that complies with GDPR and other privacy regulations. Users can choose which types of cookies they want to allow, and the system respects their preferences throughout their browsing experience.

## Features

- **Granular Cookie Control**: Users can enable/disable different cookie types independently
- **Persistent Preferences**: Cookie preferences are saved and remembered across sessions
- **Easy Access**: Cookie preferences can be changed at any time via the footer
- **Demo Component**: Interactive demo showing how different cookie types work
- **Responsive Design**: Works on all device sizes

## Cookie Types

### 1. Necessary Cookies
- **Purpose**: Essential for website functionality
- **Status**: Always enabled (cannot be disabled)
- **Examples**: Session management, security tokens
- **Duration**: Session-based or 1 year

### 2. Preferences Cookies
- **Purpose**: Remember user preferences and settings
- **Status**: User-configurable
- **Examples**: Theme preferences, language settings, UI preferences
- **Duration**: 1 year

### 3. Analytics Cookies
- **Purpose**: Track website usage and performance
- **Status**: User-configurable
- **Examples**: Page views, user behavior, performance metrics
- **Duration**: 7 days to 1 year

### 4. Marketing Cookies
- **Purpose**: Deliver personalized advertisements and track campaigns
- **Status**: User-configurable
- **Examples**: Ad targeting, campaign tracking, conversion tracking
- **Duration**: 90 days to 1 year

## How to Use

### For Users

1. **First Visit**: Cookie banner appears at the bottom of the page
2. **Choose Options**:
   - **Accept All**: Enables all cookie types
   - **Necessary Only**: Enables only essential cookies
   - **Customize**: Opens detailed preferences panel
3. **Change Later**: Click "🍪 Cookie Preferences" in the footer
4. **Test Functionality**: Use the demo component on the homepage

### For Developers

#### Basic Usage

```jsx
import { useCookieConsent } from '../hooks/useCookieConsent';

const MyComponent = () => {
  const { isCookieTypeAllowed } = useCookieConsent();
  
  const handleAction = () => {
    if (isCookieTypeAllowed('analytics')) {
      // Track analytics event
      console.log('Analytics enabled');
    } else {
      console.log('Analytics disabled');
    }
  };
  
  return (
    <button onClick={handleAction}>
      Track Event
    </button>
  );
};
```

#### Setting Cookies

```jsx
import { cookieUtils } from '../utils/cookieUtils';

// Set a cookie (respects user consent)
if (isCookieTypeAllowed('preferences')) {
  cookieUtils.setCookie('user-theme', 'dark', 365);
}

// Get a cookie
const theme = cookieUtils.getCookie('user-theme');

// Delete a cookie
cookieUtils.deleteCookie('user-theme');
```

#### Cookie Consent Context

```jsx
import { useCookieConsent } from '../hooks/useCookieConsent';

const MyComponent = () => {
  const {
    cookieConsent,        // Current cookie preferences
    hasConsented,         // Whether user has made a choice
    showBanner,           // Whether to show the banner
    acceptAllCookies,     // Function to accept all cookies
    acceptNecessaryCookies, // Function to accept only necessary
    updateCookieTypeConsent, // Function to update specific type
    isCookieTypeAllowed   // Check if specific type is allowed
  } = useCookieConsent();
  
  // Use these functions as needed
};
```

## File Structure

```
src/
├── components/Global/
│   ├── CookieBanner/          # Main cookie consent banner
│   ├── CookiePreferences/     # Detailed preferences modal
│   └── CookieDemo/           # Interactive demo component
├── contexts/
│   └── CookieConsentContext.jsx  # Cookie consent state management
├── hooks/
│   └── useCookieConsent.js    # Hook for easy access
├── utils/
│   └── cookieUtils.js         # Cookie utility functions
└── main.jsx                   # App wrapped with CookieConsentProvider
```

## Implementation Details

### Cookie Banner
- Appears on first visit
- Shows main options (Accept All, Necessary Only, Customize)
- Detailed preferences panel with individual toggles
- Responsive design for mobile and desktop

### Cookie Preferences Modal
- Accessible via footer link
- Shows current cookie status
- Allows granular control over each cookie type
- Quick action buttons for common scenarios

### Context Management
- Uses React Context for global state
- Persists preferences in browser cookies
- Automatically applies settings when changed
- Provides easy access throughout the app

### Utility Functions
- `setCookie()`: Set cookies with expiration
- `getCookie()`: Retrieve cookie values
- `deleteCookie()`: Remove cookies
- `areCookiesEnabled()`: Check if cookies work
- `getAllCookies()`: Get all cookies as object

## Testing

### Manual Testing
1. Visit the homepage
2. Check cookie banner appears
3. Try different consent options
4. Verify preferences are saved
5. Test functionality with different settings
6. Use browser dev tools to inspect cookies

### Demo Component
The homepage includes a `CookieDemo` component that:
- Shows current cookie status
- Demonstrates each cookie type
- Provides interactive testing
- Shows real-time feedback

## Browser Compatibility

- **Modern Browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Mobile Browsers**: Responsive design works on all devices
- **Cookie Settings**: Respects browser cookie settings
- **Private Browsing**: Works in incognito/private modes

## Privacy Compliance

- **GDPR Compliant**: Granular consent for different cookie types
- **User Control**: Easy access to change preferences
- **Transparency**: Clear explanation of each cookie type
- **Minimal Data**: Only necessary cookies are always enabled
- **Easy Opt-out**: Users can disable non-essential cookies

## Customization

### Adding New Cookie Types
1. Add new type to `COOKIE_TYPES` in `cookieUtils.js`
2. Update `DEFAULT_COOKIE_SETTINGS`
3. Add UI controls in `CookieBanner` and `CookiePreferences`
4. Update consent logic in `CookieConsentContext`

### Styling
- Uses Tailwind CSS classes
- Dark mode support
- Responsive design
- Customizable via CSS variables

### Localization
- Text strings can be easily translated
- Support for multiple languages
- RTL language support

## Troubleshooting

### Common Issues

1. **Cookies not saving**: Check browser cookie settings
2. **Banner not showing**: Verify context provider is wrapping the app
3. **Preferences not persisting**: Check cookie storage permissions
4. **Mobile layout issues**: Test responsive design

### Debug Mode
Enable console logging to see cookie operations:
```jsx
// In CookieConsentContext.jsx
console.log('Cookie consent updated:', consent);
console.log('Applying cookie settings...');
```

## Future Enhancements

- **A/B Testing**: Track consent patterns
- **Analytics Integration**: Google Analytics, etc.
- **Advanced Preferences**: More granular controls
- **Export/Import**: User preference portability
- **Compliance Reporting**: Generate consent reports

## Support

For questions or issues with the cookie implementation:
1. Check this documentation
2. Review the code examples
3. Test with the demo component
4. Check browser console for errors
5. Verify context provider setup
