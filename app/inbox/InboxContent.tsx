'use client'

import {useContext} from 'react';
import Link from 'next/link';
import ConversationContext from '../../contexts/ConversationContext';

// Components
import InboxSidebarItem from './InboxSidebarItem';
import InboxMessage from './InboxMessage';
import MessageInput from './MessageInput';
import Input from '../../components/Input';


export default function InboxContent(props: {username?: string}) {
    const {conversations} = useContext(ConversationContext);

    const conversation = props.username
        ? conversations.find(c => c.otherName === props.username)
        : conversations[0];

    return (
        // TODO: hacky?
        <div className="container flex pt-4 pb-12 h-[calc(100%_-_56px)]">
            <aside className="border-r border-content-secondary bg-content-tertiary rounded-l overflow-clip flex-none w-72">
                <div className="flex items-center bg-content-secondary py-1 px-4 h-14">
                    <Input />
                </div>
                <div className="divide-y divide-content-secondary">
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
                <div className="flex items-center bg-content-secondary py-3 px-4 text-lg h-14 flex-none">
                    <Link href={`/profile/${props.username ?? conversation!.otherName}`} className="hover:text-blue-500">
                        {props.username ?? conversation!.otherName}
                    </Link>
                </div>
                <div className="flex-grow overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-secondary pt-2 flex flex-col">
                    {conversation && (
                        <>
                            {conversation.messages.map((message) => (
                                <InboxMessage {...message} key={message.username + message.createdAt} />
                            ))}
                        </>
                    )}
                    <MessageInput otherName={props.username ?? conversation!.otherName} />
                </div>
            </div>
        </div>
    )
}
