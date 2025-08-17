import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../backend/supabaseClient';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session with timeout
    const getSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session:', session);
        
        if (session?.user) {
          console.log('Session user found:', session.user.id);
          // Check if user has admin role
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          console.log('Initial profile check:', { profile, profileError });
          
                           if (profileError) {
                   console.error('Initial profile check error:', profileError);
                 } else if (profile?.role && ['admin', 'moderator', 'editor'].includes(profile?.role)) {
                   console.log('Setting admin from session, role:', profile.role);
                   setAdmin(session.user);
                 }
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log('Session check timeout, setting loading to false');
      setLoading(false);
    }, 5000); // 5 second timeout

    getSession();

    return () => clearTimeout(timeoutId);

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          // Check if user has admin-level role
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
          
          if (profile?.role && ['admin', 'moderator', 'editor'].includes(profile?.role)) {
            setAdmin(session.user);
          } else {
            // User is not admin-level, sign them out
            await supabase.auth.signOut();
            setAdmin(null);
          }
        } else if (event === 'SIGNED_OUT') {
          setAdmin(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email, password) => {
    try {
      console.log('Starting sign in process...');
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Auth error:', error);
        throw error;
      }

      console.log('Auth successful, user:', data.user?.id);

      // Check if user has admin-level role (admin, moderator, or editor)
      if (data.user) {
        console.log('Fetching profile for user:', data.user.id);
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role, permissions')
          .eq('id', data.user.id)
          .single();

        console.log('Profile fetch result:', { profile, profileError });

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          throw new Error(`Failed to fetch user profile: ${profileError.message}`);
        }

        // Check if user has admin-level role
        if (profile?.role && ['admin', 'moderator', 'editor'].includes(profile.role)) {
          console.log('User has admin-level role:', profile.role);
          setAdmin(data.user);
          return { success: true };
        } else {
          console.log('User does not have admin-level role, role:', profile?.role);
          // User is not admin-level, sign them out
          await supabase.auth.signOut();
          throw new Error('Access denied. Admin, Moderator, or Editor privileges required.');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setAdmin(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    admin,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!admin,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
