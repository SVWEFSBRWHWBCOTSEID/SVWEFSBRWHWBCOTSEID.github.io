import Link from 'next/link';
import {useParams} from 'next/navigation';
import type {Message} from './InboxMessage';


export type Conversation = {
    otherName: string,
    messages: Message[]
}
export default function InboxSidebarItem(props: Conversation & {default?: boolean}) {
    const {username} = useParams();
    const active = props.default && !username || props.otherName === username;

    return (
        <Link
            href={`/inbox/${props.otherName}`}
            className={'flex items-center px-4 py-2 gap-3' + (active ? ' bg-theme-green/50' : '')}
        >
            {false ? (
                // TODO
                <img
                    src="/pfp.png"
                    className="w-10 h-10 rounded-full object-cover object-center"
                    alt={props.otherName}
                />
            ) : (
                <div className="w-10 h-10 rounded-full flex-none bg-background flex items-center justify-center text-secondary/50 text-2xl font-medium">
                    {props.otherName[0].toUpperCase()}
                </div>
            )}
            <div>
                <h3 className={active ? '' : 'text-primary'}>{props.otherName}</h3>
                <p className={'text-sm line-clamp-1 ' + (active ? 'text-primary' : 'text-secondary')}>
                    {props.messages.at(-1)!.text}
                </p>
            </div>
        </Link>
    )
}
