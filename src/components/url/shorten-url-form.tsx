'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toaster';
import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/navigation';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, formatDistanceToNowStrict } from 'date-fns';
import { ArrowRight, CalendarIcon, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import QRCode from 'qrcode';
import type { ClickEvent } from '@/lib/types';

const urlFormSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL' }),
  customCode: z.string().optional(),
  useCustomCode: z.boolean(),
  title: z.string().optional(),
  description: z.string().optional(),
  expiresAt: z.date().optional(),
});

type UrlFormValues = z.infer<typeof urlFormSchema>;

interface ShortenUrlFormProps {
  onSuccess?: (data: { id: string; shortCode: string; url: string; expiresAt: string | null }) => void;
  variant?: 'card' | 'panel';
}

export function ShortenUrlForm({ onSuccess, variant = 'card' }: ShortenUrlFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [lastShortCode, setLastShortCode] = useState<string | null>(null);
  const [lastExpiresAt, setLastExpiresAt] = useState<string | null>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [stats, setStats] = useState<{ clicks: number; clickEvents: ClickEvent[] } | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const fetchStats = async (code: string) => {
    const res = await fetch(`/api/url/${encodeURIComponent(code)}/stats?limit=10`);
    if (!res.ok) return;
    const json = await res.json();
    setStats({ clicks: json.clicks ?? 0, clickEvents: json.clickEvents ?? [] });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast("Success", {
        description: "Link copied to clipboard!",
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const form = useForm<UrlFormValues>({
    resolver: zodResolver(urlFormSchema),
    defaultValues: {
      url: '',
      customCode: '',
      useCustomCode: false,
      title: '',
      description: '',
    },
  });

  useEffect(() => {
    if (!lastResult) {
      setQrDataUrl(null);
      return;
    }

    let cancelled = false;
    QRCode.toDataURL(lastResult, {
      margin: 1,
      width: 256,
      color: { dark: '#0F172A', light: '#FFFFFF' },
    })
      .then((dataUrl: string) => {
        if (!cancelled) setQrDataUrl(dataUrl);
      })
      .catch(() => {
        if (!cancelled) setQrDataUrl(null);
      });

    return () => {
      cancelled = true;
    };
  }, [lastResult]);

  useEffect(() => {
    if (!lastShortCode) {
      setStats(null);
      return;
    }

    fetchStats(lastShortCode);
    const timer = setInterval(() => fetchStats(lastShortCode), 5000);
    return () => clearInterval(timer);
  }, [lastShortCode]);

  async function onSubmit(data: UrlFormValues) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/url/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: data.url,
          customCode: data.useCustomCode ? data.customCode : undefined,
          title: data.title || undefined,
          description: data.description || undefined,
          expiresAt: data.expiresAt ? data.expiresAt.toISOString() : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create short URL');
      }

      const result = await response.json();
      const shortUrl = `${window.location.origin}/${result.shortCode}`;
      setLastResult(shortUrl);
      setLastShortCode(result.shortCode);
      setLastExpiresAt(result.expiresAt ?? null);
      
      toast(`Your shortened URL is ready: ${shortUrl}`, {
        description: "URL successfully shortened!",
      });

      if (onSuccess) {
        onSuccess({ id: result.id, shortCode: result.shortCode, url: data.url, expiresAt: result.expiresAt ?? null });
      }

      form.reset();
      router.refresh();
    } catch (error) {
      toast("Error", {
        description: error instanceof Error ? error.message : 'Failed to create short URL',
        action: {
          label: 'Try Again',
          onClick: () => form.handleSubmit(onSubmit)(),
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const content = (
    <div className={cn(variant === 'panel' ? "w-full" : "w-full max-w-2xl mx-auto")}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className={cn(variant === 'panel' ? "space-y-5" : "space-y-4")}>
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={cn(variant === 'panel' && "text-[11px] tracking-wide text-muted-foreground uppercase")}>
                  Your long URL
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/your-very-long-url"
                    className={cn(
                      variant === 'panel' && "h-11 rounded-xl border-input bg-card px-4 text-[15px] md:text-sm"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormDescription className={cn(variant === 'panel' && "text-xs")}>
                  Paste the full URL you want to shorten.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="useCustomCode"
            render={({ field }) => (
              <FormItem
                className={cn(
                  "flex flex-row items-start space-x-3 space-y-0 rounded-xl border border-input p-4 transition-colors",
                  variant === 'panel' ? "bg-card hover:bg-secondary/40" : "bg-background"
                )}
              >
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-medium">Use custom URL code</FormLabel>
                  <FormDescription className={cn(variant === 'panel' && "text-xs")}>
                    Create a custom slug instead of a random one.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          {form.watch('useCustomCode') && (
            <FormField
              control={form.control}
              name="customCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(variant === 'panel' && "text-[11px] tracking-wide text-muted-foreground uppercase")}>
                    Custom code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="my-custom-url"
                      className={cn(
                        variant === 'panel' && "h-11 rounded-xl border-input bg-card px-4"
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className={cn(variant === 'panel' && "text-xs")}>
                    This will create: {window.location.origin}/{field.value || 'my-custom-url'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Accordion type="single" collapsible>
            <AccordionItem value="advanced-options" className={cn(variant === 'panel' && "border-border")}>
              <AccordionTrigger
                className={cn(
                  variant === 'panel' && "py-3 text-sm font-medium text-foreground/80 hover:no-underline"
                )}
              >
                Advanced options
              </AccordionTrigger>
              <AccordionContent>
                <div className={cn(variant === 'panel' ? "space-y-5 pt-4" : "space-y-4 pt-4")}>
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(variant === 'panel' && "text-[11px] tracking-wide text-muted-foreground uppercase")}>
                          Title (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="My Website"
                            className={cn(
                              variant === 'panel' && "h-11 rounded-xl border-input bg-card px-4"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(variant === 'panel' && "text-[11px] tracking-wide text-muted-foreground uppercase")}>
                          Description (optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="A short description..."
                            className={cn(
                              variant === 'panel' && "h-11 rounded-xl border-input bg-card px-4"
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expiresAt"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className={cn(variant === 'panel' && "text-[11px] tracking-wide text-muted-foreground uppercase")}>
                          Expiration date (optional)
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  variant === 'panel' && "h-11 rounded-xl border-input bg-card px-4",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormDescription className={cn(variant === 'panel' && "text-xs")}>
                          Set an expiration date for this URL (optional).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            type="submit"
            className={cn(
              "w-full",
              variant === 'panel' && "h-11 rounded-xl text-[15px] font-medium"
            )}
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? 'Shortening...' : 'Shorten URL'}</span>
            <ArrowRight className="size-4" />
          </Button>
        </form>
      </Form>

      {lastResult && (
        <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className={cn(
            "rounded-2xl border border-primary/15 bg-primary/5 p-4",
            variant === 'panel' && "bg-primary/5"
          )}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-muted-foreground">Short link</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-primary hover:bg-primary/10"
                onClick={() => copyToClipboard(lastResult)}
                type="button"
              >
                {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-3 shadow-xs">
              <div className="flex-1 truncate font-mono text-sm text-primary">{lastResult}</div>
            </div>

            {variant === 'panel' && (
              <div className="mt-4 hidden md:grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">QR code</p>
                    {qrDataUrl && (
                      <a
                        href={qrDataUrl}
                        download={`qr-${lastShortCode || 'short-link'}.png`}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Download
                      </a>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-center rounded-xl border border-border bg-white p-4">
                    {qrDataUrl ? (
                      <img src={qrDataUrl} alt="QR code" className="h-40 w-40" />
                    ) : (
                      <div className="text-sm text-muted-foreground">Generating…</div>
                    )}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium">Analytics</p>
                    {lastShortCode && (
                      <button
                        type="button"
                        onClick={() => fetchStats(lastShortCode)}
                        className="text-xs font-medium text-primary hover:underline"
                      >
                        Refresh
                      </button>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-border bg-background px-3 py-3">
                      <p className="text-xs text-muted-foreground">Clicks</p>
                      <p className="font-display mt-1 text-lg font-semibold tracking-tight">
                        {stats?.clicks ?? 0}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border bg-background px-3 py-3">
                      <p className="text-xs text-muted-foreground">Expiry</p>
                      <p className="mt-1 text-sm font-medium">
                        {lastExpiresAt ? format(new Date(lastExpiresAt), 'PPP') : 'Never'}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs font-medium text-muted-foreground">Recent clicks</p>
                    <div className="mt-2 space-y-2">
                      {(stats?.clickEvents ?? []).slice(0, 3).map((e) => {
                        const refHost = (() => {
                          if (!e.referrer) return 'Direct';
                          try {
                            return new URL(e.referrer).host;
                          } catch {
                            return 'Direct';
                          }
                        })();

                        return (
                          <div key={e.id} className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background px-3 py-2">
                            <p className="truncate text-sm">{refHost}</p>
                            <p className="shrink-0 text-xs text-muted-foreground">
                              {formatDistanceToNowStrict(new Date(e.created_at), { addSuffix: true })}
                            </p>
                          </div>
                        );
                      })}
                      {(!stats || stats.clickEvents.length === 0) && (
                        <div className="rounded-xl border border-border bg-background px-3 py-3 text-sm text-muted-foreground">
                          No clicks yet.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  if (variant === 'card') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-display font-semibold tracking-tight">Shorten URL</CardTitle>
          <CardDescription>Enter a long URL to create a shortened version.</CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }

  return content;
} 
