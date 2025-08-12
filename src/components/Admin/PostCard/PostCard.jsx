export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      {post.image_url && (
        <img src={post.image_url} alt={post.title} width="100%" />
      )}
    </div>
  );
}
