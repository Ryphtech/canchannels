import React from 'react';
import { useCookieConsent } from '../../../contexts/CookieConsentContext';

const PrivacyPolicy = () => {
  const { cookieConsent, hasConsented } = useCookieConsent();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Privacy and Cookie Policy
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                🍪 Cookie Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This website uses cookies to enhance your browsing experience and provide personalized content. 
                Cookies are small text files that are stored on your device when you visit our website.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Your Current Cookie Settings:</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-blue-700 dark:text-blue-300">Necessary</div>
                    <div className="text-green-600">✅ Always Active</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-700 dark:text-blue-300">Analytics</div>
                    <div className={cookieConsent.analytics ? 'text-green-600' : 'text-red-600'}>
                      {cookieConsent.analytics ? '✅ Enabled' : '❌ Disabled'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-700 dark:text-blue-300">Marketing</div>
                    <div className={cookieConsent.marketing ? 'text-green-600' : 'text-red-600'}>
                      {cookieConsent.marketing ? '✅ Enabled' : '❌ Disabled'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-blue-700 dark:text-blue-300">Preferences</div>
                    <div className={cookieConsent.preferences ? 'text-green-600' : 'text-red-600'}>
                      {cookieConsent.preferences ? '✅ Enabled' : '❌ Disabled'}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Types of Cookies We Use
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🍞 Necessary Cookies</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    These cookies are essential for the website to function properly. They enable basic functions like 
                    page navigation, access to secure areas, and form submissions. The website cannot function properly 
                    without these cookies.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">📊 Analytics Cookies</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    These cookies help us understand how visitors interact with our website by collecting and reporting 
                    information anonymously. This helps us improve our website and provide better user experience.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">🎯 Marketing Cookies</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    These cookies are used to deliver personalized advertisements and track marketing campaign performance. 
                    They may be set by our advertising partners to build a profile of your interests.
                  </p>
                </div>

                <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">⚙️ Preference Cookies</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    These cookies remember your preferences and settings for a better browsing experience. They may 
                    include language preferences, theme settings, and other customization options.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                How to Manage Cookies
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You can manage your cookie preferences at any time by:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Clicking the cookie preferences button in the header</li>
                <li>Using your browser's cookie settings</li>
                <li>Clearing cookies through your browser's privacy settings</li>
                <li>Contacting us directly for assistance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Data Protection
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We are committed to protecting your privacy and ensuring the security of your personal information. 
                Any data collected through cookies is processed in accordance with applicable data protection laws.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                For more information about how we handle your data, please contact our privacy team.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Updates to This Policy
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                We may update this Privacy and Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. We will notify you of any material changes 
                by posting the updated policy on our website.
              </p>
            </section>

            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Need Help?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-3">
                If you have any questions about our Privacy and Cookie Policy or need help managing your preferences, 
                please don't hesitate to contact us.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  Contact Support
                </button>
                <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                  Download Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
