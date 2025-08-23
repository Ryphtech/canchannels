import { supabase } from './supabaseClient';

// Helper function to format category display names
const formatCategoryDisplay = (category) => {
  // Handle null, undefined, or empty string - return null instead of 'General'
  if (!category || category.trim() === '') {
    return null;
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
          description: post.subtitle || post.content_top?.substring(0, 150) + '...' || post.content?.substring(0, 150) + '...' || 'No description available',
          link: post.links?.[0] || null,
          publishedOn: new Date(post.created_at).toISOString().split('T')[0],
          category: formattedCategory,
          keywords: post.keywords || null,
          links: post.links || [],
          content_top: post.content_top || null,
          content_down: post.content_down || null,
          content_images: post.content_images || []
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
        description: post.subtitle || post.content_top?.substring(0, 150) + '...' || post.content?.substring(0, 150) + '...' || 'No description available',
        link: post.links?.[0] || null,
        publishedOn: new Date(post.created_at).toISOString().split('T')[0],
        category: formatCategoryDisplay(post.category),
        keywords: post.keywords || null,
        links: post.links || [],
        content_top: post.content_top || null,
        content_down: post.content_down || null,
        content_images: post.content_images || []
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
        description: post.subtitle || post.content_top?.substring(0, 150) + '...' || post.content?.substring(0, 150) + '...' || 'No description available',
        link: post.links?.[0] || null,
        publishedOn: new Date(post.created_at).toISOString().split('T')[0],
        category: formatCategoryDisplay(post.category),
        keywords: post.keywords || null,
        links: post.links || [],
        content_top: post.content_top || null,
        content_down: post.content_down || null,
        content_images: post.content_images || []
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
        .or(`title.ilike.%${query}%,subtitle.ilike.%${query}%,content.ilike.%${query}%,content_top.ilike.%${query}%,content_down.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error searching posts:', error);
        throw error;
      }

      return (data || []).map(post => ({
        id: post.id,
        image: post.image || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
        title: post.title,
        description: post.subtitle || post.content_top?.substring(0, 150) + '...' || post.content?.substring(0, 150) + '...' || 'No description available',
        link: post.links?.[0] || null,
        publishedOn: new Date(post.created_at).toISOString().split('T')[0],
        category: formatCategoryDisplay(post.category),
        keywords: post.keywords || null,
        links: post.links || [],
        content_top: post.content_top || null,
        content_down: post.content_down || null,
        content_images: post.content_images || []
      }));
    } catch (error) {
      console.error('Error in searchPosts:', error);
      return [];
    }
  },

    // Fetch a single post by ID
  async fetchPostById(postId) {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) {
        console.error('Error fetching post by ID:', error);
        throw error;
      }

      if (!data) {
        return null;
      }

      return {
        id: data.id,
        image: data.image || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        content_top: data.content_top || null,
        content_down: data.content_down || null,
        content_images: data.content_images || [],
        description: data.subtitle || data.content_top?.substring(0, 150) + '...' || data.content?.substring(0, 150) + '...' || 'No description available',
        link: data.links?.[0] || null,
        publishedOn: new Date(data.created_at).toISOString().split('T')[0],
        category: formatCategoryDisplay(data.category),
        keywords: data.keywords || null,
        links: data.links || []
      };
    } catch (error) {
      console.error('Error in fetchPostById:', error);
      return null;
    }
  },

  // Fetch posts by keywords for suggestions
  async fetchPostsByKeywords(keywords, excludePostId = null, limit = 4) {
    try {
      if (!keywords || keywords.trim() === '') {
        return [];
      }

      // Split keywords by comma and clean them
      const keywordArray = keywords.split(',').map(k => k.trim().toLowerCase()).filter(k => k.length > 0);
      
      if (keywordArray.length === 0) {
        return [];
      }

      // Build the query to search for posts with matching keywords
      let query = supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

      // Add keyword search conditions
      const keywordConditions = keywordArray.map(keyword => `keywords.ilike.%${keyword}%`).join(',');
      query = query.or(keywordConditions);

      // Exclude the current post if specified
      if (excludePostId) {
        query = query.neq('id', excludePostId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching posts by keywords:', error);
        throw error;
      }

      return (data || []).map(post => ({
        id: post.id,
        image: post.image || 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg',
        title: post.title,
        description: post.subtitle || post.content_top?.substring(0, 150) + '...' || post.content?.substring(0, 150) + '...' || 'No description available',
        link: post.links?.[0] || null,
        publishedOn: new Date(post.created_at).toISOString().split('T')[0],
        category: formatCategoryDisplay(post.category),
        keywords: post.keywords || null,
        links: post.links || [],
        content_top: post.content_top || null,
        content_down: post.content_down || null,
        content_images: post.content_images || []
      }));
    } catch (error) {
      console.error('Error in fetchPostsByKeywords:', error);
      return [];
    }
  }
};
