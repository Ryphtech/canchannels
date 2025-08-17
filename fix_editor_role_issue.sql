-- Fix for Editor Role Issue in Sub-Admin Creation
-- Run this in your Supabase SQL Editor to resolve the editor role problem

-- 1. First, let's check if the posts table exists and has proper structure
DO $$
BEGIN
    -- Create posts table if it doesn't exist
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
        
        -- Create indexes
        CREATE INDEX IF NOT EXISTS posts_author_id_idx ON public.posts(author_id);
        CREATE INDEX IF NOT EXISTS posts_status_idx ON public.posts(status);
        
        RAISE NOTICE 'Posts table created successfully';
    ELSE
        RAISE NOTICE 'Posts table already exists';
    END IF;
END $$;

-- 2. Fix the profiles table default permissions to be more restrictive
ALTER TABLE public.profiles 
ALTER COLUMN permissions SET DEFAULT '{
    "managePosts": false,
    "manageAdvertisements": false,
    "manageUsers": false,
    "systemSettings": false
}'::jsonb;

-- 3. Update existing profiles to have safer default permissions
UPDATE public.profiles 
SET permissions = '{
    "managePosts": false,
    "manageAdvertisements": false,
    "manageUsers": false,
    "systemSettings": false
}'::jsonb
WHERE permissions IS NULL OR permissions = '{}'::jsonb;

-- 4. Drop and recreate the posts RLS policy with better error handling
DROP POLICY IF EXISTS "Users can manage posts based on permissions" ON public.posts;

CREATE POLICY "Users can manage posts based on permissions" ON public.posts
    FOR ALL USING (
        CASE 
            WHEN auth.uid() IS NULL THEN FALSE
            ELSE check_permission(auth.uid(), 'managePosts')
        END
    );

-- 5. Create a more robust permission checking function
CREATE OR REPLACE FUNCTION check_permission(user_id UUID, permission TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
    user_permissions JSONB;
BEGIN
    -- Handle null user_id
    IF user_id IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Get user role and permissions
    SELECT role, permissions INTO user_role, user_permissions
    FROM public.profiles
    WHERE id = user_id;
    
    -- If no profile found, return false
    IF user_role IS NULL THEN
        RETURN FALSE;
    END IF;
    
    -- Admin has all permissions
    IF user_role = 'admin' THEN
        RETURN TRUE;
    END IF;
    
    -- Check specific permission
    IF user_permissions IS NOT NULL AND user_permissions ? permission THEN
        RETURN (user_permissions->>permission)::BOOLEAN;
    END IF;
    
    -- Default to false if permission not found
    RETURN FALSE;
    
EXCEPTION
    WHEN OTHERS THEN
        -- Log the error and return false
        RAISE WARNING 'Error checking permission % for user %: %', permission, user_id, SQLERRM;
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.posts TO anon, authenticated;
GRANT ALL ON public.advertisements TO anon, authenticated;
GRANT EXECUTE ON FUNCTION check_permission(UUID, TEXT) TO authenticated;

-- 7. Test the permission function
SELECT 
    'Permission Function Test' as test_type,
    CASE 
        WHEN check_permission('00000000-0000-0000-0000-000000000000', 'managePosts') = FALSE THEN '✅ Working correctly'
        ELSE '❌ Not working correctly'
    END as result;

-- 8. Create a test profile to verify the setup
INSERT INTO public.profiles (id, email, role, permissions) 
VALUES (
    '00000000-0000-0000-0000-000000000000',
    'test@example.com',
    'editor',
    '{
        "managePosts": true,
        "manageAdvertisements": false,
        "manageUsers": false,
        "systemSettings": false
    }'::jsonb
) ON CONFLICT (id) DO UPDATE SET
    role = EXCLUDED.role,
    permissions = EXCLUDED.permissions;

-- 9. Test the test profile permissions
SELECT 
    'Test Profile Permissions' as test_type,
    role,
    permissions,
    CASE 
        WHEN check_permission(id, 'managePosts') THEN '✅ Can manage posts'
        ELSE '❌ Cannot manage posts'
    END as posts_permission
FROM public.profiles 
WHERE id = '00000000-0000-0000-0000-000000000000';

-- 10. Clean up test data
DELETE FROM public.profiles WHERE id = '00000000-0000-0000-0000-000000000000';

-- 11. Summary
SELECT 
    'FIX SUMMARY' as status,
    'Editor role issue should now be resolved!' as message,
    'Try creating a sub-admin with Editor role again' as next_step;
