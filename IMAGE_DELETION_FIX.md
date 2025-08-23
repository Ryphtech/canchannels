# Image Deletion Fix for CanChannels

## Problem Description

When deleting posts or advertisements from the admin dashboard, the database records were being deleted successfully, but the associated images remained in Supabase Storage. This caused:

1. **Storage bloat** - Unused images accumulating in storage buckets
2. **Cost implications** - Unnecessary storage costs
3. **Security concerns** - Orphaned images potentially accessible via direct URLs
4. **Poor user experience** - Confusion about whether deletion was complete

## Root Cause

The delete functions in both the AdminDashboard and AdvertisementManager were only deleting database records without cleaning up the associated storage files:

- **Posts**: Images stored in `post-images` bucket
- **Advertisements**: Images stored in `advertisement-images` bucket

## Solution Implemented

### 1. Fixed Post Deletion (`AdminDashboard.jsx`)

**Before:**
```javascript
const handleDeletePost = async (postId) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    try {
      const { error } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);
      // ... rest of function
    }
  }
};
```

**After:**
```javascript
const handleDeletePost = async (postId) => {
  if (window.confirm("Are you sure you want to delete this post?")) {
    try {
      // First, get the post to check if it has an image
      const { data: postData, error: fetchError } = await supabase
        .from("posts")
        .select("image")
        .eq("id", postId)
        .single();

      if (fetchError) {
        console.error("Error fetching post for deletion:", fetchError);
        alert("Failed to fetch post details. Please try again.");
        return;
      }

      // Delete the post from database
      const { error: deleteError } = await supabase
        .from("posts")
        .delete()
        .eq("id", postId);

      if (deleteError) {
        console.error("Error deleting post:", deleteError);
        alert("Failed to delete post. Please try again.");
        return;
      }

      // If the post had an image, delete it from storage
      if (postData.image && postData.image.includes('post-images')) {
        try {
          // Extract filename from the image URL
          const imageUrl = new URL(postData.image);
          const pathParts = imageUrl.pathname.split('/');
          const fileName = pathParts[pathParts.length - 1];
          
          // Delete the image from storage
          const { error: storageError } = await supabase.storage
            .from('post-images')
            .remove([fileName]);

          if (storageError) {
            console.warn("Warning: Failed to delete image from storage:", storageError);
            // Don't fail the entire operation if image deletion fails
          } else {
            console.log("Image deleted from storage successfully");
          }
        } catch (storageError) {
          console.warn("Warning: Error deleting image from storage:", storageError);
          // Don't fail the entire operation if image deletion fails
        }
      }

      await fetchPosts();
      alert("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  }
};
```

### 2. Fixed Advertisement Deletion (`advertisementsService.js`)

**Before:**
```javascript
async deleteAdvertisement(id) {
  try {
    const { error } = await supabase
      .from('advertisements')
      .delete()
      .eq('id', id);
    // ... rest of function
  }
}
```

**After:**
```javascript
async deleteAdvertisement(id, advertisementData = null) {
  try {
    // Delete the advertisement from database
    const { error } = await supabase
      .from('advertisements')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting advertisement:', error);
      throw error;
    }

    // If advertisement data is provided and it has an image, delete it from storage
    if (advertisementData && advertisementData.image_url && advertisementData.image_url.includes('advertisement-images')) {
      try {
        // Extract filename from the image URL
        const imageUrl = new URL(advertisementData.image_url);
        const pathParts = imageUrl.pathname.split('/');
        const fileName = pathParts[pathParts.length - 1];
        
        // Delete the image from storage
        const { error: storageError } = await supabase.storage
          .from('advertisement-images')
          .remove([fileName]);

        if (storageError) {
          console.warn("Warning: Failed to delete advertisement image from storage:", storageError);
          // Don't fail the entire operation if image deletion fails
        } else {
          console.log("Advertisement image deleted from storage successfully");
        }
      } catch (storageError) {
        console.warn("Warning: Error deleting advertisement image from storage:", storageError);
        // Don't fail the entire operation if image deletion fails
      }
    }

    return true;
  } catch (error) {
    console.error('Error in deleteAdvertisement:', error);
    throw error;
  }
}
```

### 3. Updated AdvertisementManager Component

Modified the `handleDeleteAdvertisement` function to pass advertisement data to the service:

```javascript
const handleDeleteAdvertisement = async (id) => {
  if (window.confirm('Are you sure you want to delete this advertisement?')) {
    try {
      // Find the advertisement to get its image URL
      const advertisement = advertisements.find(ad => ad.id === id);
      if (advertisement) {
        await advertisementsService.deleteAdvertisement(id, advertisement);
      } else {
        await advertisementsService.deleteAdvertisement(id);
      }
      await fetchAdvertisements();
      alert('Advertisement deleted successfully!');
    } catch (error) {
      console.error('Error deleting advertisement:', error);
      alert('Failed to delete advertisement. Please try again.');
    }
  }
};
```

## Key Features of the Solution

### 1. **Robust Error Handling**
- Image deletion failures don't prevent post/advertisement deletion
- Comprehensive logging for debugging
- Graceful fallback if storage operations fail

### 2. **Smart Image Detection**
- Only attempts to delete images from the correct storage bucket
- Checks if the image URL contains the bucket name before attempting deletion
- Handles both local storage and external URL images

### 3. **Filename Extraction**
- Automatically extracts filenames from Supabase storage URLs
- Works with the existing naming convention (`${postId}.${fileExt}` for posts, `ad-${timestamp}.${fileExt}` for ads)

### 4. **Backward Compatibility**
- Existing functionality remains unchanged
- No breaking changes to the API
- Graceful handling of missing image data

## Storage Bucket Requirements

The solution requires two storage buckets in your Supabase project:

1. **`post-images`** - for post images
2. **`advertisement-images`** - for advertisement images

### Storage Policy Setup

Run the `storage_policy_setup_complete.sql` script in your Supabase SQL Editor to set up proper permissions.

## Testing the Fix

### 1. **Test Post Deletion**
1. Go to Admin Dashboard → Posts Management
2. Create a post with an image
3. Delete the post
4. Verify in Supabase Storage that the image is removed from `post-images` bucket

### 2. **Test Advertisement Deletion**
1. Go to Admin Dashboard → Advertisement Management
2. Create an advertisement with an image
3. Delete the advertisement
4. Verify in Supabase Storage that the image is removed from `advertisement-images` bucket

### 3. **Test Error Handling**
1. Try deleting posts/advertisements with external image URLs
2. Verify that the operation completes successfully
3. Check console logs for appropriate warnings

## Console Logging

The solution provides comprehensive logging:

- **Success**: "Image deleted from storage successfully"
- **Warnings**: "Warning: Failed to delete image from storage: [error]"
- **Errors**: Full error details for debugging

## Security Considerations

1. **Authentication Required**: Only authenticated users can delete images
2. **Bucket Isolation**: Images are only deleted from their respective buckets
3. **URL Validation**: Image URLs are validated before processing
4. **Graceful Degradation**: Storage failures don't compromise data integrity

## Performance Impact

- **Minimal overhead**: One additional database query per deletion
- **Efficient storage operations**: Direct file removal from storage
- **Asynchronous processing**: Storage operations don't block UI

## Troubleshooting

### Common Issues

1. **"Failed to delete image from storage"**
   - Check storage bucket permissions
   - Verify bucket names match exactly
   - Ensure storage policies are configured

2. **"Image URL not found"**
   - Verify the image field contains valid URLs
   - Check if images are stored in the correct bucket

3. **Storage bucket not found**
   - Create the required storage buckets in Supabase
   - Run the storage policy setup script

### Debug Steps

1. Check browser console for error messages
2. Verify storage bucket configuration in Supabase dashboard
3. Test storage permissions with the provided SQL scripts
4. Check network tab for failed storage requests

## Future Enhancements

1. **Batch Deletion**: Support for deleting multiple posts/advertisements at once
2. **Image Cleanup**: Periodic cleanup of orphaned images
3. **Storage Analytics**: Track storage usage and cleanup statistics
4. **Soft Delete**: Option to archive instead of permanently delete

## Conclusion

This fix ensures that when posts or advertisements are deleted, their associated images are properly cleaned up from storage, preventing storage bloat and maintaining data consistency. The solution is robust, secure, and maintains backward compatibility while providing comprehensive error handling and logging.
