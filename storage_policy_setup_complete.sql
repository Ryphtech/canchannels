-- Complete Storage Policy Setup for CanChannels
-- Run this in your Supabase SQL Editor to set up proper storage policies

-- =====================================================
-- POST-IMAGES BUCKET POLICIES
-- =====================================================

-- 1. Create a policy to allow public access to read files from post-images bucket
CREATE POLICY "Public access to post images" ON storage.objects
    FOR SELECT USING (bucket_id = 'post-images');

-- 2. Create a policy to allow authenticated users to upload files to post-images bucket
CREATE POLICY "Allow authenticated uploads to post images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'post-images' 
        AND auth.role() = 'authenticated'
    );

-- 3. Create a policy to allow authenticated users to update files in post-images bucket
CREATE POLICY "Allow authenticated updates to post images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'post-images' 
        AND auth.role() = 'authenticated'
    );

-- 4. Create a policy to allow authenticated users to delete files from post-images bucket
CREATE POLICY "Allow authenticated deletes from post images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'post-images' 
        AND auth.role() = 'authenticated'
    );

-- =====================================================
-- ADVERTISEMENT-IMAGES BUCKET POLICIES
-- =====================================================

-- 5. Create a policy to allow public access to read files from advertisement-images bucket
CREATE POLICY "Public access to advertisement images" ON storage.objects
    FOR SELECT USING (bucket_id = 'advertisement-images');

-- 6. Create a policy to allow authenticated users to upload files to advertisement-images bucket
CREATE POLICY "Allow authenticated uploads to advertisement images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'advertisement-images' 
        AND auth.role() = 'authenticated'
    );

-- 7. Create a policy to allow authenticated users to update files in advertisement-images bucket
CREATE POLICY "Allow authenticated updates to advertisement images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'advertisement-images' 
        AND auth.role() = 'authenticated'
    );

-- 8. Create a policy to allow authenticated users to delete files from advertisement-images bucket
CREATE POLICY "Allow authenticated deletes from advertisement images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'advertisement-images' 
        AND auth.role() = 'authenticated'
    );

-- =====================================================
-- ALTERNATIVE: ANONYMOUS ACCESS (LESS SECURE)
-- Uncomment these lines if you want to allow anyone to upload/delete
-- =====================================================

-- For post-images:
-- CREATE POLICY "Allow anonymous access to post images" ON storage.objects
--     FOR ALL USING (bucket_id = 'post-images');

-- For advertisement-images:
-- CREATE POLICY "Allow anonymous access to advertisement images" ON storage.objects
--     FOR ALL USING (bucket_id = 'advertisement-images');

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check existing policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage'
ORDER BY policyname;

-- Check storage buckets
SELECT 
    id,
    name,
    public,
    file_size_limit,
    allowed_mime_types
FROM storage.buckets
WHERE name IN ('post-images', 'advertisement-images');
