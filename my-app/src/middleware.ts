// middleware.js
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req : NextRequest) {
    const { pathname } = req.nextUrl;

    
    // Skip middleware for public pages (e.g., login)
    if (pathname.startsWith('/login') || pathname.startsWith('/public')) {
        return NextResponse.next();
    }

   

    // if (pathname.match('/')) {
    //     return NextResponse.redirect(new URL('/home', req.url))
    // }
    // Continue to the requested page
    return NextResponse.next();
}

// Apply middleware only to protected routes
export const config = {
    matcher: ['/dashboard', '/'],
};
