import type {Message} from '../app/inbox/InboxMessage';
import ProfilePicture from './ProfilePicture';
import Link from 'next/link';


// TODO: transition?
export default function MessageNotification(props: Message) {
    return (
        <Link
            href={`/inbox/${props.username}`}
            className="bg-content flex gap-4 rounded shadow-xl px-4 py-3 w-80 hover:bg-content-secondary transition duration-200"
        >
            <ProfilePicture
                user={props.user}
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
