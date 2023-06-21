import {ReactNode} from 'react';


export default function StickySidebar(props: {children: ReactNode}) {
    return (
        <aside className="sticky top-0 flex-none pl-8 pr-10 py-4 border-r border-tertiary">
            {props.children}
        </aside>
    )
}
