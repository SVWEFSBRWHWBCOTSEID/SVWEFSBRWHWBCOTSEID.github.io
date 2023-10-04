import Link from 'next/link';
import ProfileImagePlaceholder from '../../components/ProfileImagePlaceholder';


export type Message = {
    username: string,
    text: string,
    createdAt: string // SQL date
}
export default function InboxMessage(props: Message) {
    return (
        <div className="px-6 py-3 flex gap-4">
            {false ? (
                // TODO
                <img
                    src="/pfp.png"
                    className="w-14 h-14 rounded-full object-cover object-center"
                    alt={props.username}
                />
            ) : (
                <ProfileImagePlaceholder
                    name={props.username}
                    className="w-14 h-14 text-3xl"
                />
            )}
            <div className="flex-grow">
                <h5 className="flex justify-between items-center font-medium mb-1.5">
                    <Link href={`/profile/${props.username}`}>
                        {props.username}
                    </Link>
                    <span className="text-xs font-normal text-secondary">Today at 12:45 PM</span> {/* TODO */}
                </h5>
                <p className="text-sm text-primary">
                    {props.text}
                </p>
            </div>
        </div>
    )
}
