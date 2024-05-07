'use client'

import { ReactNode, useState } from 'react';
import UserContext from '@/contexts/UserContext';
import type { User } from '@/contexts/ProfileContext';


type UserProviderProps = {
    user: User | null,
    children: ReactNode
}
export default function UserProvider(props: UserProviderProps) {
    const [user, setUser] = useState(props.user);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {props.children}
        </UserContext.Provider>
    )
}
