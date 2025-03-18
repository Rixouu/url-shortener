import { nanoid } from 'nanoid';
import { createServerSupabaseClient } from './supabase';
import { ShortUrl } from './types';

// Generate a random short code
export function generateShortCode(length: number = 6): string {
  return nanoid(length);
}

// Create a new short URL
export async function createShortUrl(url: string, customCode?: string, title?: string, description?: string, expiresAt?: Date): Promise<ShortUrl | null> {
  try {
    const supabase = createServerSupabaseClient();
    const shortCode = customCode || generateShortCode();
    
    // Check if custom code already exists
    if (customCode) {
      const { data: existingUrl } = await supabase
        .from('short_urls')
        .select('*')
        .eq('short_code', customCode)
        .single();
      
      if (existingUrl) {
        throw new Error('Custom code already in use');
      }
    }
    
    // Insert new short URL
    const { data, error } = await supabase
      .from('short_urls')
      .insert({
        url,
        short_code: shortCode,
        title,
        description,
        is_custom: !!customCode,
        expires_at: expiresAt?.toISOString(),
        clicks: 0
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating short URL:', error);
    return null;
  }
}

// Get a short URL by its code
export async function getShortUrl(code: string): Promise<ShortUrl | null> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from('short_urls')
      .select('*')
      .eq('short_code', code)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting short URL:', error);
    return null;
  }
}

// Record a click event
export async function recordClick(shortUrlId: string, referrer?: string, userAgent?: string, ipAddress?: string): Promise<void> {
  try {
    const supabase = createServerSupabaseClient();
    
    // Update click count
    await supabase
      .from('short_urls')
      .update({ clicks: supabase.rpc('increment_clicks', { row_id: shortUrlId }) })
      .eq('id', shortUrlId);
    
    // Record click event
    await supabase
      .from('click_events')
      .insert({
        short_url_id: shortUrlId,
        referrer,
        user_agent: userAgent,
        ip_address: ipAddress
      });
    
  } catch (error) {
    console.error('Error recording click:', error);
  }
} 