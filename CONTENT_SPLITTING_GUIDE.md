# Content Splitting Feature Guide

## Overview

The content splitting feature allows admins to create posts with content divided into three sections:
1. **Content Top** - Text that appears before images
2. **Content Images** - Up to 4 images displayed as a carousel
3. **Content Down** - Text that appears after images

## Database Changes

The following columns have been added to the `posts` table:

```sql
ALTER TABLE posts 
ADD COLUMN content_top TEXT,
ADD COLUMN content_down TEXT,
ADD COLUMN content_images JSONB DEFAULT '[]'::jsonb;
```

## Admin Interface

### Add Post Modal
- **Content Top**: Text area for content that appears before images
- **Content Images**: Upload section for up to 4 images with preview
- **Content Down**: Text area for content that appears after images

### Edit Post Modal
- Same fields as Add Post Modal
- Existing content images are displayed as previews
- Can add/remove images while editing

## User Interface

### Content Display
- **Single Image**: Displays as a single image without carousel controls
- **Multiple Images**: Displays as a carousel with:
  - Navigation arrows
  - Image counter (e.g., "2 / 4")
  - Dot indicators
  - Thumbnail previews

### Carousel Features
- **Navigation**: Left/right arrows for manual navigation
- **Dots**: Click dots to jump to specific images
- **Thumbnails**: Click thumbnails to navigate (for multiple images)
- **Responsive**: Adapts to different screen sizes

## File Structure

### New Components
- `src/components/User/ContentImageCarousel/ContentImageCarousel.jsx` - Carousel component

### Updated Components
- `src/components/Admin/AddPostModal/AddPostModal.jsx` - Added content splitting fields
- `src/components/Admin/EditPostModal/EditPostModal.jsx` - Added content splitting fields
- `src/pages/User/ContentDisplayPage/Content.jsx` - Updated to display split content
- `src/backend/postsService.js` - Updated to handle new fields
- `src/pages/Admin/AdminDashboard/AdminDashboard.jsx` - Updated to handle content images

## Usage

### For Admins
1. Go to Admin Dashboard
2. Click "Add Post"
3. Fill in Content Top (optional)
4. Upload up to 4 content images (optional)
5. Fill in Content Down (optional)
6. Submit the post

### For Users
1. Navigate to a post with split content
2. Read Content Top (if present)
3. View images in carousel (if present)
4. Read Content Down (if present)

## Backward Compatibility

- Existing posts with only the `content` field will continue to work
- The system falls back to displaying the old `content` field if no split content is available
- Old posts can be edited to use the new split content structure

## Image Storage

- Content images are stored in the `post-images` Supabase storage bucket
- File naming convention: `{postId}_content_{index}.{extension}`
- Maximum file size: 5MB per image
- Supported formats: PNG, JPG, GIF

## Validation

- Maximum 4 content images per post
- Image file size limit: 5MB
- Image format validation
- URL validation for links

## Search Functionality

The search now includes:
- `content_top` field
- `content_down` field
- Existing `content` field (for backward compatibility)

## Migration

To migrate existing posts to the new structure:

1. Run the SQL script: `add_content_splitting_columns.sql`
2. Existing posts will have their `content` field copied to `content_top` if no content images exist
3. Admins can manually edit posts to add content images and split the content

## Troubleshooting

### Common Issues
1. **Images not uploading**: Check Supabase storage bucket configuration
2. **Carousel not working**: Ensure images array is properly formatted
3. **Content not displaying**: Check if content fields are populated

### Debug Information
- Check browser console for upload errors
- Verify database columns exist
- Ensure storage policies are configured correctly
