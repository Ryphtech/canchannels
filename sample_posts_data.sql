-- Sample posts data with proper categories
-- This file can be run in your Supabase SQL editor to populate the posts table with test data

INSERT INTO posts (title, subtitle, content, image, links, featured, category, created_at) VALUES
(
    'Latest Can News Update',
    'Breaking news from the Can community',
    'This is a sample post about the latest developments in the Can community. Stay tuned for more updates and exclusive content.',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
    '[{"url": "https://example.com/can-news", "title": "Read Full Article"}]',
    true,
    'can-news',
    NOW() - INTERVAL '1 day'
),
(
    'Exclusive Interview with Can Creator',
    'Behind the scenes with a prominent Can creator',
    'An exclusive interview revealing the creative process and insights from one of the most influential Can creators in the community.',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
    '[{"url": "https://example.com/exclusive-interview", "title": "Watch Interview"}]',
    true,
    'can-exclusive',
    NOW() - INTERVAL '2 days'
),
(
    'Cinema Review: Latest Blockbuster',
    'In-depth analysis of the newest cinema release',
    'A comprehensive review of the latest blockbuster movie, including plot analysis, performance reviews, and audience reactions.',
    'https://images.unsplash.com/photo-1489599835382-957593cb2371?w=800&h=400&fit=crop',
    '[{"url": "https://example.com/cinema-review", "title": "Read Review"}]',
    false,
    'cinema',
    NOW() - INTERVAL '3 days'
),
(
    'General Community Update',
    'What\'s happening in the broader community',
    'A general update about community events, announcements, and important information for all members.',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    '[{"url": "https://example.com/community-update", "title": "Learn More"}]',
    false,
    'general',
    NOW() - INTERVAL '4 days'
),
(
    'Can News: Technology Breakthrough',
    'Revolutionary technology developments',
    'Latest technological breakthroughs and innovations that are shaping the future of content creation and community engagement.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    '[{"url": "https://example.com/tech-breakthrough", "title": "Explore Technology"}]',
    false,
    'can-news',
    NOW() - INTERVAL '5 days'
),
(
    'Exclusive Behind-the-Scenes',
    'Never-before-seen content from creators',
    'Exclusive behind-the-scenes content showing the creative process, challenges, and triumphs of content creators.',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    '[{"url": "https://example.com/behind-scenes", "title": "Watch Now"}]',
    true,
    'can-exclusive',
    NOW() - INTERVAL '6 days'
),
(
    'Cinema Classics Revisited',
    'Timeless movies that shaped the industry',
    'A look back at classic cinema masterpieces and their lasting impact on the film industry and popular culture.',
    'https://images.unsplash.com/photo-1489599835382-957593cb2371?w=800&h=400&fit=crop',
    '[{"url": "https://example.com/cinema-classics", "title": "Discover Classics"}]',
    false,
    'cinema',
    NOW() - INTERVAL '7 days'
),
(
    'Community Spotlight: Featured Members',
    'Celebrating outstanding community members',
    'Highlighting the achievements and contributions of outstanding community members who make a difference.',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    '[{"url": "https://example.com/community-spotlight", "title": "Meet Members"}]',
    false,
    'general',
    NOW() - INTERVAL '8 days'
);
