import { NextRequest, NextResponse } from 'next/server';
import { createShortUrl } from '@/lib/url-service';
import * as z from 'zod';

const shortenSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid URL' }),
  customCode: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  expiresAt: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input data
    const result = shortenSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input data', details: result.error.format() },
        { status: 400 }
      );
    }
    
    const { url, customCode, title, description, expiresAt } = result.data;
    
    // Create short URL
    const shortUrl = await createShortUrl(
      url,
      customCode,
      title,
      description,
      expiresAt ? new Date(expiresAt) : undefined
    );
    
    if (!shortUrl) {
      return NextResponse.json(
        { error: 'Failed to create short URL' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ 
      shortCode: shortUrl.short_code,
      url: shortUrl.url,
      id: shortUrl.id 
    });
    
  } catch (error) {
    console.error('Error creating short URL:', error);
    
    if (error instanceof Error && error.message === 'Custom code already in use') {
      return NextResponse.json(
        { error: 'Custom code already in use. Please choose a different one.' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 