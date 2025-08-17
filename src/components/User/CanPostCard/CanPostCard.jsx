import React from 'react';
import { useNavigate } from 'react-router-dom';

const CanPostCard = ({ id, image, title, description, link, publishedOn, category, links }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/content/${id}`);
  };

  return (
    <div 
      className="w-full max-w-sm mx-auto rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image */}
      <img
        className="w-full h-48 object-cover"
        src={image}
        alt={title}
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Category and Date */}
        <div className="mb-2 text-xs text-gray-500 flex justify-between">
          <span className="font-medium border p-1">{category || 'Uncategorized'}</span>
          <span>{publishedOn}</span>
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold mb-1 line-clamp-2">
          {title}
        </h2>

        {/* Description */}
        <p className="text-sm flex-grow line-clamp-3">
          {description}
        </p>

        {/* Read More */}
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium mt-2"
          >
            Read More →
          </a>
        )}
      </div>
    </div>
  );
};

export default CanPostCard;
