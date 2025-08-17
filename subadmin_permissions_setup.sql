-- Sub-Admin Permissions Setup for Supabase
-- Run this script in your Supabase SQL editor to add permission support

-- Add permissions column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{
  "managePosts": true,
  "manageAdvertisements": true,
  "manageUsers": false,
  "systemSettings": false
}'::jsonb;

-- Update existing profiles to have default permissions
UPDATE public.profiles 
SET permissions = '{
  "managePosts": true,
  "manageAdvertisements": true,
  "manageUsers": false,
  "systemSettings": false
}'::jsonb
WHERE permissions IS NULL;

-- Create function to check permissions
CREATE OR REPLACE FUNCTION check_permission(user_id UUID, permission TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    user_role TEXT;
    user_permissions JSONB;
BEGIN
    -- Get user role and permissions
    SELECT role, permissions INTO user_role, user_permissions
    FROM public.profiles
    WHERE id = user_id;
    
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
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create RLS policies for permission-based access

-- Posts table policies
DROP POLICY IF EXISTS "Users can manage posts based on permissions" ON public.posts;
CREATE POLICY "Users can manage posts based on permissions" ON public.posts
    FOR ALL USING (
        check_permission(auth.uid(), 'managePosts')
    );

-- Advertisements table policies (if you have one)
-- DROP POLICY IF EXISTS "Users can manage ads based on permissions" ON public.advertisements;
-- CREATE POLICY "Users can manage ads based on permissions" ON public.advertisements
--     FOR ALL USING (
--         check_permission(auth.uid(), 'manageAdvertisements')
--     );

-- Profiles table policies for user management
DROP POLICY IF EXISTS "Users can manage profiles based on permissions" ON public.profiles;
CREATE POLICY "Users can manage profiles based on permissions" ON public.profiles
    FOR ALL USING (
        check_permission(auth.uid(), 'manageUsers') OR auth.uid() = id
    );

-- Grant necessary permissions
GRANT EXECUTE ON FUNCTION check_permission(UUID, TEXT) TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_role_permissions_idx ON public.profiles(role, permissions);

-- Comments
COMMENT ON COLUMN public.profiles.permissions IS 'JSON object containing user permissions';
COMMENT ON FUNCTION check_permission(UUID, TEXT) IS 'Function to check if a user has a specific permission';
