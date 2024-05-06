'use client'

import { startTransition, useLayoutEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Components
import ProfilePicture from '../../components/ProfilePicture';

// Utils
import { getUser } from '../../util/user';
import type { User } from '../../contexts/ProfileContext';
import type { Message } from './InboxMessage';


export type Conversation = {
    otherName: string,
    messages: Message[]
}
export default function InboxSidebarItem(props: Conversation & { default?: boolean }) {
    const { username } = useParams();
    const active = props.default && !username
        || typeof username === 'string' && props.otherName === decodeURIComponent(username);

    // TODO: better way of loading this?
    const [user, setUser] = useState<User | null>(null);
    useLayoutEffect(() => {
        startTransition(() => void getUser(props.otherName).then(user => setUser(user)))
    }, []);

    return (
        <Link
            href={`/inbox/${props.otherName}`}
            className={'flex items-center px-4 py-2 gap-3 transition duration-100 ' + (active ? 'bg-theme-green/30' : 'hover:bg-content')}
        >
            <ProfilePicture
                user={user}
                className="w-10 h-10 text-2xl"
            />
            <div>
                <h3 className={active ? '' : 'text-primary'}>{props.otherName}</h3>
                <p className={'text-sm line-clamp-1 ' + (active ? 'text-primary' : 'text-secondary')}>
                    {props.messages.at(-1)!.text}
                </p>
            </div>
        </Link>
    )
}
