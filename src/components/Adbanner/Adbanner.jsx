import React from 'react';

const AdBanner = ({ image, link }) => {
  return (
    <div className="relative w-full max-w-screen-lg mx-auto my-6 group">
      {/* Link wrapping the image */}
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={image}
          alt="Advertisement"
          className="w-full h-auto rounded-lg shadow-md transform transition-transform duration-300 group-hover:scale-105"
        />
      </a>

      {/* "Can Advertisement" Label */}
      <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
        Can Advertisement
      </span>
    </div>
  );
};

export default AdBanner;
