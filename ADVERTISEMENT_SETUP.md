# Advertisement Management System Setup

This guide will help you set up the advertisement management system in your admin dashboard.

## Overview

The advertisement management system allows you to:
- Add, edit, and delete advertisements
- Upload advertisement images
- Set advertisement positions across the user panel
- Activate/deactivate advertisements
- Manage advertisements through the admin dashboard

## Database Setup

### 1. Create the Advertisements Table

Run the SQL script in `database_setup.sql` in your Supabase SQL editor:

```sql
-- Copy and paste the contents of database_setup.sql
```

### 2. Set up Storage Bucket (Optional)

If you want to upload advertisement images directly through the admin panel:

1. Go to your Supabase dashboard
2. Navigate to Storage
3. Create a new bucket called `advertisement-images`
4. Set the bucket to public
5. Create a policy to allow public access to the bucket

## Features

### Admin Dashboard Integration

The advertisement management system is integrated into the admin dashboard with:

- **Tab Navigation**: Switch between Posts Management and Advertisement Management
- **Advertisement Manager**: Complete CRUD operations for advertisements
- **Image Upload**: Support for both URL and file uploads
- **Position Management**: Different advertisement positions across the site

### Advertisement Positions

The system supports the following advertisement positions:

- `homepage-top`: Top of the homepage
- `homepage-sidebar`: Sidebar on the homepage
- `hero-section`: Within the hero section
- `can-posts-sidebar`: Sidebar in the Can Posts section
- `content-page-sidebar`: Sidebar on content pages

### User Panel Integration

The user panel automatically displays advertisements based on:

- **Position**: Advertisements are shown in their designated positions
- **Active Status**: Only active advertisements are displayed
- **Fallback**: If no advertisements are available, fallback images are shown

## Usage

### Adding Advertisements

1. Go to the Admin Dashboard
2. Click on the "Advertisement Management" tab
3. Click "Add Advertisement"
4. Fill in the required fields:
   - Title
   - Description (optional)
   - Position
   - Link URL
   - Image (URL or file upload)
   - Active status
5. Click "Add Advertisement"

### Editing Advertisements

1. In the Advertisement Management tab, find the advertisement you want to edit
2. Click the "Edit" button
3. Modify the fields as needed
4. Click "Update Advertisement"

### Managing Advertisement Status

- **Activate**: Click the "Activate" button to make an advertisement visible
- **Deactivate**: Click the "Deactivate" button to hide an advertisement
- **Delete**: Click the "Delete" button to permanently remove an advertisement

### Filtering Advertisements

Use the filter options to:
- Filter by position
- Filter by status (active/inactive)
- Search through advertisements

## Technical Details

### Database Schema

```sql
advertisements (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT NOT NULL,
    position VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE
)
```

### API Endpoints

The system uses the following service functions:

- `fetchAdvertisements()`: Get all advertisements
- `fetchAdvertisementsByPosition(position)`: Get advertisements by position
- `addAdvertisement(data)`: Add new advertisement
- `updateAdvertisement(id, data)`: Update existing advertisement
- `deleteAdvertisement(id)`: Delete advertisement
- `toggleAdvertisementStatus(id, isActive)`: Toggle advertisement status

### Components

- `AdvertisementManager`: Main management component
- `AddAdvertisementModal`: Modal for adding advertisements
- `EditAdvertisementModal`: Modal for editing advertisements
- `AdBanner`: User-facing advertisement display component
- `useAdvertisements`: Custom hook for fetching advertisements

## Customization

### Adding New Positions

To add new advertisement positions:

1. Update the `positions` array in `AdvertisementManager.jsx`
2. Update the `useAdvertisements` hook calls in user components
3. Add the new position to the database schema if needed

### Styling

The advertisement components use DaisyUI classes and can be customized by:

- Modifying the CSS classes in the components
- Updating the Tailwind configuration
- Adding custom CSS styles

### Image Storage

The system supports:
- External image URLs
- File uploads to Supabase Storage
- Automatic image optimization and resizing (if configured)

## Troubleshooting

### Common Issues

1. **Advertisements not showing**: Check if advertisements are active and positioned correctly
2. **Image upload fails**: Verify Supabase Storage bucket configuration
3. **Database errors**: Ensure the advertisements table is created correctly

### Debugging

- Check browser console for JavaScript errors
- Verify Supabase connection and permissions
- Test database queries directly in Supabase SQL editor

## Security Considerations

- Row Level Security (RLS) is enabled on the advertisements table
- Storage bucket policies should be configured appropriately
- Consider implementing user authentication for admin access
- Validate image uploads and URLs

## Performance Optimization

- Advertisements are cached and loaded efficiently
- Images are optimized for web delivery
- Database queries are indexed for better performance
- Lazy loading is implemented for better user experience
