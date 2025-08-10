import React from 'react'
import Hero from '../../sections/Hero/Hero'
import AdBanner from '../../components/Adbanner/Adbanner'
import CanPosts from '../../sections/CanPosts/CanPosts';
import Showcase from '../Showcase/Showcase';

const Homepage = () => {
  const dummyNewsList = [
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Cinema Star Speaks Out About Upcoming Film Release',
    description: 'The much-anticipated film by the award-winning actor is set to hit screens this week.',
    link: 'https://example.com/news/cinema-star',
    publishedOn: '2025-08-07',
    category: 'Cinema'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Can Politics: New Bill Passed Amidst Controversy',
    description: 'The new legislation has sparked debate among lawmakers and citizens alike.',
    link: 'https://example.com/news/politics-bill',
    publishedOn: '2025-08-06',
    category: 'Can Politics'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Exclusive Interview With Celeb Reveals Unknown Facts',
    description: 'In a candid conversation, the celebrity talks about their journey, career, and struggles.',
    link: 'https://example.com/news/exclusive-interview',
    publishedOn: '2025-08-05',
    category: 'Can Exclusive'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Popular Tech Trends Dominating 2025',
    description: 'AI, AR, and clean tech are among the biggest trends making waves in the industry.',
    link: 'https://example.com/news/tech-trends',
    publishedOn: '2025-08-04',
    category: 'Popular News'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Top Celeb Videos That Went Viral This Week',
    description: 'These short clips have taken social media by storm, crossing millions of views.',
    link: 'https://example.com/news/viral-celeb-videos',
    publishedOn: '2025-08-03',
    category: 'Cele Videos'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Astro Predictions for August 2025',
    description: 'Astrologers weigh in on what each zodiac sign can expect this month.',
    link: 'https://example.com/news/astrology-august',
    publishedOn: '2025-08-02',
    category: 'Astro'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Cinema Star Speaks Out About Upcoming Film Release',
    description: 'The much-anticipated film by the award-winning actor is set to hit screens this week.',
    link: 'https://example.com/news/cinema-star',
    publishedOn: '2025-08-07',
    category: 'Cinema'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Can Politics: New Bill Passed Amidst Controversy',
    description: 'The new legislation has sparked debate among lawmakers and citizens alike.',
    link: 'https://example.com/news/politics-bill',
    publishedOn: '2025-08-06',
    category: 'Can Politics'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Behind the Scenes of a Blockbuster: Can Exclusive Insight',
    description: 'Take a rare look behind the camera of the year’s biggest film production.',
    link: 'https://example.com/news/behind-the-scenes',
    publishedOn: '2025-08-01',
    category: 'Can Exclusive'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Can Exclusive: Director Shares Creative Process',
    description: 'In an in-depth interview, the director opens up about vision, challenges, and storytelling.',
    link: 'https://example.com/news/director-interview',
    publishedOn: '2025-07-30',
    category: 'Can Exclusive'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Exclusive Set Tour of a Fantasy Epic',
    description: 'Explore the incredible set of the new fantasy series before its global premiere.',
    link: 'https://example.com/news/set-tour',
    publishedOn: '2025-07-28',
    category: 'Can Exclusive'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Revealed: Star’s Secret Role in Upcoming Series',
    description: 'A-list actor makes a surprise appearance in this much-awaited web series.',
    link: 'https://example.com/news/secret-role',
    publishedOn: '2025-07-26',
    category: 'Can Exclusive'
  },
  {
    image: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
    title: 'Can Exclusive: Fashion Transformation of Celebs',
    description: 'How top celebrities reinvented their style for upcoming roles.',
    link: 'https://example.com/news/fashion-transformation',
    publishedOn: '2025-07-24',
    category: 'Can Exclusive'
  }
];
  const dummyVideos = [
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
    <div>
        <AdBanner image = 'https://cdn.shopify.com/s/files/1/0397/9113/2717/files/banner_website.jpg?v=1751957812&width=2048' link="https://example.com"/>
        <Hero/>
        <CanPosts newsList={dummyNewsList}/>
        <Showcase youtubeVideos={dummyVideos} newsList={dummyNewsList} />;
    </div>
  )
}

export default Homepage