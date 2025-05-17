import { useState, useEffect } from 'react';
import { createClient, User, Session } from '@supabase/supabase-js';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Initialize Supabase client
// Replace these with your actual Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define the UserProfile interface based on your separate profiles table
export interface UserProfile {
  user_id: string;
  full_name: string;
  email: string;
  image_url: string | null;
  role_id: number;
  created_at?: string;
  updated_at?: string;
}

export interface useUserReturn {
  user: User | null;
  session: Session | null; 
  userProfile: UserProfile | null;
  loading: boolean;
  error: Error | null;
  logout: () => void;
  isLoggingOut: boolean;
  refreshProfile: () => Promise<void>;
}

const useUser = (): useUserReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const queryClient = useQueryClient();

  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error: profileError } = await supabase
        .from('Profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (profileError) {
        console.error('Error fetching profile:', profileError);
        return null;
      }
      
      return data as UserProfile;
    } catch (err) {
      console.error('Exception fetching profile:', err);
      return null;
    }
  };

  const refreshProfile = async (): Promise<void> => {
    if (!user) return;
    
    try {
      const fetchedProfile = await fetchProfile(user.id);
      setUserProfile(fetchedProfile);
    } catch (err) {
      console.error('Failed to refresh profile:', err);
    }
  };

  // Use React Query's useMutation for logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const { error: logoutError } = await supabase.auth.signOut();
      if (logoutError) {
        throw logoutError;
      }
      return true;
    },
    onSuccess: () => {
      // Clear profile on logout
      setUserProfile(null);
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
    onError: (err) => {
      setError(err instanceof Error ? err : new Error('Error during logout'));
      console.error('Logout error:', err);
    }
  });

  useEffect(() => {
    // Get initial session
    const initAuth = async () => {
      try {
        setLoading(true);
        
        // Get current session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        setSession(currentSession);
        setUser(currentSession?.user || null);
        
        // Fetch profile if user is logged in
        if (currentSession?.user) {
          const fetchedProfile = await fetchProfile(currentSession.user.id);
          setUserProfile(fetchedProfile);
        }
        
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            setSession(newSession);
            setUser(newSession?.user || null);
            
            // On sign in or token refresh, fetch the profile
            if (newSession?.user) {
              if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
                const fetchedProfile = await fetchProfile(newSession.user.id);
                setUserProfile(fetchedProfile);
              }
            } else {
              // If signed out, clear profile
              setUserProfile(null);
            }
            
            setLoading(false);
          }
        );
        
        setLoading(false);
        
        // Cleanup subscription on unmount
        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error during authentication'));
        setLoading(false);
      }
    };
    
    initAuth();
  }, []);

  return {
    user,
    session,
    userProfile,
    loading,
    error,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    refreshProfile
  };
};

export default useUser;