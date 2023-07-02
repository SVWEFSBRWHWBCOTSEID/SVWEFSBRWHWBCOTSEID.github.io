import {ReactNode} from 'react';
import Link from 'next/link';
import {BsGear, BsGearFill} from 'react-icons/bs';
import SignInButton from './SignInButton';

// Auth
import {getServerSession} from 'next-auth';
import {authOptions} from '../app/api/auth/[...nextauth]/route';


export default async function Header() {
    const session = await getServerSession(authOptions);
    console.log(session)

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
                {session ? (
                    <Link href="/profile" className="text-secondary px-2">
                        {session.data.username}
                    </Link>
                ) : (
                    <SignInButton />
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
