'use client'

import { ReactNode, useContext } from 'react';
import Link from 'next/link';

// Components
import ProfileDropdown from './ProfileDropdown';
import SignInLink from './SignInLink';
import HeaderMenu from './HeaderMenu';
import ChallengeDropdown from './ChallengeDropdown';

// Contexts
import UserContext from '@/contexts/UserContext';

// Icons
import { BsGear, BsGearFill } from 'react-icons/bs';


export default function Header() {
    const { user } = useContext(UserContext);

    return (
        <header className="relative sm:pl-4 md:pl-6 text-md flex justify-between">
            <nav className="flex items-center">
                <HeaderMenu />

                <Link href="/" className="text-2xl md:text-3xl pb-1 mr-4 group text-[#BABABA] hover:text-theme-blue">
                    gulpin<span className="text-secondary group-hover:text-blue-600">.games</span>
                </Link>

                <HeaderHoverDropdown href="/" name="Play">
                    <HeaderHoverDropdownLink href="/?modal=true">Create a game</HeaderHoverDropdownLink>
                    <HeaderHoverDropdownLink href="/offline">Play offline</HeaderHoverDropdownLink>
                </HeaderHoverDropdown>
                <HeaderLink href="/rules">Rules</HeaderLink>
                <HeaderLink href="/about">About</HeaderLink>
            </nav>
            <nav className="flex items-center text-[#bababa]">
                {user ? (
                    <>
                        <ChallengeDropdown />
                        <ProfileDropdown />
                    </>
                ) : (
                    <>
                        <Link href="/preferences" className="px-2">
                            <BsGearFill />
                        </Link>
                        <SignInLink />
                    </>
                )}
            </nav>
        </header>
    )
}

function HeaderHoverDropdown(props: { href: string, name: string, children: ReactNode }) {
    return (
        <div className="hidden sm:flex flex-col h-full relative group">
            <Link
                className="uppercase text-sm h-full flex items-center text-secondary px-3.5 py-4 group-hover:text-primary group-hover:bg-[#3c3934] border-l-2 border-transparent group-hover:border-theme-blue"
                href={props.href}
            >
                {props.name}
            </Link>
            <div
                className="hidden group-hover:block absolute top-full border-l-2 border-theme-blue bg-[#3c3934] rounded-r overflow-clip w-max z-50">
                {props.children}
            </div>
        </div>
    )
}

function HeaderHoverDropdownLink(props: { href: string, children: ReactNode }) {
    return (
        <Link
            className="block text-sm text-primary pl-3.5 pr-5 py-2.5 hover:text-white hover:bg-theme-blue"
            href={props.href}
        >
            {props.children}
        </Link>
    )
}

function HeaderLink(props: { href: string, children: ReactNode }) {
    return (
        <Link
            className="hidden sm:block uppercase text-sm text-secondary px-3.5 py-4 hover:text-primary"
            href={props.href}
        >
            {props.children}
        </Link>
    )
}
