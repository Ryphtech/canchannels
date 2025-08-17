import React from 'react';
import { useAdvertisements } from '../../../hooks/useAdvertisements';

const AdBanner = ({ position = 'homepage-top', fallbackImage = 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg', fallbackLink = 'https://example.com' }) => {
  const { advertisements, loading, error } = useAdvertisements(position);

  // If loading or error, show fallback
  if (loading || error || advertisements.length === 0) {
    return (
      <div className="relative w-full max-w-screen-lg mx-auto my-6 group">
        <a href={fallbackLink} target="_blank" rel="noopener noreferrer">
          <img
            src={fallbackImage}
            alt="Advertisement"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </a>
        <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
          Can Advertisement
        </span>
      </div>
    );
  }

  // Get the first active advertisement for this position
  const advertisement = advertisements[0];

  return (
    <div className="relative w-full max-w-screen-lg mx-auto my-6 group">
      <a href={advertisement.link_url} target="_blank" rel="noopener noreferrer">
        <img
          src={advertisement.image_url}
          alt={advertisement.title || "Advertisement"}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </a>
      <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
        Can Advertisement
      </span>
    </div>
  );
};

export default AdBanner;
