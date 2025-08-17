-- Verification Script for CanChannels Database Setup
-- Run this in your Supabase SQL Editor to verify everything is working

-- 1. Check if all required tables exist
SELECT 
    'Tables Check' as check_type,
    table_name,
    CASE 
        WHEN table_name IS NOT NULL THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
FROM (
    SELECT unnest(ARRAY['profiles', 'posts', 'advertisements']) as table_name
) t
WHERE EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = t.table_name
);

-- 2. Check table structures
SELECT 
    'Table Structure' as check_type,
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'posts', 'advertisements')
ORDER BY table_name, ordinal_position;

-- 3. Check if RLS is enabled
SELECT 
    'RLS Status' as check_type,
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'posts', 'advertisements');

-- 4. Check RLS policies
SELECT 
    'RLS Policies' as check_type,
    schemaname,
    tablename,
    policyname,
    permissive,
    cmd,
    CASE 
        WHEN qual IS NOT NULL THEN '✅ CONFIGURED'
        ELSE '❌ MISSING'
    END as status
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'posts', 'advertisements')
ORDER BY tablename, policyname;

-- 5. Check if functions exist
SELECT 
    'Functions Check' as check_type,
    routine_name,
    CASE 
        WHEN routine_name IS NOT NULL THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
FROM (
    SELECT unnest(ARRAY['handle_new_user', 'handle_updated_at', 'check_permission']) as routine_name
) f
WHERE EXISTS (
    SELECT 1 FROM information_schema.routines 
    WHERE routine_schema = 'public' 
    AND routine_name = f.routine_name
);

-- 6. Check if triggers exist
SELECT 
    'Triggers Check' as check_type,
    trigger_name,
    event_object_table,
    CASE 
        WHEN trigger_name IS NOT NULL THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
FROM information_schema.triggers 
WHERE trigger_schema = 'public' 
AND event_object_table IN ('profiles', 'posts', 'advertisements')
ORDER BY event_object_table, trigger_name;

-- 7. Check indexes
SELECT 
    'Indexes Check' as check_type,
    indexname,
    tablename,
    CASE 
        WHEN indexname IS NOT NULL THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END as status
FROM pg_indexes 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'posts', 'advertisements')
ORDER BY tablename, indexname;

-- 8. Test permission function (if you're authenticated)
-- Note: This will only work if you're logged in
SELECT 
    'Permission Test' as check_type,
    CASE 
        WHEN auth.uid() IS NOT NULL THEN '✅ AUTHENTICATED'
        ELSE '❌ NOT AUTHENTICATED'
    END as auth_status,
    CASE 
        WHEN auth.uid() IS NOT NULL THEN 
            CASE 
                WHEN check_permission(auth.uid(), 'managePosts') THEN '✅ CAN MANAGE POSTS'
                ELSE '❌ CANNOT MANAGE POSTS'
            END
        ELSE 'N/A'
    END as permission_test;

-- 9. Check sample data
SELECT 
    'Sample Data' as check_type,
    'advertisements' as table_name,
    COUNT(*) as record_count
FROM advertisements
UNION ALL
SELECT 
    'Sample Data' as check_type,
    'profiles' as table_name,
    COUNT(*) as record_count
FROM profiles;

-- 10. Summary
SELECT 
    'SETUP SUMMARY' as check_type,
    'If you see ✅ for all checks above, your setup is complete!' as message,
    'If you see ❌, run the complete_database_setup.sql script again' as action;
