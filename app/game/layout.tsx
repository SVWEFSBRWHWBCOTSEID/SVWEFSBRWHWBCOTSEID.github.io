import type { ReactNode } from 'react';


export default function Layout(props: { children: ReactNode }) {
    return (
        <main className="flex flex-col-reverse xl:flex-row gap-x-5 gap-y-8 items-center px-4 pt-2 pb-12 max-w-[1642px] w-full mx-auto">
            {props.children}
        </main>
    )
}
