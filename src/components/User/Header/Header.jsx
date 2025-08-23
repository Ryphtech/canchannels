import React, { useEffect, useState } from "react";
import logo_small from '../../../assets/can-channels-logo-small.png'
import Navlinks from "../NavLinks/Navlinks";
import { useCookieConsent } from '../../../contexts/CookieConsentContext';
import { useTheme } from '../../../contexts/ThemeContext';
import CookiePreferences from '../../Global/CookiePreferences/CookiePreferences';

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showCookiePreferences, setShowCookiePreferences] = useState(false);
  const { hasConsented } = useCookieConsent();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format date as "Aug 15"
  const formattedDate = currentDateTime.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  // Format time as HH:MM:SS AM/PM
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm md:px-20 lg:px-30">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>About Us</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
              <li>
                <a>Today's News</a>
              </li>
            </ul>
          </div>
          <div>
          <div className="ml-4 text-center text-sm leading-tight">
          <img src={logo_small} className="w-35 md:w-40 rounded bg-transparent" alt="logo" />
            <div><small>{formattedDate} | {formattedTime}</small></div>
          </div>
          {/* <a className="btn btn-ghost text-xl">Can Channels</a> */}
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a>Today's News</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex items-center gap-2">
  {/* Advertise Button */}
  <a className="btn btn-ghost">Advertise</a>

  {/* Cookie Preferences Button */}
  <button 
    onClick={() => setShowCookiePreferences(true)}
    className="btn btn-ghost btn-circle"
    aria-label="Cookie Preferences"
    title="Cookie Preferences"
  >
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </button>

  {/* Search Icon Button */}
  <button className="btn btn-ghost btn-circle" aria-label="Search">
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
      />
    </svg>
  </button>

  {/* Notification Bell */}
  <button className="btn btn-ghost btn-circle relative" aria-label="Notifications">
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-5 5v-5zM11 19H6a2 2 0 01-2-2V6a2 2 0 012-2h5m5 0v5m0-5h5m-5 0l-5 5"
      />
    </svg>
  </button>

  {/* Theme Toggle Button */}
  <button
    onClick={toggleTheme}
    className="btn btn-circle bg-gray-300"
    aria-label="Toggle theme"
  >
    {theme === 'dark' ? (
      <svg className="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    )}
  </button>
</div>

      </div>
      <Navlinks/>
      
      {/* Cookie Preferences Modal */}
      <CookiePreferences 
        isOpen={showCookiePreferences} 
        onClose={() => setShowCookiePreferences(false)} 
      />
    </div>
  );
};

export default Header;