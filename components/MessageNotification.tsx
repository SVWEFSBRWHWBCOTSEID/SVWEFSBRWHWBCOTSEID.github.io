import { startTransition, useLayoutEffect, useState } from 'react';
import Link from 'next/link';

// Components
import ProfilePicture from './ProfilePicture';

// Utils
import type { User } from '@/contexts/ProfileContext';
import type { Message } from '@/app/inbox/InboxMessage';
import { getUser } from '@/util/user';


// TODO: transition?
export default function MessageNotification(props: Message) {
    // TODO: better way of loading this?
    const [user, setUser] = useState<User | null>(null);
    useLayoutEffect(() => {
        startTransition(() => void getUser(props.username).then(user => setUser(user)))
    }, []);

    return (
        <Link
            href={`/inbox/${props.username}`}
            className="bg-content flex gap-4 rounded shadow-xl px-4 py-3 w-80 hover:bg-content-secondary transition duration-200"
        >
            <ProfilePicture
                user={user}
                className="w-14 h-14 text-3xl"
            />
            <div>
                <h5>{props.username}</h5>
                <p className="text-sm text-secondary line-clamp-2">
                    {props.text}
                </p>
            </div>
        </Link>
    )
}
