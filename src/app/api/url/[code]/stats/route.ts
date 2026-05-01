import { NextRequest, NextResponse } from "next/server";
import { getClickEventsForShortUrl, getShortUrl } from "@/lib/url-service";
import * as z from "zod";

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const shortUrl = await getShortUrl(code);
  if (!shortUrl) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const parsed = querySchema.safeParse(
    Object.fromEntries(request.nextUrl.searchParams.entries())
  );
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query params", details: parsed.error.format() },
      { status: 400 }
    );
  }

  const clickEvents = await getClickEventsForShortUrl(
    shortUrl.id,
    parsed.data.limit ?? 25
  );

  return NextResponse.json({
    id: shortUrl.id,
    shortCode: shortUrl.short_code,
    url: shortUrl.url,
    clicks: shortUrl.clicks,
    createdAt: shortUrl.created_at,
    expiresAt: shortUrl.expires_at ?? null,
    clickEvents,
  });
}

