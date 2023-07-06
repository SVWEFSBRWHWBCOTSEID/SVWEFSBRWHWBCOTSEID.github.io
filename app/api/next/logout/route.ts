import {cookies} from 'next/headers';


export async function POST() {
    const res = await fetch(`${process.env.API_BASE}/logout`, {
        method: 'POST',
        credentials: 'include'
    });

    cookies().set({name: 'id', value: '', maxAge: 0});
    cookies().set({name: 'username', value: '', maxAge: 0});

    return res;
}
