import React from 'react'
import Hero from '../../../sections/User/Hero/Hero'
import AdBanner from '../../../components/User/Adbanner/Adbanner'
import CanPosts from '../../../sections/User/CanPosts/CanPosts';
import Showcase from '../../../sections/User/Showcase/Showcase';
import NewsCinemaSection from '../../../sections/User/NewsCinemaSection';

const Homepage = () => {
  return (
    <div>
      <div className="w-full h-auto bg-gradient-to-r from-purple-200 to-indigo-300 dark:from-gray-800 dark:to-gray-900 py-10 text-center">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 animate-pulse">
      🚧 Website Under Development 🚧
    </h1>
    <h3 className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300">
      Welcome to the <span className="font-semibold text-indigo-600 dark:text-indigo-400">Beta Version</span> of our Website!
    </h3>
    <p className="mt-4 text-gray-600 dark:text-gray-400">
      We’re working hard to bring you the best experience. Stay tuned!
    </p>

    <div className="mt-8">
      <p className="text-md sm:text-lg text-red-700 dark:text-red-300 mb-4 font-medium">
        Admin Notice: Please upload some content to showcase to users.
      </p>
      <a
        href="/admin"
        className="inline-block px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-md transition duration-300"
      >
        Go to Admin Dashboard & Add Post
      </a>
    </div>
  </div>

        <AdBanner position="homepage-top"/>
        <Hero/>
        <Showcase/>
        <NewsCinemaSection/>
        <CanPosts/>
    </div>
  )
}

export default Homepage