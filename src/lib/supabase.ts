import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Client-side Supabase client
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (for server components)
export const createServerSupabaseClient = () => {
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