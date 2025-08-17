# Fix for Editor Role Issue in Sub-Admin Creation

## The Problem

When you select "Editor" role when creating a new sub-admin, the system fails with a database error. This happens because:

1. **Permission conflicts**: The editor role tries to set `managePosts: true` but there might be database permission issues
2. **Missing posts table**: The `posts` table might not exist or have proper RLS policies
3. **Default permission conflicts**: The database default permissions might conflict with the form permissions

## Quick Fix

### Step 1: Run the Focused Fix Script

1. Open your Supabase dashboard
2. Go to SQL Editor
3. Copy and paste the entire contents of `fix_editor_role_issue.sql`
4. Run the script

This script will:
- ✅ Ensure the `posts` table exists with proper structure
- ✅ Fix default permissions to be more restrictive
- ✅ Improve the permission checking function
- ✅ Test the setup to verify it works

### Step 2: Test the Fix

1. Go back to your admin dashboard
2. Try creating a new sub-admin with "Editor" role
3. The system should now work without errors

## What the Fix Does

### Database Structure
- **Posts table**: Ensures it exists with proper RLS policies
- **Default permissions**: Changes from overly permissive to restrictive defaults
- **Permission function**: Makes it more robust with better error handling

### Role-Based Permissions
- **Editor**: Can manage posts only
- **Moderator**: Can manage posts and advertisements
- **Admin**: Can manage everything

### Automatic Permission Setting
The form now automatically sets appropriate permissions when you select a role:
- Select "Editor" → `managePosts: true`, others `false`
- Select "Moderator" → `managePosts: true`, `manageAdvertisements: true`, others `false`
- Select "Admin" → All permissions `true`

## If You Still Get Errors

### Check the Browser Console
Look for specific error messages that might indicate:
- Database connection issues
- Permission denied errors
- Missing table errors

### Verify Database Setup
Run this in Supabase SQL Editor to check if tables exist:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'posts', 'advertisements');
```

### Check RLS Policies
Verify that Row Level Security is properly configured:
```sql
SELECT schemaname, tablename, policyname, permissive, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';
```

## Alternative Solution

If the fix script doesn't work, you can manually create the posts table:

```sql
-- Create posts table manually
CREATE TABLE IF NOT EXISTS public.posts (
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

-- Create basic policy
CREATE POLICY "Allow authenticated users to manage posts" ON public.posts
    FOR ALL USING (auth.uid() IS NOT NULL);

-- Grant permissions
GRANT ALL ON public.posts TO authenticated;
```

## Testing the Fix

After applying the fix:

1. **Create a test editor**:
   - Email: `test-editor@example.com`
   - Role: Editor
   - Should automatically set `managePosts: true`

2. **Verify in database**:
   ```sql
   SELECT email, role, permissions FROM public.profiles 
   WHERE email = 'test-editor@example.com';
   ```

3. **Test permissions**:
   ```sql
   SELECT check_permission(id, 'managePosts') as can_manage_posts
   FROM public.profiles 
   WHERE email = 'test-editor@example.com';
   ```

## Summary

The editor role issue is caused by:
- Missing or improperly configured `posts` table
- Conflicting default permissions
- Weak permission checking function

The fix script resolves all these issues and should allow you to successfully create sub-admins with the Editor role.
