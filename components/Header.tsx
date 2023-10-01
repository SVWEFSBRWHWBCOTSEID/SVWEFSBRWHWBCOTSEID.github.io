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
        <header className="relative sm:pl-4 md:pl-6 lg:pl-8 text-md flex justify-between">
            <nav className="flex items-center">
                <HeaderMenu />

                <Link href="/" className="text-2xl pb-1 mr-4 group hover:text-blue-500">
                    gulpin<span className="text-secondary group-hover:text-blue-600">.games</span>
                </Link>

                <HeaderHoverDropdown href="/" name="Play">
                    <HeaderHoverDropdownLink href="/?modal=true">Create a game</HeaderHoverDropdownLink>
                    <HeaderHoverDropdownLink href="/offline">Offline</HeaderHoverDropdownLink>
                </HeaderHoverDropdown>
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

function HeaderHoverDropdown(props: {href: string, name: string, children: ReactNode}) {
    return (
        <div className="hidden sm:flex flex-col h-full relative group">
            <Link href={props.href} className="uppercase text-sm h-full flex items-center text-secondary px-3.5 py-4 group-hover:text-primary group-hover:bg-[#3c3934] border-l-2 border-transparent group-hover:border-blue-500">
                {props.name}
            </Link>
            <div className="hidden group-hover:block absolute top-full border-l-2 border-blue-500 bg-[#3c3934] rounded-r overflow-clip w-max">
                {props.children}
            </div>
        </div>
    )
}

function HeaderHoverDropdownLink(props: {href: string, children: ReactNode}) {
    return (
        <Link href={props.href} className="block text-sm text-primary pl-3.5 pr-5 py-2.5 hover:text-white hover:bg-blue-500">
            {props.children}
        </Link>
    )
}

function HeaderLink(props: {href: string, children: ReactNode}) {
    return (
        <Link href={props.href} className="hidden sm:block uppercase text-sm text-secondary px-3.5 py-4 hover:text-primary">
            {props.children}
        </Link>
    )
}
