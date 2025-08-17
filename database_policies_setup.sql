-- Database Policies Setup for advertisements table
-- Run this in your Supabase SQL Editor

-- 1. Enable RLS on advertisements table (if not already enabled)
ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

-- 2. Create policy to allow all operations on advertisements table
-- This allows anyone to read, insert, update, and delete advertisements
CREATE POLICY "Allow all operations on advertisements" ON advertisements
    FOR ALL USING (true);

-- 3. Alternative: More restrictive policies (uncomment if you want more security)
-- CREATE POLICY "Allow public read access to advertisements" ON advertisements
--     FOR SELECT USING (true);

-- CREATE POLICY "Allow authenticated users to insert advertisements" ON advertisements
--     FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- CREATE POLICY "Allow authenticated users to update advertisements" ON advertisements
--     FOR UPDATE USING (auth.role() = 'authenticated');

-- CREATE POLICY "Allow authenticated users to delete advertisements" ON advertisements
--     FOR DELETE USING (auth.role() = 'authenticated');

-- 4. Check if the advertisements table exists and has the correct structure
-- If you get an error about the table not existing, run the database_setup.sql first
SELECT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'advertisements'
) as table_exists;
