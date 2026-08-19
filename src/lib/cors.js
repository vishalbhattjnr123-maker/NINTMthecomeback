import { NextResponse } from 'next/server';

export function getCorsHeaders(request) {
    const origin = request.headers.get('origin') || '';
    const allowedOrigin = process.env.ALLOWED_ORIGIN || '';

    const allowedOrigins = [
        'http://localhost:3000',
        'http://localhost:3001',
        allowedOrigin.trim()
    ].filter(Boolean);

    let matchOrigin = '';
    if (allowedOrigins.includes(origin)) {
        matchOrigin = origin;
    } else if (allowedOrigins.some(o => origin.startsWith(o))) {
        matchOrigin = origin;
    } else if (!origin) {
        // Fallback for direct browser url typing or non-browser servers
        matchOrigin = '';
    } else {
        matchOrigin = allowedOrigin || 'http://localhost:3000';
    }

    return {
        'Access-Control-Allow-Origin': matchOrigin,
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Allow-Credentials': 'true'
    };
}

export function handleOptions(request) {
    return new NextResponse(null, {
        status: 204,
        headers: getCorsHeaders(request)
    });
}
