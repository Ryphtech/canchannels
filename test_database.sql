-- Test Database Structure and YouTube Functionality
-- Run this in your Supabase SQL Editor to verify everything is working

-- 1. Check if posts table exists and has correct structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;

-- 2. Check if the links column is properly set up as JSONB
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    udt_name
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'links';

-- 3. Check current posts data
SELECT 
    id,
    title,
    category,
    links,
    created_at
FROM posts 
ORDER BY created_at DESC;

-- 4. Test inserting a post with YouTube video
INSERT INTO posts (title, subtitle, content, image, links, featured, category, created_at) VALUES
(
    'Test YouTube Video Post',
    'Testing YouTube video functionality',
    'This is a test post to verify that YouTube videos are properly stored and retrieved from the database. The post should include a YouTube link that will be displayed as an embedded video on the frontend.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    '[{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "title": "Test YouTube Video"}]'::jsonb,
    true,
    'can-exclusive',
    NOW()
);

-- 5. Verify the new post was inserted correctly
SELECT 
    id,
    title,
    links,
    jsonb_typeof(links) as links_type,
    jsonb_array_length(links) as links_count
FROM posts 
WHERE title = 'Test YouTube Video Post';

-- 6. Test inserting another post with multiple links (including YouTube)
INSERT INTO posts (title, subtitle, content, image, links, featured, category, created_at) VALUES
(
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

-- 7. Verify the multiple links post
SELECT 
    id,
    title,
    links,
    jsonb_array_length(links) as links_count,
    jsonb_array_elements_text(links) as individual_links
FROM posts 
WHERE title = 'Multiple Links Test Post';

-- 8. Test querying posts with YouTube links
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

-- 9. Check if there are any posts with empty or null links
SELECT 
    id,
    title,
    links,
    CASE 
        WHEN links IS NULL THEN 'NULL'
        WHEN jsonb_array_length(links) = 0 THEN 'Empty Array'
        ELSE 'Has Links'
    END as links_status
FROM posts;

-- 10. Test updating an existing post to add YouTube links
UPDATE posts 
SET links = '[{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "title": "Updated YouTube Video"}]'::jsonb
WHERE title = 'Latest Can News Update' 
AND (links IS NULL OR jsonb_array_length(links) = 0);

-- 11. Verify the update
SELECT 
    id,
    title,
    links,
    jsonb_array_length(links) as links_count
FROM posts 
WHERE title = 'Latest Can News Update';

-- 12. Final verification - all posts with their link status
SELECT 
    id,
    title,
    category,
    CASE 
        WHEN links IS NULL THEN 'No Links'
        WHEN jsonb_array_length(links) = 0 THEN 'Empty Links'
        WHEN links @> '[{"url": "https://www.youtube.com"}]'::jsonb 
        THEN 'Has YouTube Video'
        ELSE 'Has Regular Links'
    END as link_status,
    created_at
FROM posts 
ORDER BY created_at DESC;
