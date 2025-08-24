import React from 'react';

const Showcase = () => {
  // YouTube videos data
  const youtubeVideos = [
    {
      title: 'Official Trailer: The Return',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
    },
    {
      title: 'Teaser: Galactic Wars 2',
      url: 'https://www.youtube.com/embed/tgbNymZ7vqY'
    }
  ];

  return (
    <section className="py-8 px-4 bg-base-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            🎬 Can Releases
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Watch our latest videos, trailers, and exclusive content
          </p>
        </div>

        {youtubeVideos.length > 0 ? (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {youtubeVideos.map((video, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform duration-300">
                <div className="bg-base-200 rounded-lg overflow-hidden shadow-lg">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="w-full h-64"
                      src={video.url}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-base-content mb-2">{video.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-base-content/70">YouTube Video</span>
                      <span className="text-xs text-base-content/50">Featured</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-primary text-6xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold text-base-content mb-2">No Videos Available</h3>
            <p className="text-base-content/70 mb-4">
              We're working on bringing you amazing video content.
            </p>
            <p className="text-sm text-base-content/50">
              Check back soon for trailers, behind-the-scenes footage, and more!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Showcase;
