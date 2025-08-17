-- Check current table structure
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'links';

-- If links column doesn't exist or is wrong type, fix it
-- First, let's see what the current structure looks like
\d posts;

-- If links column doesn't exist, add it
ALTER TABLE posts ADD COLUMN IF NOT EXISTS links JSONB DEFAULT '[]'::jsonb;

-- If links column exists but is wrong type, change it
-- (This will only run if the column exists and is not JSONB)
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'posts' 
        AND column_name = 'links' 
        AND data_type != 'jsonb'
    ) THEN
        ALTER TABLE posts ALTER COLUMN links TYPE JSONB USING links::jsonb;
    END IF;
END $$;

-- Set default value for existing rows
UPDATE posts SET links = '[]'::jsonb WHERE links IS NULL;

-- Add comment to the column
COMMENT ON COLUMN posts.links IS 'Array of link objects with url and title properties';

-- Verify the structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'links';
