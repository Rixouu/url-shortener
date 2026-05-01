import { describe, expect, it, vi } from "vitest";

describe("url-service", () => {
  it("generates a short code with requested length", async () => {
    const svc = await import("./url-service");
    const code = svc.generateShortCode(10);
    expect(code).toHaveLength(10);
  });

  it("creates a short URL and can retrieve it by code", async () => {
    vi.resetModules();
    const svc = await import("./url-service");

    const created = await svc.createShortUrl("https://example.com/path");
    expect(created).not.toBeNull();
    expect(created!.url).toBe("https://example.com/path");
    expect(created!.short_code).toBeTruthy();

    const fetched = await svc.getShortUrl(created!.short_code);
    expect(fetched).not.toBeNull();
    expect(fetched!.id).toBe(created!.id);
  });

  it("stores expiry when provided", async () => {
    vi.resetModules();
    const svc = await import("./url-service");

    const expiresAt = new Date(Date.now() + 60_000);
    const created = await svc.createShortUrl("https://example.com", undefined, undefined, undefined, expiresAt);
    expect(created).not.toBeNull();
    expect(created!.expires_at).toBe(expiresAt.toISOString());
  });

  it("rejects duplicate custom codes", async () => {
    vi.resetModules();
    const svc = await import("./url-service");
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const first = await svc.createShortUrl("https://example.com/a", "my-code");
    expect(first).not.toBeNull();
    const second = await svc.createShortUrl("https://example.com/b", "my-code");
    expect(second).toBeNull();
    errSpy.mockRestore();
  });

  it("records clicks and exposes click events limited and sorted", async () => {
    vi.resetModules();
    const svc = await import("./url-service");

    const created = await svc.createShortUrl("https://example.com/a", "click-test");
    expect(created).not.toBeNull();

    await svc.recordClick(created!.id, "https://ref.one", "ua-1");
    await new Promise((r) => setTimeout(r, 5));
    await svc.recordClick(created!.id, "https://ref.two", "ua-2");
    await new Promise((r) => setTimeout(r, 5));
    await svc.recordClick(created!.id, undefined, "ua-3");

    const updated = await svc.getShortUrl("click-test");
    expect(updated).not.toBeNull();
    expect(updated!.clicks).toBe(3);

    const events = await svc.getClickEventsForShortUrl(created!.id, 2);
    expect(events).toHaveLength(2);
    expect(new Date(events[0].created_at).getTime()).toBeGreaterThanOrEqual(
      new Date(events[1].created_at).getTime()
    );
  });
});
