import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
  FaFacebookMessenger,
} from 'react-icons/fa';

const Socialmedia = () => {
  return (
    <div className="text-center mt-6">
      <h3 className="text-lg font-semibold mb-4">Follow us on</h3>
      <div className="flex justify-center gap-5 text-2xl">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-600 transform hover:scale-110 transition duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700 transform hover:scale-110 transition duration-300"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-500 hover:text-sky-600 transform hover:scale-110 transition duration-300"
        >
          <FaTwitter />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 hover:text-red-700 transform hover:scale-110 transition duration-300"
        >
          <FaYoutube />
        </a>
        <a
          href="https://wa.me/yourphonenumber"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-600 transform hover:scale-110 transition duration-300"
        >
          <FaWhatsapp />
        </a>
        <a
          href="https://www.messenger.com/t/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600 transform hover:scale-110 transition duration-300"
        >
          <FaFacebookMessenger />
        </a>
      </div>
    </div>
  );
};

export default Socialmedia;
