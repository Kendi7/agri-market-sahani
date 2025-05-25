
import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, metadata: any) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    try {
      // Format M-Pesa number if provided
      const formattedMpesaNumber = metadata.mpesa_number ? 
        formatMpesaNumber(metadata.mpesa_number) : '';

      // Prepare clean metadata
      const userMetadata = {
        email: email,
        full_name: metadata.full_name || `${metadata.firstName || ''} ${metadata.lastName || ''}`.trim() || 'User',
        user_role: metadata.user_role || 'farmer',
        county: metadata.county || 'Nairobi',
        sub_county: metadata.sub_county || '',
        farmer_type: metadata.farmer_type || '',
        business_name: metadata.business_name || '',
        business_type: metadata.business_type || '',
        phone_number: formattedMpesaNumber || '+254700000000', // Ensure we always have a phone number
        mpesa_number: formattedMpesaNumber || ''
      };

      console.log('Attempting signup with metadata:', userMetadata);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
        },
      });

      if (error) {
        console.error('Signup error:', error);
        throw error;
      }

      console.log('Signup successful:', data);
      return { data, error: null };

    } catch (error) {
      console.error('Signup failed:', error);
      return { data: null, error };
    }
  };

  const formatMpesaNumber = (number: string) => {
    if (!number) return '';
    
    // Remove any non-digits
    const digits = number.replace(/\D/g, '');
    
    // Format for Kenyan numbers
    if (digits.startsWith('0')) {
      return '+254' + digits.substring(1);
    } else if (digits.startsWith('254')) {
      return '+' + digits;
    } else if (!digits.startsWith('+254') && digits.length >= 9) {
      return '+254' + digits;
    }
    return digits;
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      return { data, error: null };
    } catch (error) {
      console.error('Login failed:', error);
      return { data: null, error };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) throw new Error('No user logged in');

    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) throw error;
    
    // Refresh profile
    await fetchProfile(user.id);
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
