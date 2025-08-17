-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    content TEXT,
    image TEXT,
    links JSONB DEFAULT '[]'::jsonb,
    featured BOOLEAN DEFAULT FALSE,
    category TEXT,
    keywords TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for posts table
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(featured);

-- Enable Row Level Security (RLS) for posts
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations on posts (you can restrict this based on your needs)
CREATE POLICY "Allow all operations on posts" ON posts
    FOR ALL USING (true);

-- Create advertisements table
CREATE TABLE IF NOT EXISTS advertisements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT NOT NULL,
    position VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for position and active status for faster queries
CREATE INDEX IF NOT EXISTS idx_advertisements_position_active ON advertisements(position, is_active);

-- Create index for created_at for ordering
CREATE INDEX IF NOT EXISTS idx_advertisements_created_at ON advertisements(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can restrict this based on your needs)
CREATE POLICY "Allow all operations on advertisements" ON advertisements
    FOR ALL USING (true);

-- Create storage bucket for advertisement images
-- Note: This needs to be done in the Supabase dashboard or via API
-- INSERT INTO storage.buckets (id, name, public) VALUES ('advertisement-images', 'advertisement-images', true);

-- Create policy for storage bucket (if bucket exists)
-- CREATE POLICY "Public access to advertisement images" ON storage.objects
--     FOR SELECT USING (bucket_id = 'advertisement-images');

-- Insert some sample advertisements
INSERT INTO advertisements (title, description, image_url, link_url, position, is_active) VALUES
(
    'Special Offer - 50% Off',
    'Limited time offer on all premium content',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop',
    'https://example.com/special-offer',
    'homepage-top',
    true
),
(
    'New Features Available',
    'Discover the latest updates and improvements',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    'https://example.com/new-features',
    'hero-section',
    true
),
(
    'Premium Subscription',
    'Unlock exclusive content and features',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
    'https://example.com/premium',
    'can-posts-sidebar',
    true
),
(
    'Community Spotlight',
    'Featured stories from our community',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop',
    'https://example.com/community',
    'content-page-sidebar',
    true
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_advertisements_updated_at 
    BEFORE UPDATE ON advertisements 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
