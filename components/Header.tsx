'use client'

import {ReactNode, useContext} from 'react';
import Link from 'next/link';
import UserContext from '../contexts/UserContext';
import {BsGear, BsGearFill} from 'react-icons/bs';

// Components
import ProfileDropdown from './ProfileDropdown';
import SignInLink from './SignInLink';
import HeaderMenu from './HeaderMenu';


export default function Header() {
    const {user} = useContext(UserContext);

    return (
        <header className="relative pr-4 sm:px-4 md:px-6 lg:px-8 text-md flex justify-between">
            <nav className="flex gap-2 items-center">
                <HeaderMenu />

                <Link href="/" className="text-2xl pb-1 mr-4 group hover:text-blue-500">
                    gulpin<span className="text-secondary group-hover:text-blue-600">.games</span>
                </Link>

                <HeaderLink href="/">Play</HeaderLink>
                <HeaderLink href="/offline">Offline</HeaderLink>
                <HeaderLink href="/rules">Rules</HeaderLink>
                <HeaderLink href="/about">About</HeaderLink>
            </nav>
            <nav className="flex gap-2 items-center">
                <Link href="/preferences">
                    <BsGearFill className="text-secondary" />
                </Link>
                {user ? (
                    <ProfileDropdown />
                ) : (
                    <SignInLink />
                )}
            </nav>
        </header>
    )
}

function HeaderLink(props: {href: string, children: ReactNode}) {
    return (
        <Link href={props.href} className="hidden sm:block uppercase text-sm text-secondary px-2 py-4 hover:text-primary">
            {props.children}
        </Link>
    )
}
