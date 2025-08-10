import React from 'react';

const Showcase = () => {
  const celebrities = [
    {
      id: 1,
      name: "Celebrity 1",
      image: "https://via.placeholder.com/150x150/FFD700/000000?text=Celeb+1"
    },
    {
      id: 2,
      name: "Celebrity 2", 
      image: "https://via.placeholder.com/150x150/228B22/FFFFFF?text=Celeb+2"
    },
    {
      id: 3,
      name: "Celebrity 3",
      image: "https://via.placeholder.com/150x150/1E90FF/FFFFFF?text=Celeb+3"
    },
    {
      id: 4,
      name: "Celebrity 4",
      image: "https://via.placeholder.com/150x150/FF6347/FFFFFF?text=Celeb+4"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mt-4 sm:mt-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 border-b-2 border-can-purple pb-2">
        NEW SHOWCASE
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Movie Poster */}
        <div className="space-y-3 sm:space-y-4">
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg p-4 sm:p-6 text-center">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">
              UNITED KINGDOM OF KERALA
            </h3>
            <div className="bg-white rounded-lg p-3 sm:p-4 mb-3 sm:mb-4">
              <div className="w-full h-48 sm:h-64 bg-gradient-to-br from-green-800 to-green-600 rounded-lg flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
                🏛️ Kerala Architecture
              </div>
            </div>
            <div className="text-white text-xs sm:text-sm space-y-1 sm:space-y-2">
              <p><strong>WRITTEN & DIRECTED BY:</strong> ARUN VAIGA</p>
              <p><strong>PRODUCED BY:</strong> ANNE SAJEEV ALEX</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mt-3 sm:mt-4">
                <div className="bg-white text-green-800 px-2 sm:px-3 py-1 rounded text-xs font-semibold">
                  FRAGRANT NATURE FILM CREATIONS
                </div>
                <div className="bg-white text-green-800 px-2 sm:px-3 py-1 rounded text-xs font-semibold">
                  POOYAPPALLY FILMS
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Celebrity Grid */}
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
            Featured Personalities
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
            {celebrities.map((celebrity) => (
              <div key={celebrity.id} className="text-center">
                <div className="w-full aspect-square rounded-lg overflow-hidden mb-2">
                  <img 
                    src={celebrity.image} 
                    alt={celebrity.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-700">{celebrity.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showcase; 