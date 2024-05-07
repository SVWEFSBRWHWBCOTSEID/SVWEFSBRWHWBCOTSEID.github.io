'use client'

import { useContext, useMemo } from 'react';
import Link from 'next/link';
import { DateTime } from 'luxon';

// Components
import InboxMessage, { Message } from './InboxMessage';
import MessageInput from './MessageInput';

// Contexts
import ConversationContext from '@/contexts/ConversationContext';

// Icons
import { RiSwordFill } from 'react-icons/ri';


export default function InboxContent(props: { username?: string }) {
    const { conversations } = useContext(ConversationContext);

    const conversation = props.username
        ? conversations.find(c => c.otherName === props.username)
        : conversations[0];
    const name = props.username ?? conversation?.otherName;

    // Group conversation messages by date
    const grouped = useMemo(() => {
        const res: { [key: string]: Message[] } = {};
        if (!conversation) return res;

        for (const message of conversation.messages) {
            const date = DateTime.fromSQL(message.createdAt).toLocaleString(DateTime.DATE_FULL);
            if (!res[date]) res[date] = [];
            res[date].push(message);
        }

        return res;
    }, [conversation?.messages])

    return (
        <>
            <div className="flex items-center justify-between bg-content-secondary py-3 px-6 text-lg h-14 flex-none">
                {name && (
                    <>
                        <Link href={`/profile/${name}`} className="hover:text-theme-blue">
                            {name}
                        </Link>
                        <Link href={`/?challenge=${name}`} className="text-secondary hover:text-theme-blue">
                            <RiSwordFill />
                        </Link>
                    </>
                )}
            </div>
            <div className="flex-grow overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-secondary pt-2 flex flex-col">
                {Object.entries(grouped).map(([date, messages]) => (
                    <div key={date}>
                        <h3 className="flex items-center text-xs text-secondary pt-3 pb-2 px-4 select-none">
                            <hr className="flex-grow border-tertiary" />
                            <span className="px-2">{date}</span>
                            <hr className="flex-grow border-tertiary" />
                        </h3>

                        {messages.map((message) => (
                            <InboxMessage {...message} key={message.username + message.createdAt} />
                        ))}
                    </div>
                ))}
                {name && <MessageInput otherName={name} />}
            </div>
        </>
    )
}
