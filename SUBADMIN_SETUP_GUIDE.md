# Sub-Admin Setup Guide - Fixing Database Errors

This guide will help you resolve the "Failed to create sub-admin: Database error saving new user" error that's occurring in your admin dashboard.

## The Problem

The error is occurring because:
1. **Missing database tables**: The `posts` table referenced in permissions doesn't exist
2. **Incomplete database policies**: Some RLS policies reference non-existent tables
3. **Timing issues**: Profile updates happen before the database trigger completes

## Solution Steps

### Step 1: Run the Complete Database Setup

1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Copy and paste the entire contents of `complete_database_setup.sql`
4. Run the script

This will create:
- ✅ Complete `profiles` table with permissions
- ✅ Missing `posts` table
- ✅ All necessary RLS policies
- ✅ Permission checking functions
- ✅ Proper triggers and timestamps

### Step 2: Verify Your Environment Variables

Make sure your `.env` file contains:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 3: Test the Setup

1. Restart your development server
2. Navigate to your admin dashboard
3. Try creating a new sub-admin
4. Check the browser console for any remaining errors

## What the Complete Setup Fixes

### Database Structure
- **Profiles table**: Now includes all required columns and proper constraints
- **Posts table**: Created with proper structure and relationships
- **Advertisements table**: Enhanced with proper policies
- **Indexes**: Added for better performance

### Security & Permissions
- **Row Level Security**: Properly configured for all tables
- **Permission system**: Complete JSONB-based permission checking
- **Role-based access**: Admin, moderator, editor, and user roles
- **Function-based policies**: Secure permission checking

### Triggers & Automation
- **User creation**: Automatic profile creation when users sign up
- **Timestamp updates**: Automatic `updated_at` field management
- **Error handling**: Better error messages and retry logic

## Troubleshooting

### If you still get errors:

1. **Check Supabase logs**:
   - Go to Supabase Dashboard > Logs
   - Look for authentication or database errors

2. **Verify table creation**:
   ```sql
   -- Run this in SQL Editor to check if tables exist
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('profiles', 'posts', 'advertisements');
   ```

3. **Check RLS policies**:
   ```sql
   -- Verify policies are in place
   SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
   FROM pg_policies 
   WHERE schemaname = 'public';
   ```

4. **Test permissions function**:
   ```sql
   -- Test if the permission function works
   SELECT check_permission(auth.uid(), 'managePosts');
   ```

### Common Issues & Solutions

#### Issue: "Table doesn't exist"
**Solution**: Run the complete database setup script

#### Issue: "Permission denied"
**Solution**: Check if your user has admin role in the profiles table

#### Issue: "Function doesn't exist"
**Solution**: Ensure all functions were created by the setup script

#### Issue: "RLS policy violation"
**Solution**: Verify RLS policies are properly configured

## Testing the Fix

After running the setup:

1. **Create a test sub-admin**:
   - Use a test email (e.g., `test@example.com`)
   - Set role to "Editor"
   - Enable basic permissions

2. **Verify in database**:
   ```sql
   -- Check if the user was created
   SELECT * FROM auth.users WHERE email = 'test@example.com';
   
   -- Check if profile was created
   SELECT * FROM public.profiles WHERE email = 'test@example.com';
   ```

3. **Test permissions**:
   - Try accessing different admin features
   - Verify role-based restrictions work

## Next Steps

Once the sub-admin creation is working:

1. **Set up your first admin user**:
   ```sql
   -- Replace with your actual user ID
   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE email = 'your-admin-email@example.com';
   ```

2. **Configure additional roles**:
   - Create moderator roles for content management
   - Set up editor roles for basic content editing
   - Configure custom permission sets

3. **Test the complete workflow**:
   - Create sub-admins with different roles
   - Test permission-based access control
   - Verify user management features

## Support

If you continue to experience issues:

1. Check the browser console for detailed error messages
2. Verify all SQL scripts ran successfully
3. Ensure your Supabase project has the correct settings
4. Check that your environment variables are properly configured

## Files Modified

- ✅ `complete_database_setup.sql` - Complete database setup
- ✅ `SubAdminManager.jsx` - Improved error handling and timing
- ✅ `SUBADMIN_SETUP_GUIDE.md` - This troubleshooting guide

The complete setup should resolve your database error and allow you to successfully create sub-admins in your admin dashboard.
