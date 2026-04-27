'use client';

import { useState, useEffect } from 'react';
import { X, Download, Share } from 'lucide-react';
import { usePWA } from '@/hooks/use-pwa';
import { Button } from '@/components/ui/button';

export function PWAInstallBanner() {
  const { isInstallable, isIOS, isStandalone, installPWA } = usePWA();
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show banner if installable and not already standalone
    if ((isInstallable || isIOS) && !isStandalone) {
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isIOS, isStandalone]);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Download size={24} />
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Install URL Shortener</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Add to home screen for the best experience</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {isIOS ? (
            <div className="flex flex-col items-center gap-1 text-[10px] text-zinc-500">
              <div className="flex items-center gap-1">
                <span>Tap</span> <Share size={14} className="text-primary" /> <span>then &quot;Add to Home Screen&quot;</span>
              </div>
            </div>
          ) : (
            <Button 
              onClick={installPWA}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
            >
              Install
            </Button>
          )}
          <button 
            onClick={() => setShowBanner(false)}
            className="p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
