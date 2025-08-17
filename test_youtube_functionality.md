# YouTube Video Functionality Test Guide

## What's Been Implemented

Your CanChannels application now has full YouTube video support! Here's what's been added:

### 1. Backend Updates
- ✅ All post fetching functions now include the `links` field
- ✅ Posts service properly handles JSONB links data
- ✅ YouTube URL parsing function supports multiple formats

### 2. Frontend Updates
- ✅ Content display page shows YouTube videos in the "Watch Now" sidebar
- ✅ YouTube URLs are automatically converted to embed URLs
- ✅ Videos are responsive and properly sized
- ✅ Fallback display when no video is available

### 3. Supported YouTube URL Formats
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

## How to Test

### Step 1: Add a Post with YouTube Video
1. Go to your Supabase SQL Editor
2. Run the updated `sample_posts_data.sql` file (it now includes a YouTube video post)
3. Or manually insert a post with a YouTube link:

```sql
INSERT INTO posts (title, subtitle, content, image, links, featured, category, created_at) VALUES
(
    'Test YouTube Video',
    'Testing video functionality',
    'This is a test post to verify YouTube video display.',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop',
    '[{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "title": "Test Video"}]',
    true,
    'can-exclusive',
    NOW()
);
```

### Step 2: Verify Video Display
1. **Homepage**: Check if the post appears with a "Watch Now" section
2. **Individual Post Page**: Navigate to `/content/{postId}` and verify the video appears
3. **Video Player**: Ensure the video is properly embedded and responsive

### Step 3: Test Different Scenarios
- ✅ Post with YouTube video
- ✅ Post with regular links (no video)
- ✅ Post with no links
- ✅ Multiple YouTube links (should show first one)

## Troubleshooting

### Video Not Showing?
1. Check browser console for debug logs
2. Verify the post has `links` data in the database
3. Ensure the YouTube URL is in a supported format
4. Check if the `links` field is properly populated in the API response

### Console Debug Information
The app includes extensive debug logging. Check your browser console for:
- `=== YOUTUBE DETECTION DEBUG ===`
- `=== DEBUG: Main Post Data ===`
- Link processing information

### Database Issues?
1. Verify the `links` column exists and is JSONB type
2. Check if the column has proper permissions
3. Ensure the data is properly formatted as JSONB

## Expected Behavior

### Homepage
- Posts with YouTube videos show a "Watch Now" section in the right sidebar
- Videos are embedded and responsive
- Posts without videos show a placeholder

### Individual Post Pages
- Full video display in the right sidebar
- Video maintains aspect ratio
- Responsive design for mobile and desktop

### Video Player Features
- YouTube embed with full controls
- Responsive sizing
- Proper aspect ratio (16:9)
- Fullscreen support

## Next Steps

Once you've verified the functionality is working:

1. **Add More Video Content**: Create posts with various YouTube videos
2. **Customize Video Display**: Modify the video player styling if needed
3. **Add Video Categories**: Consider organizing video content by type
4. **Performance Optimization**: Monitor video loading performance

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify the database structure matches the expected format
3. Test with the sample data provided
4. Ensure all components are properly updated

---

**Note**: The YouTube video functionality is now fully integrated and should work automatically for any post that includes a YouTube link in its `links` array.
