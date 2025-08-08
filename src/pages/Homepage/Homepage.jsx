import React from 'react'
import Hero from '../../sections/Hero/Hero'
import AdBanner from '../../components/Adbanner/Adbanner'

const Homepage = () => {
  return (
    <div>
        <AdBanner image = 'https://cdn.shopify.com/s/files/1/0397/9113/2717/files/banner_website.jpg?v=1751957812&width=2048' link="https://example.com"/>
        <Hero/>
    </div>
  )
}

export default Homepage