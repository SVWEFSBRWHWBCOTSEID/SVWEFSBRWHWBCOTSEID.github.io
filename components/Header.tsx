import {ReactNode} from 'react';
import Link from 'next/link';


export default function Header() {
    return (
        <header className="px-8 py-4 text-md flex gap-4 items-center">
            <Link href="/" className="text-xl pb-0.5">[game website]</Link>

            <HeaderLink href="/offline">Offline</HeaderLink>
            <HeaderLink href="/rules">Rules</HeaderLink>
        </header>
    )
}

function HeaderLink(props: {href: string, children: ReactNode}) {
    return (
        <Link href={props.href} className="uppercase">
            {props.children}
        </Link>
    )
}
