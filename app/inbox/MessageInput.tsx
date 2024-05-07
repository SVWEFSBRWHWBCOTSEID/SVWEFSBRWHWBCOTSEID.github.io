'use client'

import { useContext, useState } from 'react';
import ProfilePicture from '@/components/ProfilePicture';
import UserContext from '@/contexts/UserContext';


export default function MessageInput(props: { otherName: string }) {
    const { user } = useContext(UserContext);
    const [message, setMessage] = useState('');

    async function sendMessage() {
        if (!message) return;
        await fetch(`${process.env.API_BASE}/message/${props.otherName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ message })
        });
        setMessage('');
    }

    function scrollIntoView(e: HTMLDivElement | null) {
        e?.scrollIntoView(false);
    }

    return (
        <div className="flex gap-4 mt-auto px-6 pt-12 pb-6" ref={scrollIntoView}>
            <ProfilePicture
                user={user}
                className="w-14 h-14 text-3xl"
            />
            <div className="flex-grow flex flex-col gap-2">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please be kind and respectful in your messages."
                    className="rounded bg-content-secondary px-4 py-3 h-36 placeholder:text-secondary text-sm"
                />
                <button className="bg-theme-green px-12 py-2 rounded w-max" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    )
}
