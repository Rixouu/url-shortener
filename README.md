# 🔗 URL Shortener

**URL Shortener** is a premium, modern URL shortener and link management platform. Create short, memorable links with ease, track detailed click analytics, and manage your digital presence through a sleek, high-performance PWA interface.

The project is built with a focus on speed, reliability, and an exceptional "WOW" user experience, featuring a fully optimized Progressive Web App (PWA) setup.

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![PWA Ready](https://img.shields.io/badge/PWA-Install%20Banner-FF5722)](https://web.dev/progressive-web-apps/)

### 🚀 Smart Shortening
- **Instant Generation**: Generate collision-resistant short codes using **nanoid**.
- **Custom Aliases**: Create branded, memorable links with custom URL codes.
- **Expiration Control**: Set optional expiration dates for temporary links or campaigns.
- **Rich Metadata**: Attach titles and descriptions to your links for better management.

### 📊 Real-time Analytics
- **Click Tracking**: Detailed event logging for every link interaction.
- **Audience Insights**: Capture referrer data and user agent information.
- **Performance Metrics**: High-performance data retrieval for link statistics.

### 🧾 QR Codes
- **QR Generation**: Auto-generate a QR code for every short link.
- **Downloadable**: Download QR codes as PNGs for sharing and print.

### 📱 Premium PWA & Mobile UX
- **Installable Anywhere**: Dedicated **PWA Install Banner** for Chrome and iOS.
- **Native Feel**: Custom splash screens and app icons optimized for all mobile devices.
- **Vibrant Aesthetic**: Modern UI with a signature **#FF5722** orange accent.
- **Offline Ready**: Basic service worker support for a resilient experience.

### 🛡️ Security & Reliability
- **Type Safety**: 100% TypeScript coverage with strict type checking.
- **Input Validation**: Robust schema validation using **Zod**.
- **Memory Optimization**: Efficient in-memory storage layer for rapid link redirection.

---

## 🛠️ Tech Stack

### Frontend
- **React 19**
- **Next.js 16** (App Router & Turbopack)
- **Tailwind CSS 4** (Vibrant orange theme)
- **Lucide React** for premium iconography
- **Shadcn UI** for accessible components
- **Sonner** for elegant toast notifications

### Infrastructure & Tooling
- **Next.js 16 Turbopack** for blazing fast production builds
- **ImageMagick** for automated PWA asset generation
- **Zod** for data integrity

---

## 🚦 Getting Started

### Prerequisites
- **Node.js 20+**
- **npm**
- **ImageMagick** (Optional, for asset generation)

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
Create a **`.env.local`** in the project root.

```env
# General
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## 📂 Project Structure

```txt
url-shortener/
├── src/
│   ├── app/                # Next.js 16 App Router (Pages & API)
│   ├── components/         # UI Components (Shadcn, PWA Banner, Form)
│   ├── hooks/              # Custom React hooks (usePWA)
│   ├── lib/                # Core logic (URL service, storage, utils)
│   └── types/              # Global TypeScript definitions
├── public/                 # PWA Assets (Icons, Splash Screens, Manifest)
├── scripts/                # Utility scripts (Asset generation)
└── README.md               # Project documentation
```

---

## 🧠 Development Workflow

### Build & Run
```bash
npm run dev              # Start development server
npm run build            # Production build (Typecheck & Lint)
npm run start            # Start production server
```

### Code Quality
```bash
npm run lint             # Run ESLint check
```

### Unit Tests
```bash
npm run test             # Run unit tests once (CI mode)
npm run test:watch       # Watch mode
```

### Asset Generation
The project includes a custom methodology for generating high-fidelity PWA assets directly from a single source icon:
```bash
# Generate all icons and iOS splash screens
chmod +x scripts/generate-assets.sh
./scripts/generate-assets.sh
```

---

## 📱 PWA & Install UX
- **Install Banner**: Custom component logic for handling the `beforeinstallprompt` and iOS "Add to Home Screen" instructions.
- **Splash Screens**: Automated generation of 8+ iOS splash screen sizes to ensure a premium launch experience.
- **Theme Color**: Signature `#FF5722` integrated into manifest and viewport settings.

## 🔌 API Endpoints
- `POST /api/url/shorten`: Create a short URL (supports optional `customCode`, `title`, `description`, `expiresAt`).
- `GET /api/url/[code]/stats`: Fetch click count + recent click events for a short code.

## 🧠 Notes
- Storage is in-memory for now. Restarting the server clears links and analytics.

## 📊 Performance & SEO
- **Next.js 16 SSR**: Fast initial page loads and SEO-friendly redirects.
- **Turbopack Stable**: Dramatic reduction in build times and enhanced dev performance.
- **Viewport Optimization**: Strict adherence to Next.js 16 viewport metadata standards.
- **Resource Efficiency**: Optimized build traces and shared JS chunks.

---

## 🤝 Contributing
Contributions are welcome! Please follow the code quality standards and ensure all type checks pass.

## 📄 License
This project is licensed under the MIT License.

---

## 👥 Team
- **Jonathan** — Lead Developer — [Rixouu](https://github.com/Rixouu)

---

**Built with ❤️ for speed, simplicity, and premium user experience.**
