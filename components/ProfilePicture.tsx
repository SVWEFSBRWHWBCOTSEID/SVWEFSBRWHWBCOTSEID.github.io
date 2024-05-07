import type { User } from '@/contexts/ProfileContext';


type ProfilePictureProps = {
    user: User | null,
    className?: string
}
export default function ProfilePicture(props: ProfilePictureProps) {
    return !props.user ? (
        <div className={'rounded-full flex-none bg-background animate-pulse' + (props.className ? ` ${props.className}` : '')} />
    ) : props.user.profile.imageUrl ? (
        <img
            src={props.user.profile.imageUrl}
            className={'rounded-full object-cover object-center' + (props.className ? ` ${props.className}` : '')}
            alt={props.user.username}
        />
    ) : (
        <div className={'select-none rounded-full flex-none bg-background flex items-center justify-center text-secondary/50 font-medium' + (props.className ? ` ${props.className}` : '')}>
            {props.user.username[0].toUpperCase()}
        </div>
    )
}
