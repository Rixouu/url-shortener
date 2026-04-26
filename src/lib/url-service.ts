import { nanoid } from 'nanoid';
import { ShortUrl } from './types';

// In-memory store for URLs and click events
// Note: This will reset when the server restarts.
const urls: Map<string, ShortUrl> = new Map();
const clickEvents: any[] = [];

// Generate a random short code
export function generateShortCode(length: number = 6): string {
  return nanoid(length);
}

// Create a new short URL
export async function createShortUrl(url: string, customCode?: string, title?: string, description?: string, expiresAt?: Date): Promise<ShortUrl | null> {
  try {
    const shortCode = customCode || generateShortCode();
    
    // Check if custom code already exists
    if (customCode && Array.from(urls.values()).some(u => u.short_code === customCode)) {
      throw new Error('Custom code already in use');
    }
    
    const newShortUrl: ShortUrl = {
      id: nanoid(),
      url,
      short_code: shortCode,
      title: title || null,
      description: description || null,
      clicks: 0,
      user_id: null,
      is_custom: !!customCode,
      expires_at: expiresAt ? expiresAt.toISOString() : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    urls.set(newShortUrl.id, newShortUrl);
    return newShortUrl;
  } catch (error) {
    console.error('Error creating short URL:', error);
    return null;
  }
}

// Get a short URL by its code
export async function getShortUrl(code: string): Promise<ShortUrl | null> {
  try {
    const shortUrl = Array.from(urls.values()).find(u => u.short_code === code);
    return shortUrl || null;
  } catch (error) {
    console.error('Error getting short URL:', error);
    return null;
  }
}

// Record a click event
export async function recordClick(shortUrlId: string, referrer?: string, userAgent?: string, ipAddress?: string): Promise<void> {
  try {
    const shortUrl = urls.get(shortUrlId);
    if (shortUrl) {
      shortUrl.clicks += 1;
      urls.set(shortUrlId, { ...shortUrl });
      
      clickEvents.push({
        id: nanoid(),
        short_url_id: shortUrlId,
        referrer: referrer || null,
        user_agent: userAgent || null,
        ip_address: ipAddress || null,
        created_at: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Error recording click:', error);
  }
}
 