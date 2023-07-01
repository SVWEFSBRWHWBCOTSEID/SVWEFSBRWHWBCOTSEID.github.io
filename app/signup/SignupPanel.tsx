'use client'

import {useState} from 'react';
import {revalidateTag} from 'next/cache';


export default function SignupPanel() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);

    async function register() {
        const res = await fetch('http://localhost:8080/api/user/new', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: username, password})
        });
        console.log(res)
        // TODO: if (!res.ok) return setError(true);
        // revalidateTag('user');
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
                onClick={register}
            >
                Register
            </button>
        </main>
    )
}
