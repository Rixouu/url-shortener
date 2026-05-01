import { ShortenUrlForm } from '@/components/url/shorten-url-form';
import { PWAInstallBanner } from '@/components/PWAInstallBanner';
import { BarChart3, Link2, List, User } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="relative mx-auto w-full max-w-5xl px-4 py-10 md:py-14">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="md:hidden -mx-4">
          <div className="min-h-[100svh] bg-[#0F172A] text-[#F8FAFC]">
            <div className="px-5 pt-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm shadow-primary/20">
                    <Link2 className="h-5 w-5" strokeWidth={2.25} />
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-[0.2em] text-white/60 uppercase">URL Shortener</p>
                    <p className="font-display text-lg leading-tight tracking-tight">Shorten</p>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-[11px] font-medium tracking-widest text-white/70 uppercase">Link tools</span>
                </div>
              </div>

              <div className="relative mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#111827] to-[#0B1220] px-6 pb-6 pt-7">
                <div className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -right-12 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />

                <div className="relative">
                  <h1 className="font-display text-[34px] leading-[1.03] tracking-tight">
                    Make it <span className="text-primary">shorter.</span>
                  </h1>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                    Paste any URL and get a clean, trackable short link in seconds.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative -mt-5 rounded-t-[32px] bg-background px-5 pb-24 pt-6 text-foreground shadow-[0_-18px_50px_rgba(0,0,0,0.35)]">
              <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-muted" />

              <div className="grid grid-cols-4 gap-2 pb-2">
                <button className="rounded-2xl border border-border bg-secondary px-2 py-3 text-center">
                  <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Link2 className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-medium">Alias</p>
                </button>
                <button className="rounded-2xl border border-border bg-card px-2 py-3 text-center">
                  <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <User className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground">Account</p>
                </button>
                <button className="rounded-2xl border border-border bg-card px-2 py-3 text-center">
                  <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground">Track</p>
                </button>
                <button className="rounded-2xl border border-border bg-card px-2 py-3 text-center">
                  <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <List className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-medium text-muted-foreground">Links</p>
                </button>
              </div>

              <div className="mt-4">
                <ShortenUrlForm variant="panel" />
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">Recent links</p>
                  <button className="text-xs font-medium text-primary">View all</button>
                </div>

                <div className="mt-3 overflow-hidden rounded-2xl border border-border bg-card">
                  <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-sm text-foreground">sho.rt/launch24</p>
                      <p className="truncate text-xs text-muted-foreground">notion.so/company/product-launch-2024</p>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">2.4k</p>
                  </div>
                  <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-muted" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-sm text-foreground">sho.rt/x9kp2</p>
                      <p className="truncate text-xs text-muted-foreground">docs.google.com/presentation/d/1BxiM...</p>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">184</p>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <span className="h-2 w-2 rounded-full bg-muted" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-sm text-foreground">sho.rt/pricing</p>
                      <p className="truncate text-xs text-muted-foreground">mysite.com/pricing?ref=newsletter&utm...</p>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground">67</p>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 md:hidden">
                <div className="mx-auto max-w-5xl border-t border-border bg-background/90 px-6 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl">
                  <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                    <div className="flex flex-col items-center gap-1 text-primary">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                        <Link2 className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Shorten</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl">
                        <BarChart3 className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Analytics</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl">
                        <List className="h-4 w-4" />
                      </div>
                      <span className="font-medium">My links</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="font-medium">Account</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="grid overflow-hidden rounded-[28px] border border-border bg-card shadow-sm md:grid-cols-[320px_minmax(0,1fr)]">
            <aside className="relative overflow-hidden bg-gradient-to-b from-[#1E293B] to-[#0F172A] px-9 py-10 text-[#F8FAFC]">
              <div className="absolute -left-14 -top-14 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
              <div className="absolute -bottom-16 -right-12 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

              <div className="relative flex h-full flex-col">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white shadow-sm shadow-primary/20">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                </div>

                <h1 className="font-display text-3xl leading-tight tracking-tight">
                  URL
                  <br />
                  Shortener
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">
                  Short links, big impact. Premium analytics built in.
                </p>

                <div className="mt-8 space-y-4 text-sm">
                  <div className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium text-[#E2E8F0]">Custom aliases</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#94A3B8]">
                        Brand every link with your own slug.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium text-[#E2E8F0]">Click analytics</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#94A3B8]">
                        Referrers, devices, locations — all tracked.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium text-[#E2E8F0]">Link expiry</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#94A3B8]">
                        Set links to expire after a date.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <div>
                      <p className="font-medium text-[#E2E8F0]">QR generation</p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[#94A3B8]">
                        Auto-generate QR codes for every link.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-8">
                  <div className="flex gap-6 border-t border-white/10 pt-6">
                    <div>
                      <p className="font-display text-lg text-primary">2.4M</p>
                      <p className="mt-1 text-[11px] text-[#94A3B8]">Links created</p>
                    </div>
                    <div>
                      <p className="font-display text-lg text-primary">99.9%</p>
                      <p className="mt-1 text-[11px] text-[#94A3B8]">Uptime SLA</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <section className="bg-background px-10 py-10">
              <div className="max-w-xl">
                <p className="text-[11px] font-medium tracking-[0.2em] text-ring uppercase">Get started</p>
                <h2 className="font-display mt-2 text-3xl tracking-tight">Shorten a URL</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Paste any long URL and get a clean, trackable short link in seconds.
                </p>

                <div className="mt-8">
                  <ShortenUrlForm variant="panel" />
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 text-sm">
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </div>
                    <p className="font-medium">Custom codes</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">Branded links with your own aliases.</p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary text-primary">
                      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                      </svg>
                    </div>
                    <p className="font-medium">Detailed tracking</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      Track clicks, referrers, and audience insights.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <PWAInstallBanner />
    </main>
  );
}
