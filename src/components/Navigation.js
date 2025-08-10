import React from 'react';
import { FaBars, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';

const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const navItems = [
    'HOME', 'CAN NEWS', 'CINEMA', 'CAN POLITICS', 'CAN EXCLUSIVE', 
    'ASTRO', 'CELE VIDEOS', 'GALLERY', 'MOVIE', 'ABOUT US'
  ];

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <nav className="bg-can-red text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Hamburger Menu - Always Visible */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <FaBars className="text-xl" />
          </button>

          {/* Navigation Links - Hidden on all screens when menu is closed */}
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex items-center space-x-6`}>
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="nav-link text-sm font-semibold uppercase"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Side - Advertise Button and Date */}
          <div className="flex items-center space-x-4">
            <button className="btn-secondary flex items-center space-x-2 text-sm">
              <span>ADVERTISE</span>
              <FaArrowRight className="text-xs" />
            </button>
            <div className="hidden md:flex items-center space-x-2 text-sm">
              <FaCalendarAlt />
              <span>{currentDate}</span>
            </div>
          </div>
        </div>

        {/* Mobile/Desktop Menu - Always visible when open */}
        {isMenuOpen && (
          <div className="bg-can-dark-red py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item, index) => (
                <a 
                  key={index}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="nav-link text-sm font-semibold uppercase px-4 py-2 hover:bg-can-red"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 