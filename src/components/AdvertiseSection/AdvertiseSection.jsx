import React from 'react';

const AdvertiseSection = () => {
  return (
  <div className="w-full p-6 md:p-10 rounded-xl shadow-lg text-center my-5">
    <div className="mb-6">
      <h2 className="font-bold mb-4">
        Advertise Your Content With Us
      </h2>
      <small className="mb-6 max-w-2xl mx-auto block">
        Reach thousands of daily readers by showcasing your brand, product, or story on our platform. 
        We offer tailored placements to make sure your content stands out to the right audience.
        If you're interested in promoting your content with us, click the Advertise button below.
      </small>
    </div>
    <button className="btn">
      Advertise
    </button>
  </div>
);

};

export default AdvertiseSection;
