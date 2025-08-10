import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="text-xl sm:text-2xl font-bold">
                <span className="text-can-red">can</span>
                <span className="text-can-blue">channels</span>
              </div>
            </div>
            <div className="text-xs sm:text-sm font-semibold text-gray-800">CAN CHANNELS</div>
          </div>

          {/* Advertisement Banner */}
          <div className="w-full sm:w-auto sm:flex-1 sm:mx-4">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between text-white">
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 sm:mb-0">
                <div className="text-center">
                  <div className="font-bold text-sm sm:text-lg">Chungath Jewellery</div>
                  <div className="text-xs sm:text-sm">Since 1914</div>
                  <div className="text-xs sm:text-sm">89 4343 1234</div>
                </div>
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-lg sm:text-2xl">⚖️</span>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-xs sm:text-sm">BIS 916 HUID GOLD</div>
                  <div className="text-xs">New Lightweight Collections</div>
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-sm sm:text-lg">Chungath Jewellery</div>
                <div className="text-xs sm:text-sm">89 4343 1234</div>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <FaFacebook className="text-gray-800 text-lg sm:text-xl hover:text-can-blue transition-colors cursor-pointer" />
            <FaTwitter className="text-gray-800 text-lg sm:text-xl hover:text-can-blue transition-colors cursor-pointer" />
            <FaInstagram className="text-gray-800 text-lg sm:text-xl hover:text-can-blue transition-colors cursor-pointer" />
            <FaYoutube className="text-gray-800 text-lg sm:text-xl hover:text-can-red transition-colors cursor-pointer" />
          </div>
        </div>

        {/* Location Bar */}
        <div className="mt-2 bg-can-dark-red text-white py-2 px-3 sm:px-4 rounded">
          <div className="text-center text-xs sm:text-sm">
            Trivandrum | Kollam | Kundara | Karunagappally | Ernakulam
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 