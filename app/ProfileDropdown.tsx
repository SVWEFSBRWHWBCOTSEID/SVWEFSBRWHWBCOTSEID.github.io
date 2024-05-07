'use client'

import { MouseEventHandler, ReactNode, useContext } from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';

// Components
import UserEventHandler from '@/components/UserEventHandler';
import ProfilePicture from '@/components/ProfilePicture';

// Contexts
import UserContext from '@/contexts/UserContext';

// Icons
import { FaPowerOff } from 'react-icons/fa';
import { BsEnvelopeFill, BsGearFill } from 'react-icons/bs';


export default function ProfileDropdown() {
    const { user, setUser } = useContext(UserContext);

    async function signOut() {
        await fetch(`${process.env.API_BASE}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        setUser(null);
    }

    return (
        <Menu as="div">
            <Menu.Button className="pl-3 pr-4 py-3 ui-open:bg-[#3c3934] hover:text-primary flex gap-2 items-center">
                <ProfilePicture
                    user={user}
                    className="size-8 flex-none"
                />
                {user?.username}
            </Menu.Button>
            <Menu.Items className="absolute right-0 bg-[#3c3934] py-1.5 rounded-l text-sm w-56 shadow-xl z-10">
                <Link href={`/profile/${user?.username}`}>
                    <ProfileDropdownItem>
                        <div className="w-2.5 h-2.5 mx-[0.1875rem] rounded-full bg-theme-green group-hover:bg-white" /> Profile
                    </ProfileDropdownItem>
                </Link>
                <Link href="/inbox">
                    <ProfileDropdownItem>
                        <BsEnvelopeFill className="w-4 text-base" /> Inbox
                    </ProfileDropdownItem>
                </Link>
                <Link href="/preferences">
                    <ProfileDropdownItem>
                        <BsGearFill className="w-4 text-base" /> Preferences
                    </ProfileDropdownItem>
                </Link>
                <ProfileDropdownItem danger onClick={signOut}>
                    <FaPowerOff className="w-4 text-base" /> Sign out
                </ProfileDropdownItem>
            </Menu.Items>

            {/* Handler for authenticated user SSE endpoint */}
            <UserEventHandler />
        </Menu>
    )
}

function ProfileDropdownItem(props: {
    children: ReactNode,
    onClick?: MouseEventHandler<HTMLDivElement>,
    danger?: boolean
}) {
    return (
        <Menu.Item
            as="div"
            className={'flex gap-2.5 items-center px-4 py-1.5 cursor-pointer text-primary hover:text-white group ' + (props.danger ? 'hover:bg-theme-red' : 'hover:bg-theme-green')}
            onClick={props.onClick}
        >
            {props.children}
        </Menu.Item>
    )
}
