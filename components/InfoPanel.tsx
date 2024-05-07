import type { ReactNode } from 'react';


export default function InfoPanel(props: { children: ReactNode }) {
    return (
        <div className="w-full bg-content px-16 py-10 shadow-md text-primary">
            {props.children}
        </div>
    )
}
