'use client'

import {ReactNode} from 'react';
import {Menu} from '@headlessui/react';
import Link from 'next/link';


export default function ProfileDropdown(props: {username: string}) {
    return (
        <Menu as="div" className="relative">
            <Menu.Button className="text-secondary px-3 py-4 ui-open:bg-content-secondary hover:text-[#ccc]">
                {props.username}
            </Menu.Button>
            <Menu.Items className="absolute right-0 bg-content-secondary py-1.5 rounded-l rounded-br w-48 shadow-xl z-10">
                <Link href={`/profile/${props.username}`}>
                    <ProfileDropdownItem>Profile</ProfileDropdownItem>
                </Link>
                <ProfileDropdownItem>Sign out</ProfileDropdownItem>
            </Menu.Items>
        </Menu>
    )
}

function ProfileDropdownItem(props: {children: ReactNode}) {
    return (
        <Menu.Item as="div" className="px-4 py-1 cursor-pointer hover:bg-theme-green">
            {props.children}
        </Menu.Item>
    )
}
