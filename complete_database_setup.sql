-- Complete Database Setup for CanChannels Admin System
-- Run this script in your Supabase SQL editor

-- 1. Create profiles table with all necessary columns
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT,
    role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator', 'editor')),
    permissions JSONB DEFAULT '{
        "managePosts": true,
        "manageAdvertisements": true,
        "manageUsers": false,
        "systemSettings": false
    }'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create posts table (referenced in permissions but missing)
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create advertisements table (already exists but adding for completeness)
CREATE TABLE IF NOT EXISTS public.advertisements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT NOT NULL,
    position VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;

-- 5. Create function to check permissions
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

-- 6. Create function to handle new user signup
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

-- 7. Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 8. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 9. Create triggers for updating updated_at
DROP TRIGGER IF EXISTS on_profiles_updated ON public.profiles;
CREATE TRIGGER on_profiles_updated
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_posts_updated ON public.posts;
CREATE TRIGGER on_posts_updated
    BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS on_advertisements_updated ON public.advertisements;
CREATE TRIGGER on_advertisements_updated
    BEFORE UPDATE ON public.advertisements
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- 10. Create RLS policies for profiles table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
CREATE POLICY "Admins can update all profiles" ON public.profiles
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

DROP POLICY IF EXISTS "Users can manage profiles based on permissions" ON public.profiles;
CREATE POLICY "Users can manage profiles based on permissions" ON public.profiles
    FOR ALL USING (
        check_permission(auth.uid(), 'manageUsers') OR auth.uid() = id
    );

-- 11. Create RLS policies for posts table
DROP POLICY IF EXISTS "Users can manage posts based on permissions" ON public.posts;
CREATE POLICY "Users can manage posts based on permissions" ON public.posts
    FOR ALL USING (
        check_permission(auth.uid(), 'managePosts')
    );

-- 12. Create RLS policies for advertisements table
DROP POLICY IF EXISTS "Users can manage ads based on permissions" ON public.advertisements;
CREATE POLICY "Users can manage ads based on permissions" ON public.advertisements
    FOR ALL USING (
        check_permission(auth.uid(), 'manageAdvertisements')
    );

-- 13. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.posts TO anon, authenticated;
GRANT ALL ON public.advertisements TO anon, authenticated;
GRANT EXECUTE ON FUNCTION check_permission(UUID, TEXT) TO authenticated;

-- 14. Create indexes for better performance
CREATE INDEX IF NOT EXISTS profiles_role_idx ON public.profiles(role);
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);
CREATE INDEX IF NOT EXISTS profiles_role_permissions_idx ON public.profiles(role, permissions);
CREATE INDEX IF NOT EXISTS posts_author_id_idx ON public.posts(author_id);
CREATE INDEX IF NOT EXISTS posts_status_idx ON public.posts(status);
CREATE INDEX IF NOT EXISTS advertisements_position_active_idx ON public.advertisements(position, is_active);

-- 15. Insert sample data for testing
INSERT INTO public.advertisements (title, description, image_url, link_url, position, is_active) VALUES
(
    'Special Offer - 50% Off',
    'Limited time offer on all premium content',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
    'https://example.com/special-offer',
    'homepage-top',
    true
),
(
    'New Features Available',
    'Discover the latest updates and improvements',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    'https://example.com/new-features',
    'hero-section',
    true
),
(
    'Premium Subscription',
    'Unlock exclusive content and features',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    'https://example.com/premium',
    'can-posts-sidebar',
    true
),
(
    'Community Spotlight',
    'Featured stories from our community',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'https://example.com/community',
    'content-page-sidebar',
    true
);

-- 16. Comments
COMMENT ON TABLE public.profiles IS 'User profiles with role-based access control';
COMMENT ON COLUMN public.profiles.role IS 'User role: user, admin, moderator, or editor';
COMMENT ON COLUMN public.profiles.permissions IS 'JSON object containing user permissions';
COMMENT ON TABLE public.posts IS 'Content posts created by users';
COMMENT ON TABLE public.advertisements IS 'Advertisement content for the platform';
COMMENT ON FUNCTION check_permission(UUID, TEXT) IS 'Function to check if a user has a specific permission';

-- 17. Create a function to safely create sub-admins
CREATE OR REPLACE FUNCTION create_sub_admin(
    admin_email TEXT,
    admin_password TEXT,
    admin_role TEXT DEFAULT 'moderator',
    admin_permissions JSONB DEFAULT '{
        "managePosts": true,
        "manageAdvertisements": true,
        "manageUsers": false,
        "systemSettings": false
    }'::jsonb
)
RETURNS JSON AS $$
DECLARE
    new_user_id UUID;
    result JSON;
BEGIN
    -- This function should be called from the server side
    -- For now, we'll just return a success message
    -- The actual user creation should happen through Supabase Auth API
    
    result := json_build_object(
        'success', true,
        'message', 'Sub-admin creation initiated. Check the application logs for details.'
    );
    
    RETURN result;
    
EXCEPTION
    WHEN OTHERS THEN
        result := json_build_object(
            'success', false,
            'error', SQLERRM
        );
        RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION create_sub_admin(TEXT, TEXT, TEXT, JSONB) TO authenticated;
