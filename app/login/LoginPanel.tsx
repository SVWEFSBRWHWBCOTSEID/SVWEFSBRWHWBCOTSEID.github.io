'use client'

import { FormEvent, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Components
import BlueButton from '@/components/BlueButton';
import Input from '@/components/Input';

// Contexts
import UserContext from '@/contexts/UserContext';

// Utils
import type { User } from '@/contexts/ProfileContext';


export default function LoginPanel(props: { callbackUrl?: string }) {
    const { setUser } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberLogin, setRememberLogin] = useState(true);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const router = useRouter();

    async function signIn(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);

        const res = await fetch(`${process.env.API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        });
        if (!res.ok) {
            setLoading(false);
            return setError(true);
        }

        const user: User = await res.json();

        setUser(user);
        router.replace(props.callbackUrl ?? '/');
    }

    return (
        <form
            className="bg-content rounded py-10 px-12 w-96 flex flex-col"
            onSubmit={signIn}
        >
            <h1 className="text-4xl font-light mb-6">Sign in</h1>

            <label htmlFor="username" className="mb-1 text-secondary font-semibold text-sm">
                Username
            </label>
            <Input
                required
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-4 invalid:border-red-500"
            />

            <label htmlFor="password" className="mb-1 text-secondary font-semibold text-sm">
                Password
            </label>
            <Input
                required
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="invalid:border-red-500"
            />

            {error && (
                <p className="text-red-500 text-sm mt-4">Invalid username or password.</p>
            )}

            <BlueButton
                className="mt-8 mb-2"
                disabled={!username || !password || loading}
                type="submit"
            >
                Sign in
            </BlueButton>
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
                Don't have an account? <Link href="/signup" className="text-theme-blue hover:underline">Create one.</Link>
            </p>
        </form>
    )
}
