import {ReactNode} from 'react';


export default function StickySidebar(props: {children: ReactNode}) {
    return (
        <aside className="sticky top-4 flex-none pl-8 py-4 h-max hidden md:block">
            {props.children}
        </aside>
    )
}
