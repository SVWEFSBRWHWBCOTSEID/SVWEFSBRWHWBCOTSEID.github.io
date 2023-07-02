'use client'

import {useState} from 'react';
import {revalidateTag} from 'next/cache';
import Link from 'next/link';
import {signIn} from 'next-auth/react';
import {useRouter, useSearchParams} from 'next/navigation';


export default function LoginPanel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberLogin, setRememberLogin] = useState(true);

    const [error, setError] = useState(false);

    const {replace} = useRouter();
    const params = useSearchParams();

    async function attemptSignIn() {
        const res = await signIn('credentials', {redirect: false, username, password});
        if (!res?.ok) return setError(true);
        console.log(params.get('callbackUrl'))
        replace(/* params.get('callbackUrl') ?? */ '/');
        // revalidateTag('user');
    }

    return (
        <main className="bg-content rounded py-10 px-12 w-96 flex flex-col">
            <h1 className="text-4xl font-light mb-6">Sign in</h1>

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
                className="px-4 py-2 rounded bg-content-tertiary border border-tertiary mb-4 invalid:border-red-500 focus:outline-none focus:ring-[3px] transition duration-100"
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
                <p className="text-red-500 text-sm mt-4">Invalid username or password.</p>
            )}

            <button
                className="rounded bg-blue-500 uppercase px-4 py-2.5 font-medium mt-8 mb-2 disabled:opacity-50 hover:bg-[#56a3eb] disabled:hover:bg-blue-500 transition duration-100"
                disabled={!username || !password}
                onClick={attemptSignIn}
            >
                Sign in
            </button>
            <div className="flex gap-2 text-sm text-secondary">
                <input
                    type="checkbox"
                    name="remember-login"
                    id="remember-login"
                    checked={rememberLogin}
                    onChange={(e) => setRememberLogin(e.target.checked)}
                />
                <label htmlFor="remember-login">Keep me signed in</label>
            </div>

            <p className="mt-4 text-secondary text-sm">
                Don't have an account? <Link href="/signup" className="text-blue-500 hover:underline">Create one.</Link>
            </p>
        </main>
    )
}
