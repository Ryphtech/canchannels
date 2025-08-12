import React from 'react';

const Content = () => {
  const contentData = [
    {
      id: 1,
      title: "The Rise of AI in Everyday Life",
      image: "https://www.svgrepo.com/show/508699/landscape-placeholder.svg",
      youtubeLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      description: `Artificial Intelligence (AI) has made its way into every corner of modern life. From the moment we wake up, AI begins to influence our decisions. Smart assistants like Google Assistant, Siri, and Alexa help us set alarms, manage our schedules, and even control our smart home devices. These conveniences, once considered futuristic, are now taken for granted. 

      In the business world, AI plays an even bigger role. It analyzes customer behavior, predicts buying patterns, and personalizes recommendations — all of which significantly boost engagement and sales. For example, e-commerce giants use AI to suggest products based on your browsing history, making shopping more intuitive and efficient. 

      Healthcare is another domain undergoing a massive transformation due to AI. Medical imaging, diagnostics, and predictive analysis now rely heavily on machine learning algorithms. AI helps detect diseases earlier and more accurately than ever before, potentially saving lives through early intervention. Furthermore, robotic surgeries, though still in their infancy, are showing promising results by improving precision and reducing recovery time.

      AI also contributes to education by personalizing learning experiences. Platforms can now adapt content based on a student’s strengths and weaknesses, making education more effective. In transportation, self-driving cars, route optimization, and real-time traffic predictions are reshaping how we travel.

      However, the rise of AI also brings challenges. Ethical concerns about privacy, bias in algorithms, job displacement, and dependency on technology are serious issues that must be addressed. As machines grow smarter, we must ensure that humans stay in control.

      The future of AI is undoubtedly exciting. As technology evolves, we may see even more groundbreaking applications that were previously unimaginable. Whether it’s in creativity, automation, or deep scientific research, AI will continue to be a driving force. What matters most is how we guide this powerful tool for the betterment of society.`
    }
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Left Section */}
      <div className="w-full md:w-3/4 space-y-6">
        {contentData.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-900 rounded-xl shadow p-4"
          >
            <h2 className="text-2xl font-bold mb-4">{item.title}</h2>

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 md:h-64 object-cover rounded-lg mb-4"
            />
            <a
              href={item.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-blue-600 hover:underline font-medium text-right"
            >
              Watch it on YouTube
            </a>

            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line mb-4 text-justify leading-relaxed">
              {item.description}
            </p>

          </div>
        ))}
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/4 space-y-4">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="font-semibold text-lg mb-2">Right Panel</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            You can place ads, social links, trending posts, or suggestions here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Content;
