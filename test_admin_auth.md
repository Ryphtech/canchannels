# Testing Admin Authentication

## Quick Test Steps

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Test Unprotected Access**
   - Navigate to `/admin` directly
   - Should redirect to `/admin/login`

3. **Test Login Page**
   - Navigate to `/admin/login`
   - Should show login form
   - Try invalid credentials (should show error)

4. **Test Valid Login**
   - Use admin credentials
   - Should redirect to `/admin` dashboard
   - Should show admin email in header
   - Should have sign-out button

5. **Test Protected Routes**
   - Try accessing `/admin` again
   - Should stay on dashboard (not redirect)

6. **Test Sign Out**
   - Click sign-out button
   - Should redirect to `/admin/login`
   - Try accessing `/admin` again (should redirect to login)

## Expected Behavior

### Before Authentication
- `/admin` → redirects to `/admin/login`
- `/admin/login` → shows login form
- Any admin route → redirects to login

### After Authentication
- `/admin` → shows dashboard
- `/admin/login` → redirects to `/admin` (if already authenticated)
- Header shows admin email and sign-out button

### After Sign Out
- All admin routes → redirect to `/admin/login`
- Session cleared
- No access to protected content

## Common Test Scenarios

1. **Invalid Credentials**
   - Wrong email/password
   - Non-admin user trying to access
   - Expired session

2. **Navigation Flow**
   - Login → Dashboard → Sign Out → Login
   - Direct access to protected routes
   - Browser refresh on protected routes

3. **Error Handling**
   - Network errors
   - Supabase connection issues
   - Invalid user roles

## Debug Information

Check browser console for:
- Authentication events
- Redirect actions
- Error messages
- Supabase connection status

Check Network tab for:
- Authentication requests
- Redirect responses
- API calls to Supabase
