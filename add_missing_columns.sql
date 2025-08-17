-- Add Missing Columns to Profiles Table
-- Run this in your Supabase SQL Editor to add the missing columns

-- 1. Add the missing permissions column
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{
    "managePosts": false,
    "manageAdvertisements": false,
    "manageUsers": false,
    "systemSettings": false
}'::jsonb;

-- 2. Add the missing updated_at column
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. Update existing profiles to have default permissions
UPDATE public.profiles 
SET permissions = '{
    "managePosts": false,
    "manageAdvertisements": false,
    "manageUsers": false,
    "systemSettings": false
}'::jsonb
WHERE permissions IS NULL;

-- 4. Update existing profiles to have updated_at timestamp
UPDATE public.profiles 
SET updated_at = created_at
WHERE updated_at IS NULL;

-- 5. Verify the new structure
SELECT 
    'Updated Table Structure' as info_type,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
ORDER BY ordinal_position;

-- 6. Test inserting a profile with editor role and permissions
DO $$
DECLARE
    test_id UUID := '00000000-0000-0000-0000-000000000000';
BEGIN
    -- Try to insert a test profile with editor role and permissions
    INSERT INTO public.profiles (id, email, role, permissions) 
    VALUES (
        test_id,
        'test-editor@example.com',
        'editor',
        '{
            "managePosts": true,
            "manageAdvertisements": false,
            "manageUsers": false,
            "systemSettings": false
        }'::jsonb
    );
    
    RAISE NOTICE '✅ Successfully inserted editor role profile with permissions';
    
    -- Clean up the test data
    DELETE FROM public.profiles WHERE id = test_id;
    RAISE NOTICE '✅ Test data cleaned up';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE '❌ Failed to insert editor role: %', SQLERRM;
END $$;

-- 7. Create the posts table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Enable RLS on posts table
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- 9. Create basic policy for posts
DROP POLICY IF EXISTS "Allow authenticated users to manage posts" ON public.posts;
CREATE POLICY "Allow authenticated users to manage posts" ON public.posts
    FOR ALL USING (auth.uid() IS NOT NULL);

-- 10. Grant permissions
GRANT ALL ON public.posts TO authenticated;

-- 11. Final verification
SELECT 
    'FINAL VERIFICATION' as status,
    'Missing columns have been added!' as message,
    'Profiles table now has all required columns for sub-admin system' as details,
    'Try creating a sub-admin with Editor role again' as next_step;
