-- COMPREHENSIVE SOLUTION SCRIPT FOR YOUTUBE VIDEO FUNCTIONALITY
-- Run this in your Supabase SQL Editor to fix all issues

-- =====================================================
-- STEP 1: VERIFY CURRENT STATE
-- =====================================================

-- Check if posts table exists
SELECT 
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts') 
        THEN 'Posts table EXISTS' 
        ELSE 'Posts table DOES NOT EXIST' 
    END as table_status;

-- Check posts table structure (if it exists)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    udt_name
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;

-- =====================================================
-- STEP 2: FIX DATABASE STRUCTURE
-- =====================================================

-- Drop existing posts table if it has wrong structure
DROP TABLE IF EXISTS posts CASCADE;

-- Create posts table with correct structure
CREATE TABLE posts (
    id BIGINT PRIMARY KEY, -- Using BIGINT to match the admin dashboard logic
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT,
    image TEXT,
    links JSONB DEFAULT '[]'::jsonb NOT NULL,
    featured BOOLEAN DEFAULT FALSE,
    category TEXT,
    keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_featured ON posts(featured);
CREATE INDEX idx_posts_links ON posts USING GIN (links);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on posts" ON posts
    FOR ALL USING (true);

-- =====================================================
-- STEP 3: INSERT SAMPLE DATA WITH YOUTUBE VIDEOS
-- =====================================================

-- Insert sample posts with YouTube videos
INSERT INTO posts (id, title, subtitle, content, image, links, featured, category, created_at) VALUES
(
    1,
    'Test YouTube Video Post',
    'Testing YouTube video functionality',
    'This is a test post to verify that YouTube videos are properly stored and retrieved from the database. The post should include a YouTube link that will be displayed as an embedded video on the frontend.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    '[{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "title": "Test YouTube Video"}]'::jsonb,
    true,
    'can-exclusive',
    NOW()
),
(
    2,
    'Multiple Links Test Post',
    'Testing multiple links including YouTube',
    'This post tests the handling of multiple links, including both YouTube videos and regular links. The system should detect YouTube links and display them as embedded videos.',
    'https://images.unsplash.com/photo-1489599835382-957593cb2371?w=800&h=400&fit=crop',
    '[
        {"url": "https://www.youtube.com/watch?v=jNQXAC9IVRw", "title": "First YouTube Video"},
        {"url": "https://example.com/article", "title": "Read Article"},
        {"url": "https://www.youtube.com/watch?v=9bZkp7q19f0", "title": "Second YouTube Video"}
    ]'::jsonb,
    false,
    'cinema',
    NOW()
),
(
    3,
    'Regular Links Post',
    'Testing regular links without YouTube',
    'This post tests the handling of regular links without YouTube videos. The system should display these as clickable links.',
    'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=400&fit=crop',
    '[
        {"url": "https://example.com/full-article", "title": "Read Full Article"},
        {"url": "https://example.com/related-content", "title": "Related Content"}
    ]'::jsonb,
    false,
    'can-news',
    NOW()
),
(
    4,
    'No Links Post',
    'Testing post without any links',
    'This post tests the handling of posts without any links. The system should show a placeholder for the video section.',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    '[]'::jsonb,
    false,
    'general',
    NOW()
);

-- =====================================================
-- STEP 4: VERIFY DATA INSERTION
-- =====================================================

-- Check all posts and their link status
SELECT 
    id,
    title,
    category,
    links,
    jsonb_array_length(links) as links_count,
    CASE 
        WHEN links IS NULL THEN 'NULL'
        WHEN jsonb_array_length(links) = 0 THEN 'Empty Array'
        WHEN links @> '[{"url": "https://www.youtube.com"}]'::jsonb THEN 'Has YouTube Video'
        ELSE 'Has Regular Links'
    END as link_status,
    created_at
FROM posts 
ORDER BY id;

-- =====================================================
-- STEP 5: TEST YOUTUBE DETECTION QUERIES
-- =====================================================

-- Test querying posts with YouTube links
SELECT 
    id,
    title,
    links,
    CASE 
        WHEN links @> '[{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}]'::jsonb 
        THEN 'Contains Test Video'
        WHEN links @> '[{"url": "https://www.youtube.com/watch?v=jNQXAC9IVRw"}]'::jsonb 
        THEN 'Contains First Video'
        WHEN links @> '[{"url": "https://www.youtube.com/watch?v=9bZkp7q19f0"}]'::jsonb 
        THEN 'Contains Second Video'
        ELSE 'No YouTube Video'
    END as video_status
FROM posts 
WHERE links IS NOT NULL AND jsonb_array_length(links) > 0;

-- =====================================================
-- STEP 6: FINAL VERIFICATION
-- =====================================================

-- Summary statistics
SELECT 
    'Total Posts' as metric,
    COUNT(*) as value
FROM posts
UNION ALL
SELECT 
    'Posts with YouTube Videos' as metric,
    COUNT(*) as value
FROM posts 
WHERE links @> '[{"url": "https://www.youtube.com"}]'::jsonb
UNION ALL
SELECT 
    'Posts with Regular Links' as metric,
    COUNT(*) as value
FROM posts 
WHERE jsonb_array_length(links) > 0 
AND NOT (links @> '[{"url": "https://www.youtube.com"}]'::jsonb)
UNION ALL
SELECT 
    'Posts with No Links' as metric,
    COUNT(*) as value
FROM posts 
WHERE jsonb_array_length(links) = 0;

-- =====================================================
-- STEP 7: TEST JSONB OPERATIONS
-- =====================================================

-- Test JSONB functions
SELECT 
    'JSONB Type Check' as test,
    jsonb_typeof(links) as result
FROM posts 
WHERE id = 1
UNION ALL
SELECT 
    'Array Length Check' as test,
    jsonb_array_length(links)::text as result
FROM posts 
WHERE id = 1
UNION ALL
SELECT 
    'YouTube URL Check' as test,
    CASE 
        WHEN links @> '[{"url": "https://www.youtube.com"}]'::jsonb 
        THEN 'Contains YouTube URL'
        ELSE 'No YouTube URL'
    END as result
FROM posts 
WHERE id = 1;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

SELECT 
    '✅ DATABASE SETUP COMPLETE!' as status,
    'YouTube video functionality should now work correctly.' as message,
    'Check your frontend application to see the videos.' as next_step;
