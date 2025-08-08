import React from 'react';

const Navlinks = () => {
  const links = [
    'Cinema',
    'Can Politics',
    'Can Exclusive',
    'Popular News',
    'Cele Videos',
    'Popular Videos',
    'Astro',
    'New Showcases',
    'Trailer/Teaser/Songs'
  ];

  return (
    <div className="w-full flex justify-center items-center p-4 overflow-x-auto">
      <div className="flex gap-4 flex-wrap justify-between">
        {links.map((link, index) => (
          <a
            key={index}
            href="#"
            className="text-sm font-medium hover:underline whitespace-nowrap"
          >
            {link}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Navlinks;
