import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';


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

// Cache keys
const USER_QUERY_KEY = 'user';
const PROFILE_QUERY_KEY = 'userProfile';

const useUser = (): useUserReturn => {
  const [session, setSession] = useState<Session | null>(null);
  const queryClient = useQueryClient();

  // Fetch user profile function
  const fetchProfile = useCallback(async (userId: string): Promise<UserProfile | null> => {
    if (!userId) return null;
    
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
  }, []);

  // Use React Query to fetch and cache the user profile
  const {
    data: userProfile,
    isLoading: profileLoading,
    error: profileError,
    refetch: refetchProfile
  } = useQuery({
    queryKey: [PROFILE_QUERY_KEY, session?.user?.id],
    queryFn: () => fetchProfile(session?.user?.id || ''),
    enabled: !!session?.user?.id, // Only run query if we have a user ID
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });

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
      // Clear user data on logout
      queryClient.setQueryData([USER_QUERY_KEY], null);
      queryClient.setQueryData([PROFILE_QUERY_KEY, session?.user?.id], null);
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
    },
    onError: (err) => {
      console.error('Logout error:', err);
    }
  });

  // Refresh profile function (exposed in the hook return)
  const refreshProfile = async (): Promise<void> => {
    if (!session?.user?.id) return;
    await refetchProfile();
  };

  // Effect to handle auth state and session
  useEffect(() => {
    let authStateSubscription: { unsubscribe: () => void } | null = null;
    
    const initAuth = async () => {
      try {
        // Get current session
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }
        
        // Update session state
        setSession(currentSession);
        
        // If we have a session, prefetch and cache the profile
        if (currentSession?.user) {
          const profile = await fetchProfile(currentSession.user.id);
          queryClient.setQueryData([PROFILE_QUERY_KEY, currentSession.user.id], profile);
        }
        
        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            setSession(newSession);
            
            // Handle different auth events
            if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
              if (newSession?.user) {
                // Fetch profile and update cache immediately
                const profile = await fetchProfile(newSession.user.id);
                queryClient.setQueryData([PROFILE_QUERY_KEY, newSession.user.id], profile);
                
                // Also trigger a refetch to ensure data is fresh
                queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY, newSession.user.id] });
              }
            } else if (event === 'SIGNED_OUT') {
              // Clear cached data
              queryClient.setQueryData([USER_QUERY_KEY], null);
              queryClient.setQueryData([PROFILE_QUERY_KEY], null);
            }
          }
        );
        
        authStateSubscription = subscription;
      } catch (err) {
        console.error('Auth initialization error:', err);
      }
    };
    
    initAuth();
    
    // Cleanup subscription on unmount
    return () => {
      authStateSubscription?.unsubscribe();
    };
  }, [fetchProfile, queryClient]);

  // Combine loading states
  const loading = profileLoading || !session;

  return {
    user: session?.user || null,
    session,
    userProfile: userProfile || null,
    loading,
    error: profileError as Error | null,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    refreshProfile
  };
};

export default useUser;