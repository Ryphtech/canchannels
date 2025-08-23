import { supabase } from './supabaseClient';

export const advertisementsService = {
  // Fetch all advertisements
  async fetchAdvertisements() {
    try {
      const { data, error } = await supabase
        .from('advertisements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching advertisements:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in fetchAdvertisements:', error);
      throw error;
    }
  },

  // Fetch advertisements by position
  async fetchAdvertisementsByPosition(position) {
    try {
      const { data, error } = await supabase
        .from('advertisements')
        .select('*')
        .eq('position', position)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching advertisements by position:', error);
        throw error;
      }

      return data || [];
    } catch (error) {
      console.error('Error in fetchAdvertisementsByPosition:', error);
      throw error;
    }
  },

  // Add new advertisement
  async addAdvertisement(advertisementData) {
    try {
      const { data, error } = await supabase
        .from('advertisements')
        .insert([advertisementData])
        .select();

      if (error) {
        console.error('Error adding advertisement:', error);
        throw error;
      }

      return data[0];
    } catch (error) {
      console.error('Error in addAdvertisement:', error);
      throw error;
    }
  },

  // Update advertisement
  async updateAdvertisement(id, updateData) {
    try {
      const { data, error } = await supabase
        .from('advertisements')
        .update(updateData)
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error updating advertisement:', error);
        throw error;
      }

      return data[0];
    } catch (error) {
      console.error('Error in updateAdvertisement:', error);
      throw error;
    }
  },

  // Delete advertisement
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
  },

  // Toggle advertisement status
  async toggleAdvertisementStatus(id, isActive) {
    try {
      const { data, error } = await supabase
        .from('advertisements')
        .update({ is_active: isActive })
        .eq('id', id)
        .select();

      if (error) {
        console.error('Error toggling advertisement status:', error);
        throw error;
      }

      return data[0];
    } catch (error) {
      console.error('Error in toggleAdvertisementStatus:', error);
      throw error;
    }
  }
};
