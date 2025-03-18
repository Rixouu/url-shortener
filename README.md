# URL Shortener

A modern URL shortener application built with Next.js, Shadcn UI, and Supabase.

## Features

- Shorten any URL with a random code or a custom alias
- Track click statistics for each shortened URL
- Optional URL expiration dates
- Add titles and descriptions to your shortened URLs
- Responsive design with Shadcn UI components

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **Database**: Supabase
- **Form Handling**: React Hook Form, Zod
- **Notifications**: Sonner

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up your environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Set up your Supabase database tables:

   Create `short_urls` table:
   ```sql
   CREATE TABLE short_urls (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     url TEXT NOT NULL,
     short_code TEXT NOT NULL UNIQUE,
     title TEXT,
     description TEXT,
     clicks INTEGER DEFAULT 0,
     user_id UUID,
     is_custom BOOLEAN DEFAULT FALSE,
     expires_at TIMESTAMP WITH TIME ZONE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   Create `click_events` table:
   ```sql
   CREATE TABLE click_events (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     short_url_id UUID REFERENCES short_urls(id),
     referrer TEXT,
     user_agent TEXT,
     ip_address TEXT,
     country TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

   Create an increment function for click counting:
   ```sql
   CREATE OR REPLACE FUNCTION increment_clicks(row_id UUID)
   RETURNS INTEGER AS $$
   DECLARE
     new_count INTEGER;
   BEGIN
     UPDATE short_urls 
     SET clicks = clicks + 1 
     WHERE id = row_id 
     RETURNING clicks INTO new_count;
     
     RETURN new_count;
   END;
   $$ LANGUAGE plpgsql;
   ```

5. Run the development server
   ```bash
   npm run dev
   ```

## Deployment

The app can be deployed to Vercel:

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
