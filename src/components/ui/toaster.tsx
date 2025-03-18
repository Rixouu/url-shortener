'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        className: 'border-border bg-background text-foreground',
        style: {
          padding: '1rem',
          borderRadius: '0.5rem',
        },
      }}
    />
  );
}

// Re-export toast for convenience
export { toast } from 'sonner'; 