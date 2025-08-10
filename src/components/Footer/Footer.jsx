import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

        {/* Branding */}
        <div>
          <h2 className="text-xl font-bold mb-2">CanChannels</h2>
          <p className="mb-4">Your one-stop destination for cinema, politics, entertainment, and more.</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Cinema</a></li>
            <li><a href="#" className="hover:underline">Politics</a></li>
            <li><a href="#" className="hover:underline">Videos</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-1">
            <li>Email: <a href="mailto:info@canchannels.com" className="hover:underline">info@canchannels.com</a></li>
            <li>Phone: <a href="tel:+919876543210" className="hover:underline">+91 98765 43210</a></li>
            <li>Location: Kochi, Kerala, India</li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" aria-label="Facebook">
              <svg className="w-5 h-5 fill-current hover:opacity-75" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.63 9.87v-6.99H8.07V12h2.3V9.76c0-2.27 1.35-3.52 3.42-3.52.99 0 2.03.18 2.03.18v2.24h-1.14c-1.13 0-1.48.7-1.48 1.42V12h2.52l-.4 2.88h-2.12v6.99A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg className="w-5 h-5 fill-current hover:opacity-75" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.59-2.46.69a4.25 4.25 0 0 0 1.88-2.35 8.48 8.48 0 0 1-2.7 1.03 4.22 4.22 0 0 0-7.17 3.84 11.98 11.98 0 0 1-8.7-4.41 4.21 4.21 0 0 0 1.31 5.63A4.14 4.14 0 0 1 2.8 9.7v.05a4.22 4.22 0 0 0 3.39 4.13 4.23 4.23 0 0 1-1.9.07 4.23 4.23 0 0 0 3.95 2.94A8.5 8.5 0 0 1 2 19.54a12 12 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18 0-.35-.01-.53A8.33 8.33 0 0 0 22.46 6z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg className="w-5 h-5 fill-current hover:opacity-75" viewBox="0 0 24 24">
                <path d="M7.75 2A5.76 5.76 0 0 0 2 7.75v8.5A5.76 5.76 0 0 0 7.75 22h8.5A5.76 5.76 0 0 0 22 16.25v-8.5A5.76 5.76 0 0 0 16.25 2h-8.5zm0 2h8.5A3.76 3.76 0 0 1 20 7.75v8.5A3.76 3.76 0 0 1 16.25 20h-8.5A3.76 3.76 0 0 1 4 16.25v-8.5A3.76 3.76 0 0 1 7.75 4zm8.25 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg className="w-5 h-5 fill-current hover:opacity-75" viewBox="0 0 24 24">
                <path d="M19.615 3.184C21.112 3.66 21.957 5.09 22 6.95c.083 3.7.083 7.4 0 11.1-.043 1.86-.888 3.29-2.385 3.765-3.03.844-15.2.844-18.23 0C1.888 21.34 1.043 19.91 1 18.05c-.083-3.7-.083-7.4 0-11.1.043-1.86.888-3.29 2.385-3.765C6.415 2.342 18.585 2.342 19.615 3.184zM10 8.5v7l6-3.5-6-3.5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-10 text-center text-xs border-t pt-4">
        <p>© {new Date().getFullYear()} Can Channels. All rights reserved.</p>
        <p className="mt-1">Designed and developed by <span className="font-semibold">Ryph Tech</span></p>
      </div>
    </footer>
  );
};

export default Footer;
