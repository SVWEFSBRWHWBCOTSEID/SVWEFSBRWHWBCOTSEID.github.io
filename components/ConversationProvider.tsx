'use client'

import { ReactNode, useState } from 'react';
import ConversationContext from '../contexts/ConversationContext';
import type { Conversation } from '../app/inbox/InboxSidebarItem';


export default function ConversationProvider(props: { children: ReactNode }) {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    return (
        <ConversationContext.Provider value={{ conversations, setConversations }}>
            {props.children}
        </ConversationContext.Provider>
    )
}
