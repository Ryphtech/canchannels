import React from 'react'
import Hero from '../../../sections/User/Hero/Hero'
import AdBanner from '../../../components/User/Adbanner/Adbanner'
import CanPosts from '../../../sections/User/CanPosts/CanPosts';
import Showcase from '../../../sections/User/Showcase/Showcase';

const Homepage = () => {
  return (
    <div>
        <AdBanner image = 'https://cdn.shopify.com/s/files/1/0397/9113/2717/files/banner_website.jpg?v=1751957812&width=2048' link="https://example.com"/>
        <Hero/>
        <CanPosts/>
        <Showcase/>
    </div>
  )
}

export default Homepage