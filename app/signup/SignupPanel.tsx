'use client'

import {startTransition, useContext, useState} from 'react';
import {useRouter} from 'next/navigation';
import {getUser} from '../../util/user';
import {revalidate} from '../../util/actions';
import type {User} from '../../contexts/ProfileContext';

// Components
import BlueButton from '../../components/BlueButton';
import Input from '../../components/Input';

// Contexts
import UserContext from '../../contexts/UserContext';
import PreferencesContext from '../../contexts/PreferencesContext';


export default function SignupPanel() {
    const {setUser} = useContext(UserContext);
    const {preferences} = useContext(PreferencesContext);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const {replace} = useRouter();

    async function register() {
        setLoading(true);

        const res = await fetch(`${process.env.API_BASE}/user/new`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({username, password, preferences})
        });
        if (!res.ok) {
            setLoading(false);
            return setError(true);
        }

        const user: User = await res.json();

        // Revalidate cached user object
        startTransition(() => void revalidate(`user-${username}`));
        setUser(user);
        replace('/');
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
            <Input
                required
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={validateUsername}
                className={'mb-4 ' + (error ? 'border-red-500' : 'invalid:border-red-500')}
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
                <p className="text-red-500 text-sm mt-4">That username is already taken.</p>
            )}

            <BlueButton
                className="mt-8 mb-2"
                disabled={!username || !password || loading}
                onClick={register}
            >
                Register
            </BlueButton>
        </main>
    )
}
