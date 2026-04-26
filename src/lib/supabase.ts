import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Helper to validate URL
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isConfigured = isValidUrl(supabaseUrl) && supabaseAnonKey !== '' && supabaseAnonKey !== 'your-supabase-anon-key';

// Client-side Supabase client
export const supabaseClient = isConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Server-side Supabase client (for server components)
export const createServerSupabaseClient = () => {
  if (!isConfigured) {
    console.warn('Supabase is not properly configured. Please check your environment variables.');
    // Return a dummy client or null? Most callers expect a client.
    // However, createClient will throw if URL is invalid.
    // We should return null and handle it in callers, or throw a more descriptive error.
    return null as any; 
  }
  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      auth: {
        persistSession: false,
      }
    }
  );
};
 