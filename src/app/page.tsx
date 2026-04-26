import { ShortenUrlForm } from '@/components/url/shorten-url-form';
import { PWAInstallBanner } from '@/components/PWAInstallBanner';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-zinc-50 dark:bg-zinc-950">
      <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800 p-8 md:p-12">
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-primary/20">
            <svg width="40" height="40" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="95" y="95" width="23" height="23" fill="white"/>
              <rect x="142" y="95" width="23" height="23" fill="white"/>
              <rect x="188" y="95" width="23" height="23" fill="white"/>
              <rect x="235" y="95" width="23" height="23" fill="white"/>
              <rect x="281" y="95" width="23" height="23" fill="white"/>
              <rect x="95" y="142" width="23" height="23" fill="white"/>
              <rect x="188" y="142" width="23" height="23" fill="white"/>
              <rect x="281" y="142" width="23" height="23" fill="white"/>
              <rect x="95" y="188" width="210" height="23" fill="white"/>
              <rect x="95" y="235" width="23" height="23" fill="white"/>
              <rect x="188" y="235" width="23" height="23" fill="white"/>
              <rect x="281" y="235" width="23" height="23" fill="white"/>
              <rect x="95" y="281" width="23" height="23" fill="white"/>
              <rect x="142" y="281" width="23" height="23" fill="white"/>
              <rect x="188" y="281" width="23" height="23" fill="white"/>
              <rect x="235" y="281" width="23" height="23" fill="white"/>
              <rect x="281" y="281" width="23" height="23" fill="white"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-3">Link Code Editor</h1>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-sm">Create short, memorable links with premium analytics and management tools.</p>
        </div>
        
        <ShortenUrlForm />
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Custom Codes</h4>
            <p className="text-zinc-500 dark:text-zinc-400">Branded links with your own custom aliases.</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
            <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">Detailed Tracking</h4>
            <p className="text-zinc-500 dark:text-zinc-400">Track clicks, referrers, and audience insights.</p>
          </div>
        </div>
      </div>
      
      <PWAInstallBanner />
    </main>
  );
}

