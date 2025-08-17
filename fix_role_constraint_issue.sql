-- Fix for Role Constraint Issue in Profiles Table
-- Run this in your Supabase SQL Editor to resolve the role constraint problem

-- 1. First, let's check what the current constraint looks like
SELECT 
    'Current Constraint Check' as check_type,
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.profiles'::regclass 
AND contype = 'c';

-- 2. Check what roles are currently allowed
SELECT DISTINCT
    'Current Role Values' as check_type,
    role as allowed_roles
FROM public.profiles 
WHERE role IS NOT NULL;

-- 3. Drop the existing constraint if it exists
DO $$
BEGIN
    -- Drop the existing role constraint
    ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
    
    RAISE NOTICE 'Dropped existing role constraint';
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'No existing constraint to drop or error: %', SQLERRM;
END $$;

-- 4. Add the correct constraint that includes 'editor'
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_role_check 
CHECK (role IN ('user', 'admin', 'moderator', 'editor'));

-- 5. Verify the constraint was added correctly
SELECT 
    'New Constraint Check' as check_type,
    conname as constraint_name,
    pg_get_constraintdef(oid) as constraint_definition
FROM pg_constraint 
WHERE conrelid = 'public.profiles'::regclass 
AND contype = 'c';

-- 6. Test inserting a profile with editor role
DO $$
DECLARE
    test_id UUID := '00000000-0000-0000-0000-000000000000';
BEGIN
    -- Try to insert a test profile with editor role
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
    
    RAISE NOTICE '✅ Successfully inserted editor role profile';
    
    -- Clean up the test data
    DELETE FROM public.profiles WHERE id = test_id;
    RAISE NOTICE '✅ Test data cleaned up';
    
EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE '❌ Failed to insert editor role: %', SQLERRM;
END $$;

-- 7. Check if the posts table exists and create it if needed
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts' AND table_schema = 'public') THEN
        CREATE TABLE public.posts (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
            status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
        
        -- Create basic policy for posts
        CREATE POLICY "Allow authenticated users to manage posts" ON public.posts
            FOR ALL USING (auth.uid() IS NOT NULL);
        
        -- Grant permissions
        GRANT ALL ON public.posts TO authenticated;
        
        RAISE NOTICE '✅ Posts table created successfully';
    ELSE
        RAISE NOTICE 'Posts table already exists';
    END IF;
END $$;

-- 8. Update the handle_new_user function to handle editor role properly
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role, permissions)
    VALUES (
        NEW.id, 
        NEW.email, 
        'user',
        '{
            "managePosts": false,
            "manageAdvertisements": false,
            "manageUsers": false,
            "systemSettings": false
        }'::jsonb
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Test the complete setup
SELECT 
    'SETUP VERIFICATION' as status,
    'Role constraint issue should now be resolved!' as message,
    'Try creating a sub-admin with Editor role again' as next_step;

-- 10. Show current table structure
SELECT 
    'Table Structure' as info_type,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'profiles'
ORDER BY ordinal_position;
