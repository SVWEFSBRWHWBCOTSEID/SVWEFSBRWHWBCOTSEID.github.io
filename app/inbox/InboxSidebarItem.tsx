import Link from 'next/link';
import {useParams} from 'next/navigation';
import ProfileImagePlaceholder from '../../components/ProfileImagePlaceholder';
import type {Message} from './InboxMessage';


export type Conversation = {
    otherName: string,
    messages: Message[]
}
export default function InboxSidebarItem(props: Conversation & {default?: boolean}) {
    const {username} = useParams();
    const active = props.default && !username
        || typeof username === 'string' && props.otherName === decodeURIComponent(username);

    return (
        <Link
            href={`/inbox/${props.otherName}`}
            className={'flex items-center px-4 py-2 gap-3 transition duration-100 ' + (active ? 'bg-theme-green/50' : 'hover:bg-content')}
        >
            {false ? (
                // TODO
                <img
                    src="/pfp.png"
                    className="w-10 h-10 rounded-full object-cover object-center"
                    alt={props.otherName}
                />
            ) : (
                <ProfileImagePlaceholder
                    name={props.otherName}
                    className="w-10 h-10 text-2xl"
                />
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
