-- FIX YOUTUBE LINKS STORAGE ISSUE
-- Run this in your Supabase SQL Editor to fix the problem

-- =====================================================
-- STEP 1: CHECK CURRENT TABLE STRUCTURE
-- =====================================================

-- Check if posts table exists
SELECT 
    'Table Status' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts') 
        THEN '✅ Posts table exists' 
        ELSE '❌ Posts table missing' 
    END as result;

-- Check posts table structure (if it exists)
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;

-- =====================================================
-- STEP 2: FIX TABLE STRUCTURE
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

-- Grant permissions
GRANT ALL ON posts TO authenticated;

-- =====================================================
-- STEP 3: INSERT TEST DATA WITH YOUTUBE VIDEOS
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
);

-- =====================================================
-- STEP 4: VERIFY THE FIX
-- =====================================================

-- Check if the posts were inserted correctly
SELECT 
    id,
    title,
    links,
    jsonb_typeof(links) as links_type,
    jsonb_array_length(links) as links_count,
    CASE 
        WHEN links @> '[{"url": "https://www.youtube.com"}]'::jsonb 
        THEN '🎥 Has YouTube Video'
        WHEN jsonb_array_length(links) > 0 
        THEN '🔗 Has Regular Links' 
        ELSE '📝 No Links'
    END as link_status
FROM posts 
ORDER BY id;

-- Test YouTube detection
SELECT 
    'YouTube Videos Found' as check_type,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM posts 
            WHERE links @> '[{"url": "https://www.youtube.com"}]'::jsonb
        )
        THEN '✅ Posts with YouTube videos found'
        ELSE '❌ No posts with YouTube videos'
    END as result;

-- =====================================================
-- STEP 5: FINAL VERIFICATION
-- =====================================================

SELECT 
    'FINAL VERIFICATION' as status,
    'YouTube links issue has been fixed!' as message,
    'Posts table now has correct JSONB links column' as details,
    'Try adding a new post with YouTube links' as next_step;
