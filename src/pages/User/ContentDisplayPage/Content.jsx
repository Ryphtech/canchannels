import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsService } from '../../../backend/postsService';
import ContentImageCarousel from '../../../components/User/ContentImageCarousel/ContentImageCarousel';

const Content = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [suggestedPosts, setSuggestedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    if (!url) return '';
    
    console.log('Processing URL for YouTube video ID:', url); // Debug log
    
    // Handle different YouTube URL formats
    let videoId = '';
    
    // youtube.com/watch?v=VIDEO_ID
    if (url.toLowerCase().includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1];
    }
    // youtu.be/VIDEO_ID
    else if (url.toLowerCase().includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1];
    }
    // youtube.com/embed/VIDEO_ID
    else if (url.toLowerCase().includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1];
    }
    // youtube.com/v/VIDEO_ID
    else if (url.toLowerCase().includes('youtube.com/v/')) {
      videoId = url.split('v/')[1];
    }
    
    // Remove any additional parameters (like &t=, &list=, etc.)
    if (videoId && videoId.includes('&')) {
      videoId = videoId.split('&')[0];
    }
    
    // Remove any trailing slashes
    if (videoId) {
      videoId = videoId.replace(/\/$/, '');
    }
    
    console.log('Extracted video ID:', videoId); // Debug log
    return videoId;
  };

  // Helper function to get YouTube thumbnail URL
  const getYouTubeThumbnailUrl = (videoId, quality = 'maxresdefault') => {
    if (!videoId) return '';
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await postsService.fetchPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a specific post by ID
  const fetchPostById = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const post = await postsService.fetchPostById(id);
      if (post) {
        setCurrentPost(post);
        // Fetch suggested posts based on keywords
        if (post.keywords) {
          const suggestions = await postsService.fetchPostsByKeywords(post.keywords, post.id, 4);
          setSuggestedPosts(suggestions);
        } else {
          // If no keywords, fetch recent posts as fallback
          const recentPosts = await postsService.fetchPosts();
          setSuggestedPosts(recentPosts.slice(0, 4));
        }
      } else {
        setError('Post not found');
      }
    } catch (err) {
      console.error('Error fetching post:', err);
      setError('Failed to load post. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchPostById(postId);
    } else {
      fetchPosts();
    }
  }, [postId]);

  // Get the main post for display
  const mainPost = postId ? currentPost : posts[0];
  const recommendedPosts = postId ? suggestedPosts : posts.slice(1, 4);

  // Debug logging for links
  if (mainPost) {
    console.log('=== DEBUG: Main Post Data ===');
    console.log('Main post object:', mainPost);
    console.log('Main post links:', mainPost.links);
    console.log('Main post link (first):', mainPost.link);
    console.log('Links type:', typeof mainPost.links);
    console.log('Is links array:', Array.isArray(mainPost.links));
    console.log('Links length:', mainPost.links ? mainPost.links.length : 'null/undefined');
    
    if (mainPost.links && Array.isArray(mainPost.links) && mainPost.links.length > 0) {
      mainPost.links.forEach((link, index) => {
        console.log(`=== Link ${index} ===`);
        console.log('Link object:', link);
        console.log('Link type:', typeof link);
        console.log('Link URL:', link?.url);
        console.log('URL type:', typeof link?.url);
        if (link?.url) {
          console.log('URL includes youtube.com:', link.url.toLowerCase().includes('youtube.com'));
          console.log('URL includes youtu.be:', link.url.toLowerCase().includes('youtu.be'));
          console.log('Is YouTube URL:', link.url.toLowerCase().includes('youtube.com') || link.url.toLowerCase().includes('youtu.be'));
        }
      });
    } else {
      console.log('No links found or links is not an array');
    }
    console.log('=== END DEBUG ===');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="text-gray-600">Loading content...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Content</h3>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={fetchPosts}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!mainPost) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Content Available</h3>
        <p className="text-gray-600">Check back later for new content.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
      {/* Left Section */}
      <div className="w-full md:w-3/4 space-y-6">
        {/* Back button for individual post view */}
        {postId && (
          <div className="mb-4">
            <button
              onClick={() => navigate('/')}
              className="btn btn-outline btn-sm gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        )}
        <div className="rounded-xl shadow p-4">
          <h2 className="text-2xl font-bold mb-4">{mainPost.title}</h2>

          <img
            src={mainPost.image}
            alt={mainPost.title}
            className="w-full h-48 md:h-64 object-cover rounded-lg mb-4"
          />
          
          {/* Display split content with carousel */}
          {postId && (mainPost.content_top || mainPost.content_down || (mainPost.content_images && mainPost.content_images.length > 0)) ? (
            <div className="mb-4 text-justify leading-relaxed break-words overflow-wrap-anywhere">
              {/* Content Top */}
              {mainPost.content_top && (
                <div className="mb-6">
                  {mainPost.content_top.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Content Images Carousel */}
              <ContentImageCarousel images={mainPost.content_images} />

              {/* Content Down */}
              {mainPost.content_down && (
                <div className="mt-6">
                  {mainPost.content_down.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Fallback to old content or description */
            <div className="mb-4 text-justify leading-relaxed break-words overflow-wrap-anywhere">
              {mainPost.content ? (
                mainPost.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))
              ) : (
                <p className="mb-4">
                  {mainPost.description}
                </p>
              )}
            </div>
          )}

          {/* Display attached links if any */}
          {mainPost.links && mainPost.links.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Related Links:</h3>
              <div className="space-y-2">
                {mainPost.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-blue-600 hover:underline font-medium"
                  >
                    {link.title || link.url} →
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span className="font-medium border px-2 py-1 rounded">{mainPost.category}</span>
            <span>{mainPost.publishedOn}</span>
          </div>
        </div>
      </div>

             {/* Right Section */}
       <div className="w-full md:w-1/4 space-y-4">
                             {/* Watch Now - Display video from post links */}
          {(() => {
            console.log('=== YOUTUBE DETECTION DEBUG ===');
            console.log('Main post links array:', mainPost.links);
            console.log('Links is array:', Array.isArray(mainPost.links));
            console.log('Links length:', mainPost.links ? mainPost.links.length : 'null/undefined');
            
            // Find YouTube link from the links array
            let youtubeLink = null;
            
            // Check mainPost.links array (this is where admin adds links)
            if (mainPost.links && Array.isArray(mainPost.links) && mainPost.links.length > 0) {
              console.log('Searching through links array...');
              mainPost.links.forEach((link, index) => {
                console.log(`Checking link ${index}:`, link);
                console.log('Link has URL:', !!link?.url);
                console.log('URL is string:', typeof link?.url === 'string');
                if (link?.url && typeof link.url === 'string') {
                  const isYouTube = link.url.toLowerCase().includes('youtube.com') || link.url.toLowerCase().includes('youtu.be');
                  console.log(`Link ${index} is YouTube:`, isYouTube);
                  if (isYouTube && !youtubeLink) {
                    youtubeLink = link;
                    console.log('Found YouTube link:', youtubeLink);
                  }
                }
              });
            } else {
              console.log('No valid links array found');
            }
            
            console.log('Final YouTube link found:', youtubeLink);
            console.log('=== END YOUTUBE DETECTION ===');
            
                         return youtubeLink ? (() => {
               const videoId = getYouTubeVideoId(youtubeLink.url);
               const thumbnailUrl = getYouTubeThumbnailUrl(videoId);
               
               return (
                 <div className="p-4 rounded-lg shadow">
                   <h3 className="font-semibold text-lg mb-2">Watch Now</h3>
                   <div 
                     className="aspect-w-16 aspect-h-9 relative cursor-pointer group"
                     onClick={() => window.open(youtubeLink.url, '_blank', 'noopener,noreferrer')}
                     title="Click to watch on YouTube"
                   >
                     {/* YouTube Thumbnail */}
                     <img
                       src={thumbnailUrl}
                       alt="YouTube Video Thumbnail"
                       className="w-full h-48 object-cover rounded"
                       onError={(e) => {
                         // Fallback to medium quality if maxresdefault fails
                         const fallbackUrl = getYouTubeThumbnailUrl(videoId, 'hqdefault');
                         if (e.target.src !== fallbackUrl) {
                           e.target.src = fallbackUrl;
                         }
                       }}
                     />
                     
                     {/* Play Button Overlay */}
                     <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
                       <div className="bg-red-600 text-white p-3 rounded-full group-hover:scale-110 transition-transform duration-200">
                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                           <path d="M8 5v14l11-7z"/>
                         </svg>
                       </div>
                     </div>
                     
                     {/* YouTube Logo */}
                     <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs font-medium">
                       YouTube
                     </div>
                   </div>
                 </div>
               );
             })() : null;
          })()}

                 {/* Recommendations */}
         {recommendedPosts.length > 0 && (
           <div className="p-4 rounded-lg shadow">
             <h3 className="font-semibold text-lg mb-4">
               {postId && currentPost?.keywords ? 'Related Posts' : 'Recommendations'}
             </h3>
             <div className="space-y-4">
               {recommendedPosts.map((post, index) => (
                 <div 
                   key={post.id || index} 
                   className="flex gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded transition-colors duration-200"
                   onClick={() => navigate(`/content/${post.id}`)}
                 >
                   <img
                     src={post.image}
                     alt={post.title}
                     className="w-16 h-16 object-cover rounded"
                   />
                   <div className="flex flex-col">
                     <p className="text-sm font-semibold line-clamp-2">{post.title}</p>
                     <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                       {post.description.slice(0, 60)}...
                     </p>
                     {post.keywords && (
                       <div className="flex flex-wrap gap-1 mt-1">
                         {post.keywords.split(',').slice(0, 2).map((keyword, idx) => (
                           <span key={idx} className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-1 rounded">
                             {keyword.trim()}
                           </span>
                         ))}
                       </div>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )}
      </div>
    </div>
  );
};

export default Content;
