-- Storage Policy Setup for post-images bucket
-- Run this in your Supabase SQL Editor

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

-- 5. Alternative: If you want to allow anonymous uploads (less secure but simpler for testing)
-- Uncomment the following lines if you want to allow anyone to upload:

-- CREATE POLICY "Allow anonymous uploads to post images" ON storage.objects
--     FOR INSERT WITH CHECK (bucket_id = 'post-images');

-- CREATE POLICY "Allow anonymous updates to post images" ON storage.objects
--     FOR UPDATE USING (bucket_id = 'post-images');

-- CREATE POLICY "Allow anonymous deletes from post images" ON storage.objects
--     FOR DELETE USING (bucket_id = 'post-images');
