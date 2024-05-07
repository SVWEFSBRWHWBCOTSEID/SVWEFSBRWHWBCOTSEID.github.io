'use client'

import { ReactNode } from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { FiMenu } from 'react-icons/fi';


export default function HeaderMenu() {
    return (
        <Menu as="div" className="sm:hidden text-xl flex items-center ui-open:bg-content h-full px-3">
            <Menu.Button>
                <FiMenu />
            </Menu.Button>
            <Menu.Items className="absolute left-0 top-full bg-content flex flex-col gap-2 px-4 py-3 text-sm z-20">
                <HeaderMenuLink href="/">Play</HeaderMenuLink>
                <HeaderMenuLink href="/offline">Offline</HeaderMenuLink>
                <HeaderMenuLink href="/rules">Rules</HeaderMenuLink>
                <HeaderMenuLink href="/about">About</HeaderMenuLink>
            </Menu.Items>
        </Menu>
    )
}

function HeaderMenuLink(props: { href: string, children: ReactNode }) {
    return (
        <Menu.Item>
            <Link href={props.href}>
                {props.children}
            </Link>
        </Menu.Item>
    )
}
