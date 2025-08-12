import React, { useEffect, useState } from "react";
import { supabase } from "../../../backend/supabaseClient"; // adjust path if needed
import PostCard from "../../../components/Admin/PostCard/PostCard"; // adjust path

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from Supabase
  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts") // table name in Supabase
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
    } else {
      setPosts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>All Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length > 0 ? (
        <div className="posts-grid">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
