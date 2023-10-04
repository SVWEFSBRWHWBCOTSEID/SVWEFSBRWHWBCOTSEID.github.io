// TODO: extract entire `<ProfileImage>` component once pfp is figured out
export default function ProfileImagePlaceholder(props: {name: string, className?: string}) {
    return (
        <div className={'select-none rounded-full flex-none bg-background flex items-center justify-center text-secondary/50 font-medium' + (props.className ? ` ${props.className}` : '')}>
            {props.name[0].toUpperCase()}
        </div>
    )
}
