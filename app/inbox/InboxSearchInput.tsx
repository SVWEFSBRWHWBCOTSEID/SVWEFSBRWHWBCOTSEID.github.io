'use client'

import { useContext, useState } from 'react';
import Link from 'next/link';
import { Combobox } from '@headlessui/react';
import ConversationContext from '../../contexts/ConversationContext';


// TODO: support lookup of random users
export default function InboxSearchInput() {
    const [query, setQuery] = useState('');

    const { conversations } = useContext(ConversationContext);
    const filteredConversations = query === ''
        ? conversations
        : conversations.filter((c) => c.otherName.toLowerCase().includes(query.toLowerCase()));

    return (
        <Combobox
            as="div"
            className="relative w-full"
        >
            <Combobox.Input
                className="rounded-full w-full px-4 py-1.5 bg-content-tertiary border border-tertiary focus:outline-none focus:ring-[3px] placeholder:text-secondary/50 placeholder:text-sm"
                placeholder="Search or start a new conversation"
                onChange={(e) => setQuery(e.target.value)}
            />
            <Combobox.Options className="absolute top-[calc(100%_+_6px)] w-full flex flex-col py-1.5 text-secondary bg-background rounded shadow-lg z-10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/25">
                {!filteredConversations.length ? (
                    <p className="py-5 text-center text-sm italic text-secondary">
                        No users found.
                    </p>
                ) : filteredConversations.map((c) => (
                    <Link
                        href={`/inbox/${c.otherName}`}
                        key={c.otherName}
                        className="hover:bg-theme-blue hover:text-white"
                    >
                        <Combobox.Option value="" className="px-4 py-1">
                            {c.otherName}
                        </Combobox.Option>
                    </Link>
                ))}
            </Combobox.Options>
        </Combobox>
    )
}
