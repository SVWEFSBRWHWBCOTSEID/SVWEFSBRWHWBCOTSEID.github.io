'use client'

import {useContext, useMemo} from 'react';
import Link from 'next/link';
import {DateTime} from 'luxon';
import ConversationContext from '../../contexts/ConversationContext';

// Components
import InboxSidebarItem from './InboxSidebarItem';
import InboxMessage, {Message} from './InboxMessage';
import MessageInput from './MessageInput';
import Input from '../../components/Input';


export default function InboxContent(props: {username?: string}) {
    const {conversations} = useContext(ConversationContext);

    const conversation = props.username
        ? conversations.find(c => c.otherName === props.username)
        : conversations[0];
    const name = props.username ?? conversation?.otherName;

    // Group conversation messages by date
    const grouped = useMemo(() => {
        const res: {[key: string]: Message[]} = {};
        if (!conversation) return res;

        for (const message of conversation.messages) {
            const date = DateTime.fromSQL(message.createdAt).toLocaleString(DateTime.DATE_FULL);
            if (!res[date]) res[date] = [];
            res[date].push(message);
        }

        return res;
    }, [conversation?.messages])

    return (
        // TODO: hacky?
        <div className="container flex pt-4 pb-12 h-[calc(100%_-_56px)]">
            <aside className="flex flex-col bg-content-tertiary rounded-l overflow-clip flex-none w-72">
                <div className="border-r border-tertiary flex items-center bg-content-secondary py-1 px-4 h-14 flex-none">
                    <Input />
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
                <div className="flex items-center bg-content-secondary py-3 pl-6 pr-4 text-lg h-14 flex-none">
                    {name && (
                        <Link href={`/profile/${name}`} className="hover:text-blue-500">
                            {name}
                        </Link>
                    )}
                </div>
                <div className="flex-grow overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-secondary pt-2 flex flex-col">
                    {Object.entries(grouped).map(([date, messages]) => (
                        <div>
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
            </div>
        </div>
    )
}
