import { supabase } from './supabaseClient';

// Helper function to format category display names
const formatCategoryDisplay = (category) => {
  // Handle null, undefined, or empty string
  if (!category || category.trim() === '') {
    return 'General';
  }
  
  // Trim whitespace and convert to lowercase for consistent matching
  const normalizedCategory = category.trim().toLowerCase();
  
  const categoryMap = {
    'can-news': 'Can News',
    'can-exclusive': 'Can Exclusive',
    'cinema': 'Cinema',
    'general': 'General'
  };
  
  const formattedCategory = categoryMap[normalizedCategory];
  
  if (formattedCategory) {
    return formattedCategory;
  } else {
    return category; // Return original if not found in map
  }
};

export const postsService = {
  // Fetch all posts for user display
  async fetchPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }

      // Transform the data to match the expected format for user components
      return (data || []).map(post => {
        const formattedCategory = formatCategoryDisplay(post.category);
        
        return {
          id: post.id,
          image: post.image || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
          title: post.title,
          description: post.subtitle || post.content?.substring(0, 150) + '...' || 'No description available',
          link: post.links?.[0] || null,
          publishedOn: new Date(post.created_at).toISOString().split('T')[0],
          category: formattedCategory
        };
      });
    } catch (error) {
      console.error('Error in fetchPosts:', error);
      return [];
    }
  },

  // Fetch posts by category
  async fetchPostsByCategory(category) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts by category:', error);
        throw error;
      }

      return (data || []).map(post => ({
        id: post.id,
        image: post.image || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
        title: post.title,
        description: post.subtitle || post.content?.substring(0, 150) + '...' || 'No description available',
        link: post.links?.[0] || null,
        publishedOn: new Date(post.created_at).toISOString().split('T')[0],
        category: formatCategoryDisplay(post.category)
      }));
    } catch (error) {
      console.error('Error in fetchPostsByCategory:', error);
      return [];
    }
  },

  // Fetch featured posts
  async fetchFeaturedPosts() {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching featured posts:', error);
        throw error;
      }

      return (data || []).map(post => ({
        id: post.id,
        image: post.image || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
        title: post.title,
        description: post.subtitle || post.content?.substring(0, 150) + '...' || 'No description available',
        link: post.links?.[0] || null,
        publishedOn: new Date(post.created_at).toISOString().split('T')[0],
        category: formatCategoryDisplay(post.category)
      }));
    } catch (error) {
      console.error('Error in fetchFeaturedPosts:', error);
      return [];
    }
  },

  // Search posts
  async searchPosts(query) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .or(`title.ilike.%${query}%,subtitle.ilike.%${query}%,content.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching posts:', error);
        throw error;
      }

      return (data || []).map(post => ({
        id: post.id,
        image: post.image || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
        title: post.title,
        description: post.subtitle || post.content?.substring(0, 150) + '...' || 'No description available',
        link: post.links?.[0] || null,
        publishedOn: new Date(post.created_at).toISOString().split('T')[0],
        category: formatCategoryDisplay(post.category)
      }));
    } catch (error) {
      console.error('Error in searchPosts:', error);
      return [];
    }
  }
};
