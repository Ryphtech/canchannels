-- Fix notification permissions by updating the policy to use profiles table
-- Drop the existing policy that uses auth.users
DROP POLICY IF EXISTS "Allow admins to manage notifications" ON notifications;

-- Create new policy using profiles table
CREATE POLICY "Allow admins to manage notifications" ON notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'admin'
        )
    );

-- Also allow subadmins to manage notifications
CREATE POLICY "Allow subadmins to manage notifications" ON notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.role = 'subadmin'
        )
    );
