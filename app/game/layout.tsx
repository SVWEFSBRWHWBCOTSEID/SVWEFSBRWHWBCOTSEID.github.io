import {ReactNode} from 'react';

export default function Layout(props: {children: ReactNode}) {
    return (
        // TODO: is there a way we could further abstract the chat and game indicator sections to here?
        <main className="flex gap-8 items-center justify-between px-12 pt-4">
            {props.children}
        </main>
    )
}
