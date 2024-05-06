'use client'

import { ReactNode, startTransition, useLayoutEffect, useState } from 'react';
import UserContext from '../contexts/UserContext';
import { getUser } from '../util/user';
import type { User } from '../contexts/ProfileContext';


export default function UserProvider(props: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // If there is a username cookie set, parse the user object from it
    // TODO: flash of unauthed content
    useLayoutEffect(() => {
        const username = document.cookie.match(/username=(.+?)(?:;|$)/)?.[1];
        if (!username) return;
        startTransition(() => void getUser(username).then((user) => setUser(user)));
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
