'use client';

import { useState } from 'react';
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
import { format } from 'date-fns';
import { CalendarIcon, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  onSuccess?: (data: { shortCode: string; url: string }) => void;
}

export function ShortenUrlForm({ onSuccess }: ShortenUrlFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

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
      
      toast(`Your shortened URL is ready: ${shortUrl}`, {
        description: "URL successfully shortened!",
      });

      if (onSuccess) {
        onSuccess({ shortCode: result.shortCode, url: data.url });
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Shorten URL</CardTitle>
        <CardDescription>Enter a long URL to create a shortened version.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/long-url" {...field} />
                  </FormControl>
                  <FormDescription>Enter the URL you want to shorten.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="useCustomCode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Use custom URL code</FormLabel>
                    <FormDescription>
                      Create a custom short URL instead of a random one.
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
                    <FormLabel>Custom Code</FormLabel>
                    <FormControl>
                      <Input placeholder="my-custom-url" {...field} />
                    </FormControl>
                    <FormDescription>
                      This will create: {window.location.origin}/{field.value || 'my-custom-url'}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <Accordion type="single" collapsible>
              <AccordionItem value="advanced-options">
                <AccordionTrigger onClick={() => setShowAdvanced(!showAdvanced)}>
                  Advanced Options
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="My Website" {...field} />
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
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="A short description..." {...field} />
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
                          <FormLabel>Expiration Date (Optional)</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
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
                          <FormDescription>
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

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Shortening...' : 'Shorten URL'}
            </Button>
          </form>
        </Form>

        {lastResult && (
          <div className="mt-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Short Link</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors"
                  onClick={() => copyToClipboard(lastResult)}
                >
                  {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                  {copied ? 'Copied' : 'Copy'}
                </Button>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 shadow-sm">
                <div className="flex-1 font-mono text-sm text-primary truncate">
                  {lastResult}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 