import {ReactNode} from 'react';

export default function Layout(props: {children: ReactNode}) {
    return (
        <main className="flex gap-8 items-center justify-between px-12 pt-4 max-w-[1642px] w-full mx-auto">
            {props.children}
        </main>
    )
}
