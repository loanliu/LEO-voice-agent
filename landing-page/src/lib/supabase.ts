import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file and ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

// Initialize Supabase client with authentication configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Configure authentication settings
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Configure redirect URLs for OAuth
    redirectTo: `${window.location.origin}/auth/callback`,
  },
});

// Export types for TypeScript support
export type { User, Session, AuthError } from '@supabase/supabase-js';