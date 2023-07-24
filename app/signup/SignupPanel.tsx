'use client'

import {startTransition, useState} from 'react';
import {useRouter} from 'next/navigation';
import {getUser} from '../../util/user';
import {revalidate} from '../../util/actions';


export default function SignupPanel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const {replace, refresh} = useRouter();

    async function register() {
        setLoading(true);

        const res = await fetch(`${process.env.API_BASE}/user/new`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({username, password})
        });
        if (!res.ok) {
            setLoading(false);
            return setError(true);
        }

        // Revalidate cached user object
        startTransition(() => void revalidate(`user-${username}`));

        replace('/');
        refresh();
    }

    async function validateUsername() {
        startTransition(() => void getUser(username).then((user) => setError(!!user)));
    }

    return (
        <main className="bg-content rounded py-10 px-12 w-96 flex flex-col">
            <h1 className="text-4xl font-light mb-6">Register</h1>

            <label htmlFor="username" className="mb-1 text-secondary font-semibold text-sm">
                Username
            </label>
            <input
                required
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={validateUsername}
                className={'px-4 py-2 rounded bg-content-tertiary border border-tertiary mb-4 focus:outline-none focus:ring-[3px] transition duration-100 ' + (error ? 'border-red-500' : 'invalid:border-red-500')}
            />

            <label htmlFor="password" className="mb-1 text-secondary font-semibold text-sm">
                Password
            </label>
            <input
                required
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded bg-content-tertiary border border-tertiary invalid:border-red-500 focus:outline-none focus:ring-[3px] transition duration-100"
            />

            {error && (
                <p className="text-red-500 text-sm mt-4">That username is already taken.</p>
            )}

            <button
                className="rounded bg-blue-500 uppercase px-4 py-2.5 font-medium mt-8 mb-2 disabled:opacity-50 hover:bg-[#56a3eb] disabled:hover:bg-blue-500 transition duration-100"
                disabled={!username || !password || loading}
                onClick={register}
            >
                Register
            </button>
        </main>
    )
}
