# Admin Authentication Setup Guide

This guide will help you set up admin authentication for your CanChannels application using Supabase.

## Prerequisites

- Supabase project set up with authentication enabled
- Environment variables configured in your `.env` file:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

## Step 1: Database Setup

1. Open your Supabase dashboard
2. Go to the SQL Editor
3. Run the `admin_auth_setup.sql` script to create the necessary tables and policies

## Step 2: Create Admin User

1. In Supabase Dashboard, go to Authentication > Users
2. Click "Add User" or use the signup form on your site
3. Create a user with admin credentials (e.g., admin@example.com)
4. Copy the user's UUID from the users table

## Step 3: Grant Admin Role

1. Go to the SQL Editor in Supabase
2. Run the following command (replace with your actual user ID):

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = 'your-admin-user-uuid-here';
```

## Step 4: Test the System

1. Start your development server
2. Navigate to `/admin/login`
3. Sign in with your admin credentials
4. You should be redirected to `/admin` dashboard
5. Try accessing `/admin` directly - you should be redirected to login if not authenticated

## Features

### Authentication Context
- `AdminAuthContext` manages admin authentication state
- Automatically checks user roles on authentication
- Provides sign-in, sign-out, and authentication status

### Protected Routes
- `ProtectedRoute` component prevents unauthorized access
- Automatically redirects to login page
- Shows loading state while verifying authentication

### Admin Login Page
- Modern, responsive login form
- Error handling and validation
- Loading states and user feedback

### Admin Header
- Displays admin email
- Sign-out functionality
- Navigation back to main site

## Security Features

- Role-based access control (RBAC)
- Row Level Security (RLS) policies
- Automatic role verification on authentication
- Secure session management
- Protected admin routes

## File Structure

```
src/
├── contexts/
│   └── AdminAuthContext.jsx          # Admin authentication context
├── components/
│   └── Admin/
│       ├── ProtectedRoute/
│       │   └── ProtectedRoute.jsx    # Route protection component
│       └── AdminHeader/
│           └── AdminHeader.jsx        # Updated with auth features
├── pages/
│   └── Admin/
│       └── AdminLogin/
│           └── AdminLogin.jsx         # Admin login page
└── root/
    └── Adminroot/
        └── Adminroot.jsx              # Updated with auth provider
```

## Troubleshooting

### Common Issues

1. **"Access denied" error**: User doesn't have admin role in profiles table
2. **Authentication loop**: Check if profiles table and policies are set up correctly
3. **Role not updating**: Ensure the UPDATE query used the correct UUID

### Debug Steps

1. Check browser console for errors
2. Verify Supabase connection in Network tab
3. Check Supabase logs for authentication events
4. Verify user role in profiles table

## Environment Variables

Make sure your `.env` file contains:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Next Steps

After setting up admin authentication, you can:

1. Add more admin roles (moderator, editor)
2. Implement admin user management
3. Add audit logging for admin actions
4. Set up two-factor authentication
5. Add session timeout and auto-logout

## Support

If you encounter issues:

1. Check the Supabase documentation
2. Verify your database policies
3. Ensure all environment variables are set
4. Check browser console for detailed error messages
