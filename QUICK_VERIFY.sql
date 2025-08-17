-- QUICK VERIFICATION SCRIPT
-- Run this to check if YouTube functionality is working

-- 1. Check if posts table exists and has correct structure
SELECT 
    'Table Status' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts') 
        THEN '✅ Posts table exists' 
        ELSE '❌ Posts table missing' 
    END as result
UNION ALL
SELECT 
    'Links Column Type' as check_type,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'posts' AND column_name = 'links' AND data_type = 'jsonb'
        )
        THEN '✅ Links column is JSONB'
        ELSE '❌ Links column is not JSONB'
    END as result;

-- 2. Check if we have posts with YouTube videos
SELECT 
    'YouTube Videos Found' as check_type,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM posts 
            WHERE links @> '[{"url": "https://www.youtube.com"}]'::jsonb
        )
        THEN '✅ Posts with YouTube videos found'
        ELSE '❌ No posts with YouTube videos'
    END as result
UNION ALL
SELECT 
    'Total Posts' as check_type,
    COUNT(*)::text as result
FROM posts
UNION ALL
SELECT 
    'Posts with Links' as check_type,
    COUNT(*)::text as result
FROM posts 
WHERE jsonb_array_length(links) > 0;

-- 3. Show sample posts with their link status
SELECT 
    id,
    title,
    CASE 
        WHEN links @> '[{"url": "https://www.youtube.com"}]'::jsonb 
        THEN '🎥 YouTube Video'
        WHEN jsonb_array_length(links) > 0 
        THEN '🔗 Regular Links'
        ELSE '📝 No Links'
    END as link_type,
    jsonb_array_length(links) as links_count
FROM posts 
ORDER BY id
LIMIT 5;

-- 4. Test JSONB operations
SELECT 
    'JSONB Test' as test_name,
    CASE 
        WHEN jsonb_typeof(links) = 'array' 
        THEN '✅ Links is array'
        ELSE '❌ Links is not array'
    END as result
FROM posts 
WHERE id = 1
UNION ALL
SELECT 
    'YouTube Detection Test' as test_name,
    CASE 
        WHEN links @> '[{"url": "https://www.youtube.com"}]'::jsonb 
        THEN '✅ YouTube detection working'
        ELSE '❌ YouTube detection failed'
    END as result
FROM posts 
WHERE id = 1;
