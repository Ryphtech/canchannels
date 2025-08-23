-- QUICK CHECK: Current Database State
-- Run this first to see what's wrong

-- 1. Check if posts table exists
SELECT 
    'Table Status' as check_type,
    CASE 
        WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts') 
        THEN '✅ Posts table exists' 
        ELSE '❌ Posts table missing' 
    END as result;

-- 2. If table exists, check its structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'posts' 
ORDER BY ordinal_position;

-- 3. Check if links column exists and its type
SELECT 
    'Links Column Status' as check_type,
    CASE 
        WHEN EXISTS (
            SELECT 1 FROM information_schema.columns 
            WHERE table_name = 'posts' AND column_name = 'links'
        )
        THEN 
            CASE 
                WHEN EXISTS (
                    SELECT 1 FROM information_schema.columns 
                    WHERE table_name = 'posts' 
                    AND column_name = 'links' 
                    AND data_type = 'jsonb'
                )
                THEN '✅ Links column exists and is JSONB'
                ELSE '⚠️ Links column exists but is NOT JSONB'
            END
        ELSE '❌ Links column missing'
    END as result;

-- 4. If table exists, check current data
SELECT 
    'Current Posts Count' as check_type,
    COUNT(*)::text as result
FROM posts
UNION ALL
SELECT 
    'Posts with Links' as check_type,
    COUNT(*)::text as result
FROM posts 
WHERE links IS NOT NULL AND jsonb_array_length(links) > 0;
