export interface ShortUrl {
  id: string;
  url: string;
  short_code: string;
  created_at: string;
  updated_at: string;
  title?: string;
  description?: string;
  clicks: number;
  user_id?: string;
  is_custom: boolean;
  expires_at?: string;
}

export interface ClickEvent {
  id: string;
  short_url_id: string;
  created_at: string;
  referrer?: string;
  user_agent?: string;
  ip_address?: string;
  country?: string;
}

export interface Database {
  public: {
    Tables: {
      short_urls: {
        Row: ShortUrl;
        Insert: Omit<ShortUrl, 'id' | 'created_at' | 'updated_at' | 'clicks'>;
        Update: Partial<Omit<ShortUrl, 'id' | 'created_at' | 'updated_at'>>;
      };
      click_events: {
        Row: ClickEvent;
        Insert: Omit<ClickEvent, 'id' | 'created_at'>;
        Update: Partial<Omit<ClickEvent, 'id' | 'created_at'>>;
      };
    };
  };
} 