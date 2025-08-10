import React from 'react';
import CanPostCard from '../../components/CanPostCard/CanPostCard'; // Adjust path if needed

const Showcase = ({ youtubeVideos, newsList }) => {
  // Filter cinema-related news
  const cinemaNews = newsList.filter(news =>
    ['Can Exclusive'].includes(news.category)
  );

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">
            Can Exclusive and Releases
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - YouTube Videos */}
          <div className="flex flex-col space-y-6">
            {youtubeVideos.map((video, index) => (
              <div key={index}>
                <div className="aspect-w-16 aspect-h-9 mb-2">
                  <iframe
                    className="w-full h-64"
                    src={video.url}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-base font-semibold">{video.title}</p>
              </div>
            ))}
          </div>

          {/* Right Column - Cinema News Cards */}
          <div className="h-[600px] overflow-y-auto pr-2 scrollbar-hide">
  <div className="grid gap-6 grid-cols-2">
    {cinemaNews.map((news, index) => (
      <CanPostCard
        key={index}
        image={news.image}
        title={news.title}
        description={news.description}
        link={news.link}
        publishedOn={news.publishedOn}
        category={news.category}
      />
    ))}
  </div>
</div>

        </div>
      </div>
    </section>
  );
};

export default Showcase;
