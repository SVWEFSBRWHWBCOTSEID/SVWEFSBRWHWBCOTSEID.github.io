import {NextRequest, NextResponse} from 'next/server';


export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/profile') {
        // TODO: if not authed, redirect to /login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
        // TODO: if authed, redirect to home
    }
}

export const config = {
    matcher: ['/profile', '/login', '/signup'],
}
