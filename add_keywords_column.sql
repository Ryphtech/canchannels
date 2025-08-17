-- Add keywords column to posts table
-- Run this script in your Supabase SQL editor to add the keywords field

-- Add the keywords column to the posts table
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS keywords TEXT;

-- Add a comment to describe the column
COMMENT ON COLUMN posts.keywords IS 'Comma-separated keywords for content discovery and suggestions';

-- Create an index on keywords for better search performance
CREATE INDEX IF NOT EXISTS idx_posts_keywords ON posts USING GIN (to_tsvector('english', keywords));

-- Update existing posts with some sample keywords (optional)
-- You can run this to add sample keywords to existing posts
UPDATE posts 
SET keywords = CASE 
    WHEN category = 'can-news' THEN 'news, politics, current events'
    WHEN category = 'can-exclusive' THEN 'exclusive, interview, behind the scenes'
    WHEN category = 'cinema' THEN 'cinema, movie, film, entertainment'
    WHEN category = 'general' THEN 'general, lifestyle, culture'
    ELSE 'general'
END
WHERE keywords IS NULL OR keywords = '';

-- Verify the column was added
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'keywords';
