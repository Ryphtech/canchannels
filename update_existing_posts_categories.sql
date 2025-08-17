-- Update existing posts with proper categories
-- Run this script in your Supabase SQL editor to fix the category issue

-- First, let's see what posts currently exist
SELECT id, title, category FROM posts;

-- Update posts that don't have a category set
-- This will assign categories based on the post title or content
UPDATE posts 
SET category = CASE 
    WHEN title ILIKE '%news%' OR title ILIKE '%update%' THEN 'can-news'
    WHEN title ILIKE '%exclusive%' OR title ILIKE '%interview%' OR title ILIKE '%behind%' THEN 'can-exclusive'
    WHEN title ILIKE '%cinema%' OR title ILIKE '%movie%' OR title ILIKE '%film%' OR title ILIKE '%review%' THEN 'cinema'
    ELSE 'general'
END
WHERE category IS NULL OR category = '' OR category = 'General';

-- Alternative: Update specific posts by ID if you know which ones need updating
-- Replace the IDs with actual post IDs from your database
-- UPDATE posts SET category = 'can-news' WHERE id = 'your-post-id-here';
-- UPDATE posts SET category = 'can-exclusive' WHERE id = 'your-post-id-here';
-- UPDATE posts SET category = 'cinema' WHERE id = 'your-post-id-here';
-- UPDATE posts SET category = 'general' WHERE id = 'your-post-id-here';

-- Verify the updates
SELECT id, title, category FROM posts ORDER BY created_at DESC;
