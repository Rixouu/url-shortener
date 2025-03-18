import { redirect } from 'next/navigation';
import { getShortUrl, recordClick } from '@/lib/url-service';
import { headers } from 'next/headers';

interface RouteParams {
  params: {
    code: string;
  };
}

export default async function RedirectPage({ params }: RouteParams) {
  const { code } = params;
  const headersList = headers();
  const userAgent = headersList.get('user-agent');
  const referer = headersList.get('referer');
  
  // Get the short URL from the database
  const shortUrl = await getShortUrl(code);
  
  // If the URL doesn't exist, redirect to home
  if (!shortUrl) {
    redirect('/');
  }
  
  // Check if the URL has expired
  if (shortUrl.expires_at && new Date(shortUrl.expires_at) < new Date()) {
    redirect('/?expired=true');
  }
  
  // Record the click
  await recordClick(
    shortUrl.id, 
    referer || undefined, 
    userAgent || undefined
  );
  
  // Redirect to the target URL
  redirect(shortUrl.url);
  
  // This is just a fallback and should never be rendered
  // The TypeScript error is suppressed because we know shortUrl cannot be null at this point
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Redirecting...</h1>
      <p>If you are not redirected, <a href={shortUrl!.url} className="text-blue-500 hover:underline">click here</a>.</p>
    </div>
  );
} 