import Link from 'next/link';


export default function InboxSidebarItem(props: {green?: boolean}) {
    return (
        <Link href="/inbox/qpwoeirut" className={'flex items-center px-4 py-2 gap-3' + (props.green ? ' bg-theme-green/50' : '')}>
            {false ? (
                // TODO
                <img
                    src="/pfp.png"
                    className="w-10 h-10 rounded-full object-cover object-center"
                    alt="qpwoeirut"
                />
            ) : (
                <div className="w-10 h-10 rounded-full flex-none bg-background flex items-center justify-center text-secondary/50 text-2xl font-medium">
                    Q
                </div>
            )}
            <div>
                <h3>qpwoeirut</h3>
                <p className={'text-sm ' + (props.green ? 'text-primary' : 'text-secondary')}>
                    Hello!
                </p>
            </div>
        </Link>
    )
}
