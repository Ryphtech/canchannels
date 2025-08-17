-- Fix Existing Posts with Empty or Null Links
-- Run this after setting up the database structure

-- 1. First, let's see what posts currently exist and their link status
SELECT 
    id,
    title,
    category,
    links,
    CASE 
        WHEN links IS NULL THEN 'NULL'
        WHEN jsonb_array_length(links) = 0 THEN 'Empty Array'
        ELSE 'Has Links'
    END as links_status
FROM posts 
ORDER BY created_at DESC;

-- 2. Update posts with NULL links to have empty JSONB array
UPDATE posts 
SET links = '[]'::jsonb 
WHERE links IS NULL;

-- 3. Update posts with empty links array to have some sample content
-- This will help test the YouTube functionality

-- Update the first post to have a YouTube video
UPDATE posts 
SET links = '[{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "title": "Sample YouTube Video"}]'::jsonb
WHERE id = (SELECT id FROM posts ORDER BY created_at DESC LIMIT 1)
AND (links IS NULL OR jsonb_array_length(links) = 0);

-- Update the second post to have regular links
UPDATE posts 
SET links = '[{"url": "https://example.com/article", "title": "Read Full Article"}]'::jsonb
WHERE id = (SELECT id FROM posts ORDER BY created_at DESC LIMIT 1 OFFSET 1)
AND (links IS NULL OR jsonb_array_length(links) = 0);

-- Update the third post to have multiple links including YouTube
UPDATE posts 
SET links = '[
    {"url": "https://www.youtube.com/watch?v=jNQXAC9IVRw", "title": "Watch Video"},
    {"url": "https://example.com/more-info", "title": "Learn More"}
]'::jsonb
WHERE id = (SELECT id FROM posts ORDER BY created_at DESC LIMIT 1 OFFSET 2)
AND (links IS NULL OR jsonb_array_length(links) = 0);

-- 4. Verify the updates
SELECT 
    id,
    title,
    category,
    links,
    jsonb_array_length(links) as links_count,
    CASE 
        WHEN links @> '[{"url": "https://www.youtube.com"}]'::jsonb 
        THEN 'Has YouTube Video'
        WHEN jsonb_array_length(links) > 0 
        THEN 'Has Regular Links'
        ELSE 'No Links'
    END as link_status
FROM posts 
ORDER BY created_at DESC;

-- 5. If you want to add YouTube links to specific posts by title
-- Uncomment and modify the following lines:

-- UPDATE posts 
-- SET links = '[{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "title": "YouTube Tutorial"}]'::jsonb
-- WHERE title = 'Latest Can News Update';

-- UPDATE posts 
-- SET links = '[{"url": "https://www.youtube.com/watch?v=jNQXAC9IVRw", "title": "Exclusive Interview"}]'::jsonb
-- WHERE title = 'Exclusive Interview with Can Creator';

-- 6. Final verification
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
WHERE links IS NULL OR jsonb_array_length(links) = 0;
