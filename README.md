# 🔗 Link Code Editor

**Link Code Editor** is a premium, modern URL shortener and management platform. Create short, memorable links, track detailed click statistics, and manage your digital footprint with a sleek, high-performance interface.

The project is built with a focus on speed, reliability, and exceptional user experience, featuring a Progressive Web App (PWA) setup for seamless mobile usage.

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Postgres-22c55e)](https://supabase.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Install%20Banner-FF5722)](https://web.dev/progressive-web-apps/)

### 🚀 Smart Shortening
- Generate instant short codes using **nanoid** for high collision resistance
- Support for **custom aliases** to create branded links
- Optional **expiration dates** for temporary campaigns
- Rich metadata support: add titles and descriptions to your links

### 📊 Advanced Analytics
- Real-time click tracking with detailed event logging
- Capture referrer data and user agent insights
- Visualized statistics for link performance (coming soon)

### 📱 Premium PWA Experience
- Fully responsive design optimized for all device sizes
- Mobile-first approach with a dedicated **PWA Install Banner**
- Standalone mode with custom splash screens and app icons in vibrant orange (#FF5722)

### 🎨 Design System
- Built on **Tailwind CSS 4** with a custom high-contrast theme
- Vibrant orange accent color (#FF5722) for a modern, energetic feel
- Accessible and beautiful components via **Shadcn UI**

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS 4**
- **Lucide React** for iconography
- **Sonner** for toast notifications

### Backend & Infrastructure
- **Supabase** (PostgreSQL, Auth, Edge Functions)
- **RLS (Row Level Security)** for data protection
- **Zod** for robust schema validation

---

## 🚦 Getting Started

### Prerequisites
- **Node.js 20+**
- **npm**
- A **Supabase** project (see database setup below)

### Installation
```bash
# Clone the repository
git clone https://github.com/Rixouu/url-shortener.git
cd url-shortener

# Install dependencies
npm install

# Run the development server
npm run dev
```

### Environment Variables
Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🗄️ Database Setup

Run the following SQL in your Supabase SQL Editor to set up the required schema:

```sql
-- Create short_urls table
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

-- Create click_events table
CREATE TABLE click_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  short_url_id UUID REFERENCES short_urls(id),
  referrer TEXT,
  user_agent TEXT,
  ip_address TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Click increment function
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

---

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

---

**Built with ❤️ for speed and simplicity.**
