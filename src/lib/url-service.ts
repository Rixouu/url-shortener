import { nanoid } from 'nanoid';
import { ClickEvent, ShortUrl } from './types';

// In-memory store for URLs and click events
// Note: This will reset when the server restarts.
const urls: Map<string, ShortUrl> = new Map();
const clickEvents: ClickEvent[] = [];

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
      title: title || undefined,
      description: description || undefined,
      clicks: 0,
      user_id: undefined,
      is_custom: !!customCode,
      expires_at: expiresAt ? expiresAt.toISOString() : undefined,
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

export async function getShortUrlById(id: string): Promise<ShortUrl | null> {
  try {
    return urls.get(id) || null;
  } catch (error) {
    console.error('Error getting short URL by id:', error);
    return null;
  }
}

export async function getClickEventsForShortUrl(shortUrlId: string, limit: number = 25): Promise<ClickEvent[]> {
  try {
    const events = clickEvents
      .filter((e) => e.short_url_id === shortUrlId)
      .slice()
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return events.slice(0, Math.max(0, limit));
  } catch (error) {
    console.error('Error getting click events:', error);
    return [];
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
        referrer: referrer || undefined,
        user_agent: userAgent || undefined,
        ip_address: ipAddress || undefined,
        created_at: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Error recording click:', error);
  }
}
 
