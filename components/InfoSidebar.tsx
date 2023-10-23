import {ReactNode} from 'react';


export default function InfoSidebar(props: {children: ReactNode}) {
    return (
        <aside className="flex flex-col py-1 text-secondary flex-none">
            {props.children}
        </aside>
    )
}
