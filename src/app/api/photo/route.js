import { NextResponse } from 'next/server';
import { getCorsHeaders, handleOptions } from '@/lib/cors';

export async function OPTIONS(request) {
    return handleOptions(request);
}

export async function GET(request) {
    const corsHeaders = getCorsHeaders(request);
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return new Response('Missing url parameter', { status: 400, headers: corsHeaders });
        }

        // Only allow proxying from vercel-storage.com to prevent SSRF vulnerability to internal assets
        if (!url.startsWith('https://') || !url.includes('vercel-storage.com')) {
            return new Response('Invalid URL source target', { status: 403, headers: corsHeaders });
        }

        const token = process.env.BLOB_READ_WRITE_TOKEN;
        if (!token) {
            return new Response('Blob token is not configured on server', { status: 500, headers: corsHeaders });
        }

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            return new Response(`Failed to fetch blob source: ${response.statusText}`, { status: response.status, headers: corsHeaders });
        }

        const contentType = response.headers.get('content-type') || 'image/jpeg';
        const buffer = await response.arrayBuffer();

        return new Response(buffer, {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                ...corsHeaders
            }
        });
    } catch (err) {
        console.error('Photo proxy error:', err);
        return new Response('Server Error', { status: 500, headers: corsHeaders });
    }
}
