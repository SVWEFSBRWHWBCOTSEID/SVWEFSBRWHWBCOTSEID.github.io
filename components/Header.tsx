import {ReactNode} from 'react';
import Link from 'next/link';


export default function Header() {
    return (
        <header className="px-8 py-4 text-md flex gap-2 items-center">
            <Link href="/" className="text-xl pb-0.5 mr-4">[game website]</Link>

            <HeaderLink href="/offline">Offline</HeaderLink>
            <HeaderLink href="/rules">Rules</HeaderLink>
        </header>
    )
}

function HeaderLink(props: {href: string, children: ReactNode}) {
    return (
        <Link href={props.href} className="uppercase text-secondary px-2">
            {props.children}
        </Link>
    )
}
