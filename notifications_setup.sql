-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    message TEXT,
    youtube_link TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for notifications table
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_active ON notifications(is_active);

-- Enable Row Level Security (RLS) for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all users to read notifications
CREATE POLICY "Allow all users to read notifications" ON notifications
    FOR SELECT USING (true);

-- Create policy to allow only admins to insert/update/delete notifications
CREATE POLICY "Allow admins to manage notifications" ON notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_notifications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for notifications table
CREATE TRIGGER update_notifications_updated_at 
    BEFORE UPDATE ON notifications 
    FOR EACH ROW 
    EXECUTE FUNCTION update_notifications_updated_at();

-- Insert some sample notifications
INSERT INTO notifications (title, message, youtube_link, is_active) VALUES
(
    'പുതിയ വാർത്ത',
    'കേരളത്തിലെ പുതിയ രാഷ്ട്രീയ വികാസങ്ങൾ',
    'https://www.youtube.com/watch?v=sample1',
    true
),
(
    'സിനിമ റിലീസ്',
    'പുതിയ മലയാള സിനിമ റിലീസ് ചെയ്തു',
    'https://www.youtube.com/watch?v=sample2',
    true
),
(
    'കാലാവസ്ഥ അപ്ഡേറ്റ്',
    'കേരളത്തിൽ ഇന്ന് മഴ പ്രതീക്ഷിക്കുന്നു',
    'https://www.youtube.com/watch?v=sample3',
    true
);
