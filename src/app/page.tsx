import { ShortenUrlForm } from '@/components/url/shorten-url-form';
import { Toaster } from '@/components/ui/toaster';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center mb-8">URL Shortener</h1>
        <p className="text-center text-gray-600 mb-12">Create short, memorable links for your URLs</p>
        
        <ShortenUrlForm />
        
        <div className="mt-12 text-center text-sm text-gray-600">
          <p>Create custom short URLs for your business, blog, or social media.</p>
          <p className="mt-2">Track clicks and analyze your link performance.</p>
        </div>
      </div>
      
      <Toaster />
    </main>
  );
}
