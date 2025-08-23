-- Add content splitting columns to posts table
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS content_top TEXT,
ADD COLUMN IF NOT EXISTS content_down TEXT,
ADD COLUMN IF NOT EXISTS content_images JSONB DEFAULT '[]'::jsonb;

-- Add comment to explain the new structure
COMMENT ON COLUMN posts.content_top IS 'First part of the content that appears before images';
COMMENT ON COLUMN posts.content_down IS 'Second part of the content that appears after images';
COMMENT ON COLUMN posts.content_images IS 'Array of image URLs for the carousel between content_top and content_down';

-- Create index for content_images for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_content_images ON posts USING GIN (content_images);

-- Update existing posts to migrate content to content_top if content_images is empty
UPDATE posts 
SET content_top = content 
WHERE content IS NOT NULL 
AND (content_images IS NULL OR content_images = '[]'::jsonb);

-- Add constraint to ensure at least one content field is filled
ALTER TABLE posts 
ADD CONSTRAINT check_content_fields 
CHECK (
  (content_top IS NOT NULL AND content_top != '') OR 
  (content IS NOT NULL AND content != '') OR 
  (subtitle IS NOT NULL AND subtitle != '')
);
