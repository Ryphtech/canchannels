import React from 'react';

const Navlinks = () => {
  return (
    <div className="w-full">
      {/* For large screens */}
      <div className="hidden md:flex justify-center items-center p-4 overflow-x-auto">
        <ul className="flex gap-4 flex-wrap justify-between">
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap border p-1 rounded">Cinema</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap border p-1 rounded">Can News</a></li>
          <li><a href="#" className="text-sm font-medium hover:underline whitespace-nowrap border p-1 rounded">Can Exclusive</a></li>
        </ul>
      </div>

      {/* For small screens */}
      <div className="md:hidden p-4">
        <div className="collapse collapse-arrow bg-base-200">
          <input type="checkbox" />
          <div className="collapse-title text-md font-semibold">
            Show Categories
          </div>
          <div className="collapse-content">
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="text-sm font-medium hover:underline">Cinema</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">Can News</a></li>
              <li><a href="#" className="text-sm font-medium hover:underline">Can Exclusive</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navlinks;
