import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
    // Redirect authed requests to `/profile` to `/profile/username`, and unauthed to `/login`
    if (request.nextUrl.pathname === '/profile') {
        const username = request.cookies.get('username')?.value;
        if (!username) return NextResponse.redirect(new URL('/login', request.url));
        return NextResponse.redirect(new URL(`/profile/${username}`, request.url));
    }

    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
        // TODO: if authed, redirect to home
    }
}

export const config = {
    matcher: ['/profile', '/login', '/signup'],
}
