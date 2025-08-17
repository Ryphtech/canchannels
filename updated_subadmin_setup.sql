-- Updated Sub-Admin Setup for Supabase
-- Run this script in your Supabase SQL editor

-- First, ensure the profiles table has the permissions column
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

-- Update the trigger function to handle user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role TEXT;
    user_permissions JSONB;
BEGIN
    -- Extract role and permissions from user metadata if available
    IF NEW.raw_user_meta_data IS NOT NULL THEN
        user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'user');
        user_permissions := COALESCE(NEW.raw_user_meta_data->'permissions', '{
          "managePosts": true,
          "manageAdvertisements": true,
          "manageUsers": false,
          "systemSettings": false
        }'::jsonb);
    ELSE
        user_role := 'user';
        user_permissions := '{
          "managePosts": true,
          "manageAdvertisements": true,
          "manageUsers": false,
          "systemSettings": false
        }'::jsonb;
    END IF;

    -- Insert into profiles table
    INSERT INTO public.profiles (id, email, role, permissions)
    VALUES (NEW.id, NEW.email, user_role, user_permissions);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

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
COMMENT ON FUNCTION public.handle_new_user() IS 'Function to handle new user signup and create profile with role/permissions';
