# Notification System Setup Guide

This guide explains how to set up and use the notification system for your Can Channels application.

## Overview

The notification system allows admins to send notifications to users with:
- Title
- Message (optional)
- YouTube link (optional)
- Timestamp
- Active/Inactive status

Users can view these notifications through the notification bell on their homescreen.

## Database Setup

### 1. Run the SQL Setup Script

Execute the `notifications_setup.sql` file in your Supabase SQL editor:

```sql
-- This will create the notifications table with proper policies
-- Run the entire file in your Supabase SQL editor
```

### 2. Verify Table Creation

Check that the `notifications` table was created with the following structure:
- `id` (UUID, Primary Key)
- `title` (TEXT, Required)
- `message` (TEXT, Optional)
- `youtube_link` (TEXT, Optional)
- `is_active` (BOOLEAN, Default: true)
- `created_at` (TIMESTAMP WITH TIME ZONE)
- `updated_at` (TIMESTAMP WITH TIME ZONE)

## Features

### Admin Features

1. **Create Notifications**
   - Navigate to Admin Dashboard → Notifications tab
   - Click "Add Notification"
   - Fill in title, message (optional), and YouTube link (optional)
   - Click "Add Notification"

2. **Manage Notifications**
   - View all notifications (active and inactive)
   - Edit existing notifications
   - Toggle notification status (active/inactive)
   - Delete notifications

3. **Access Control**
   - Only users with admin role can manage notifications
   - Row Level Security (RLS) policies are enforced

### User Features

1. **View Notifications**
   - Notification bell appears on the bottom-right corner of the screen
   - Click to view all active notifications
   - Shows notification title, message, YouTube link, and time

2. **Real-time Updates**
   - Notifications are fetched from the database
   - Time is displayed in relative format (e.g., "2 minutes ago")

## Components

### 1. NotificationManager (Admin)
- **Location**: `src/components/Admin/NotificationManager/NotificationManager.jsx`
- **Purpose**: Admin interface for managing notifications
- **Features**: Create, edit, delete, toggle status

### 2. NotificationBell (User)
- **Location**: `src/components/Global/NotificationBanner/NotificationBell.jsx`
- **Purpose**: User interface for viewing notifications
- **Features**: Display notifications, YouTube links, time formatting

### 3. NotificationsService (Backend)
- **Location**: `src/backend/notificationsService.js`
- **Purpose**: Database operations for notifications
- **Features**: CRUD operations, Supabase integration

### 4. useNotifications Hook
- **Location**: `src/hooks/useNotifications.js`
- **Purpose**: React hook for notification state management
- **Features**: State management, API calls, time formatting

## Integration Points

### Admin Dashboard
- Added "Notifications" tab to the admin dashboard
- Integrated with existing tab system
- Accessible to all admin users

### User Interface
- Notification bell appears on all user pages
- Integrated with existing layout
- Responsive design for mobile and desktop

## Security Features

1. **Row Level Security (RLS)**
   - All users can read active notifications
   - Only admins can create, update, and delete notifications

2. **Role-based Access Control**
   - Admin role required for management operations
   - User role can only view notifications

3. **Input Validation**
   - Required fields validation
   - URL format validation for YouTube links

## Usage Examples

### Creating a Notification

1. Go to Admin Dashboard
2. Click "Notifications" tab
3. Click "Add Notification"
4. Fill in the form:
   - Title: "പുതിയ വാർത്ത" (New News)
   - Message: "കേരളത്തിലെ പുതിയ രാഷ്ട്രീയ വികാസങ്ങൾ" (New political developments in Kerala)
   - YouTube Link: "https://www.youtube.com/watch?v=example"
5. Click "Add Notification"

### Managing Notifications

1. View all notifications in the list
2. Use action buttons:
   - 👁️/👁️‍🗨️: Toggle active status
   - ✏️: Edit notification
   - 🗑️: Delete notification

## Troubleshooting

### Common Issues

1. **Notifications not appearing**
   - Check if the notifications table exists
   - Verify RLS policies are active
   - Check browser console for errors

2. **Admin cannot create notifications**
   - Verify user has admin role
   - Check RLS policies
   - Ensure proper authentication

3. **YouTube links not working**
   - Verify URL format is correct
   - Check if link opens in new tab
   - Ensure proper URL encoding

### Debug Steps

1. Check Supabase logs for database errors
2. Verify environment variables are set
3. Check browser console for JavaScript errors
4. Test database connection in Supabase dashboard

## Future Enhancements

1. **Push Notifications**
   - Browser push notifications
   - Email notifications
   - SMS notifications

2. **Advanced Features**
   - Notification categories
   - Scheduled notifications
   - User notification preferences

3. **Analytics**
   - Notification read rates
   - User engagement metrics
   - Performance analytics

## Support

For issues or questions about the notification system:
1. Check the troubleshooting section above
2. Review Supabase logs
3. Check browser console for errors
4. Verify database policies and permissions
