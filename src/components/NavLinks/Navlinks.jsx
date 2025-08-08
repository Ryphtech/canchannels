import React from 'react';

const Navlinks = () => {
  return (
    <div className="w-full">
      {/* For large screens */}
      <div className="hidden md:flex justify-center items-center p-4 overflow-x-auto">
        <ul className="flex gap-4 flex-wrap justify-between">
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap">Cinema</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap">Can Politics</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap">Can Exclusive</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap">Popular News</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap">Cele Videos</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap">Popular Videos</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap">Astro</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap">New Showcases</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap">Trailer/Teaser/Songs</a></li>
        </ul>
      </div>

      {/* For small screens */}
      <div className="md:hidden p-4">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-md font-semibold">
            Show Content
          </div>
          <div className="collapse-content">
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm font-medium hover:underline">Cinema</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">Can Politics</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">Can Exclusive</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">Popular News</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">Cele Videos</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">Popular Videos</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">Astro</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">New Showcases</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">Trailer/Teaser/Songs</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navlinks;
