'use client'

import { ReactNode, useLayoutEffect, useState } from 'react';
import UserContext from '@/contexts/UserContext';

// Utils
import type { User } from '@/contexts/ProfileContext';
import { getUser } from '@/util/user';


export default function UserProvider(props: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // If there is a username cookie set, parse the user object from it
    // TODO: flash of unauthed content
    useLayoutEffect(() => {
        const username = document.cookie.match(/username=(.+?)(?:;|$)/)?.[1];
        if (!username) return;
        void getUser(username).then((user) => setUser(user));
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
