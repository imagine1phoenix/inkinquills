import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get('image') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    const blob = await put(`hh-goa-2026-${Date.now()}.png`, file, { 
      access: 'public',
      contentType: 'image/png'
    });
    
    // We encode the URL to base64 to act as an ID that doesn't require a DB lookup
    const id = Buffer.from(blob.url).toString('base64url');
    
    return NextResponse.json({ id, url: blob.url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
