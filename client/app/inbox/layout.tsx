'use client'

import { ReactNode, useContext } from 'react';

// Components
import InboxSearchInput from './InboxSearchInput';
import InboxSidebarItem from './InboxSidebarItem';

// Contexts
import ConversationContext from '../../contexts/ConversationContext';


export default function Layout(props: { children: ReactNode }) {
    const { conversations } = useContext(ConversationContext);

    return (
        <div className="container flex pt-4 pb-12 h-[calc(100%_-_56px)]">
            <aside className="flex flex-col bg-content-tertiary rounded-l overflow-clip flex-none w-80">
                <div className="border-r border-tertiary flex items-center bg-content-secondary py-1 px-4 h-14 flex-none">
                    <InboxSearchInput />
                </div>
                <div className="divide-y divide-content-secondary flex-grow border-r border-content-secondary overflow-auto scrollbar:hidden">
                    {conversations.map((conversation, i) => (
                        <InboxSidebarItem
                            {...conversation}
                            default={i === 0}
                            key={conversation.otherName}
                        />
                    ))}
                </div>
            </aside>
            <div className="bg-content flex-grow rounded-r overflow-clip flex flex-col">
                {props.children}
            </div>
        </div>
    )
}
