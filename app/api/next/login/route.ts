import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import type {User} from '../../../../contexts/ProfileContext';


// POST handler to redirect cookies from `/api/login` and make them same-site, as well as add custom cookies
// for frontend convenience.
export async function POST(request: Request) {
    const res = await fetch(`${process.env.API_BASE}/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: request.body
    });
    if (!res.ok) return res;

    const user: User = await res.json();
    cookies().set('username', user.username);
    cookies().set('id', res.headers.get('set-cookie')!.match(/id=(.+?);/)![1]); // TODO: didn't have to do this before

    return NextResponse.json(user);
}
