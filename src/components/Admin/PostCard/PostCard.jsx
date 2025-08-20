import React from 'react'

const PostCard = ({ post, onEdit, onDelete, isFeatured = false }) => {
  if (isFeatured) {
    return (
      <div className="relative group">
        {/* Featured Post Layout */}
        <div className="bg-base-200 rounded-lg h-64 sm:h-80 lg:h-96 flex items-center justify-center relative overflow-hidden">
          {post.image ? (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-contain"
            />
          ) : (
            <div className="text-base-content/50 text-4xl sm:text-6xl">🏔️</div>
          )}
          
          {/* Action buttons overlay */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1 sm:gap-2">
            <button
              onClick={onEdit}
              className="btn btn-xs sm:btn-sm btn-primary shadow-lg"
              title="Edit post"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="btn btn-xs sm:btn-sm btn-error shadow-lg"
              title="Delete post"
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span className="hidden sm:inline">Delete</span>
            </button>
          </div>

          {/* Featured badge */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span className="badge badge-primary badge-sm sm:badge-lg text-xs sm:text-sm">FEATURED</span>
          </div>
        </div>

        {/* Featured Post Content */}
        <div className="space-y-2 mt-3 sm:mt-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-base-content hover:text-primary cursor-pointer transition-colors duration-200 line-clamp-2">
            {post.title}
          </h2>
          <p className="text-base-content/70 text-sm sm:text-base lg:text-lg line-clamp-2">
            {post.subtitle}
          </p>
          <p className="text-base-content/60 text-xs sm:text-sm">
            {post.date}
          </p>
          {post.content && (
            <p className="text-base-content/80 mt-2 sm:mt-3 text-sm sm:text-base line-clamp-3">
              {post.content}
            </p>
          )}
          
          {/* Display attached links */}
          {Array.isArray(post.links) && post.links.length > 0 && (
            <div className="mt-3 sm:mt-4 space-y-2">
              <div className="text-xs sm:text-sm font-medium text-base-content/70">
                Related Links:
              </div>
              <div className="space-y-1">
                {post.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-primary hover:text-primary-focus transition-colors duration-200 group"
                  >
                    <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="truncate group-hover:underline">{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Regular post card layout
  return (
    <div className="space-y-2 sm:space-y-3 relative group">
      {/* Article Thumbnail */}
      <div className="bg-base-200 rounded-lg h-32 sm:h-40 lg:h-48 flex items-center justify-center relative overflow-hidden">
        {post.image ? (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-base-content/50 text-2xl sm:text-3xl lg:text-4xl">📰</div>
        )}
        
        {/* Action buttons overlay */}
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-1">
          <button
            onClick={onEdit}
            className="btn btn-xs btn-primary shadow-lg"
            title="Edit post"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="btn btn-xs btn-error shadow-lg"
            title="Delete post"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Article Details */}
      <div className="space-y-1 sm:space-y-2">
        <h3 className="text-sm sm:text-base font-medium text-base-content hover:text-primary cursor-pointer transition-colors duration-200 leading-tight line-clamp-2">
          {post.title}
        </h3>
        {post.subtitle && (
          <p className="text-xs sm:text-sm text-base-content/70 line-clamp-2">
            {post.subtitle}
          </p>
        )}
        <p className="text-xs text-base-content/60">
          {post.date}
        </p>
        {post.content && (
          <p className="text-xs sm:text-sm text-base-content/80 line-clamp-2 sm:line-clamp-3">
            {post.content}
          </p>
        )}
        
        {/* Display attached links for regular posts */}
        {Array.isArray(post.links) && post.links.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="text-xs font-medium text-base-content/60">
              Links ({post.links.length}):
            </div>
            <div className="space-y-1">
              {post.links.slice(0, 2).map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-primary hover:text-primary-focus transition-colors duration-200 group"
                >
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="truncate group-hover:underline">{link.title}</span>
                </a>
              ))}
              {post.links.length > 2 && (
                <div className="text-xs text-base-content/60">
                  +{post.links.length - 2} more link{post.links.length - 2 !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default PostCard
