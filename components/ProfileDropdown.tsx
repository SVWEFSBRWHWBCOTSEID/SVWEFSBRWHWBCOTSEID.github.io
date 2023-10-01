'use client'

import {MouseEventHandler, ReactNode, useContext} from 'react';
import Link from 'next/link';
import {Menu} from '@headlessui/react';
import UserEventHandler from './UserEventHandler';
import UserContext from '../contexts/UserContext';

// Icons
import {FaPowerOff} from 'react-icons/fa';
import {BsCircleFill} from 'react-icons/bs';


export default function ProfileDropdown() {
    const {user, setUser} = useContext(UserContext);

    async function signOut() {
        await fetch(`${process.env.API_BASE}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        setUser(null);
    }

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="text-secondary pl-3 pr-4 py-4 ui-open:bg-[#3c3934] hover:text-primary">
                {user?.username}
            </Menu.Button>
            <Menu.Items className="absolute right-0 bg-[#3c3934] py-1 rounded-l text-sm w-48 shadow-xl z-10">
                <Link href={`/profile/${user?.username}`}>
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
            className="flex gap-2 items-center px-3 py-1.5 cursor-pointer text-primary hover:text-white hover:bg-theme-green group"
            onClick={props.onClick}
        >
            {props.children}
        </Menu.Item>
    )
}
