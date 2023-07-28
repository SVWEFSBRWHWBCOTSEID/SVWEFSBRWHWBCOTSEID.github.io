'use client'

import {MouseEventHandler, ReactNode} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Menu} from '@headlessui/react';
import UserEventHandler from './UserEventHandler';

// Icons
import {FaPowerOff} from 'react-icons/fa';
import {BsCircleFill} from 'react-icons/bs';


export default function ProfileDropdown(props: {username: string}) {
    const {refresh} = useRouter();

    async function signOut() {
        await fetch(`${process.env.API_BASE}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        refresh();
    }

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="text-secondary px-3 py-4 ui-open:bg-content-secondary hover:text-primary">
                {props.username}
            </Menu.Button>
            <Menu.Items className="absolute right-0 bg-content-secondary py-1.5 rounded-l rounded-br w-48 shadow-xl z-10">
                <Link href={`/profile/${props.username}`}>
                    <ProfileDropdownItem>
                        <div className="w-3 h-3 mx-0.5 rounded-full bg-theme-green group-hover:bg-white" /> Profile
                    </ProfileDropdownItem>
                </Link>
                <ProfileDropdownItem onClick={signOut}>
                    <FaPowerOff /> Sign out
                </ProfileDropdownItem>
            </Menu.Items>

            {/* Handler for authenticated user SSE endpoint */}
            <UserEventHandler />
        </Menu>
    )
}

function ProfileDropdownItem(props: {children: ReactNode, onClick?: MouseEventHandler<HTMLDivElement>}) {
    return (
        <Menu.Item
            as="div"
            className="flex gap-2.5 items-center px-4 py-1 cursor-pointer text-primary hover:text-white hover:bg-theme-green group"
            onClick={props.onClick}
        >
            {props.children}
        </Menu.Item>
    )
}
