# YouTube Video Functionality Troubleshooting Guide

## Issue: Links showing as empty set in Supabase database

### Root Cause Analysis

The issue is likely one of these:

1. **Missing Posts Table**: The posts table might not exist or have the wrong structure
2. **Incorrect Column Type**: The `links` column might not be JSONB type
3. **Database Permissions**: Row Level Security (RLS) might be blocking access
4. **Data Insertion Issues**: Posts might be inserted without proper links data

### Step-by-Step Solution

#### Step 1: Verify Database Structure

Run this in your Supabase SQL Editor:

```sql
-- Check if posts table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'posts';

-- Check posts table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;
```

**Expected Result:**
- `posts` table should exist
- `links` column should be `jsonb` type
- `links` column should have default value `'[]'::jsonb`

#### Step 2: Create/Fix Posts Table

If the table doesn't exist or has wrong structure, run:

```sql
-- Drop existing table if it has wrong structure
DROP TABLE IF EXISTS posts;

-- Create posts table with correct structure
CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT,
    image TEXT,
    links JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    category TEXT,
    keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_featured ON posts(featured);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on posts" ON posts
    FOR ALL USING (true);
```

#### Step 3: Insert Test Data

```sql
-- Insert a test post with YouTube video
INSERT INTO posts (title, subtitle, content, image, links, featured, category) VALUES
(
    'Test YouTube Video',
    'Testing video functionality',
    'This is a test post to verify YouTube video display.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    '[{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "title": "Test Video"}]'::jsonb,
    true,
    'can-exclusive'
);
```

#### Step 4: Verify Data Insertion

```sql
-- Check if the post was inserted correctly
SELECT 
    id,
    title,
    links,
    jsonb_typeof(links) as links_type,
    jsonb_array_length(links) as links_count
FROM posts 
WHERE title = 'Test YouTube Video';
```

**Expected Result:**
- `links_type` should be `array`
- `links_count` should be `1`
- `links` should show the JSONB data

#### Step 5: Test Frontend

1. **Check Browser Console**: Look for debug logs
2. **Check Network Tab**: Verify API calls to Supabase
3. **Check Database**: Verify data exists in Supabase dashboard

### Common Issues and Solutions

#### Issue 1: "Table doesn't exist"
**Solution**: Run the table creation script from Step 2

#### Issue 2: "Column links doesn't exist"
**Solution**: Add the column:
```sql
ALTER TABLE posts ADD COLUMN links JSONB DEFAULT '[]'::jsonb;
```

#### Issue 3: "Permission denied"
**Solution**: Check RLS policies:
```sql
-- Disable RLS temporarily for testing
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

-- Or create proper policy
CREATE POLICY "Allow all operations on posts" ON posts
    FOR ALL USING (true);
```

#### Issue 4: "Invalid JSONB format"
**Solution**: Ensure proper JSONB syntax:
```sql
-- Correct format
'[{"url": "https://youtube.com/watch?v=123", "title": "Video"}]'::jsonb

-- Wrong format (will cause error)
'[{"url": "https://youtube.com/watch?v=123", "title": "Video"}]'
```

### Testing Checklist

- [ ] Posts table exists with correct structure
- [ ] `links` column is JSONB type
- [ ] RLS policies allow access
- [ ] Test post with YouTube link exists
- [ ] Frontend can fetch posts data
- [ ] YouTube detection logic works
- [ ] Video embed displays correctly

### Debug Commands

```sql
-- Check all posts and their link status
SELECT 
    id,
    title,
    links,
    CASE 
        WHEN links IS NULL THEN 'NULL'
        WHEN jsonb_array_length(links) = 0 THEN 'Empty'
        ELSE 'Has Links'
    END as status
FROM posts;

-- Check for YouTube links specifically
SELECT 
    id,
    title,
    links
FROM posts 
WHERE links @> '[{"url": "https://www.youtube.com"}]'::jsonb;

-- Count posts by link status
SELECT 
    CASE 
        WHEN links IS NULL THEN 'NULL'
        WHEN jsonb_array_length(links) = 0 THEN 'Empty'
        WHEN links @> '[{"url": "https://www.youtube.com"}]'::jsonb THEN 'YouTube'
        ELSE 'Other Links'
    END as link_type,
    COUNT(*) as count
FROM posts 
GROUP BY link_type;
```

### Still Having Issues?

1. **Check Supabase Logs**: Go to your Supabase dashboard → Logs
2. **Verify Environment Variables**: Check your `.env` file
3. **Test Database Connection**: Try a simple SELECT query
4. **Check Browser Console**: Look for JavaScript errors
5. **Verify API Keys**: Ensure your Supabase keys are correct

### Final Verification

After fixing the database, run this complete test:

```sql
-- Run the complete test script
\i test_database.sql
```

This will verify everything is working correctly.
