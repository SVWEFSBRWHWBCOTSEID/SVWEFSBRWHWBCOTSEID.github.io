import {ReactNode} from 'react';
import Link from 'next/link';
import {BsGear, BsGearFill} from 'react-icons/bs';
import {cookies} from 'next/headers';


export default function Header() {
    const username = cookies().get('username')?.value;

    return (
        <header className="px-8 py-4 text-md flex justify-between">
            <nav className="flex gap-2 items-center">
                <Link href="/" className="text-xl pb-0.5 mr-4">[game website]</Link>

                <HeaderLink href="/">Play</HeaderLink>
                <HeaderLink href="/offline">Offline</HeaderLink>
                <HeaderLink href="/rules">Rules</HeaderLink>
            </nav>
            <nav className="flex gap-2 items-center">
                <Link href="/preferences">
                    <BsGearFill className="text-secondary" />
                </Link>
                {username ? (
                    <Link href={`/profile/${username}`} className="text-secondary px-2">
                        {username}
                    </Link>
                ) : (
                    <Link href="/login" className="text-blue-500 uppercase px-2">
                        Sign in
                    </Link>
                )}
            </nav>
        </header>
    )
}

function HeaderLink(props: {href: string, children: ReactNode}) {
    return (
        <Link href={props.href} className="uppercase text-sm text-secondary px-2">
            {props.children}
        </Link>
    )
}
