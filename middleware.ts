import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    if (request?.cookies?._parsed?.get("_jwtToken")?.value) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
    matcher: [
        '/admin',
        '/admin/(.*)',
    ],
}