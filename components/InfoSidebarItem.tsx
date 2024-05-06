'use client'

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function InfoSidebarItem(props: { children: ReactNode, href: string }) {
    const pathname = usePathname();
    const active = pathname === props.href;

    return (
        <Link
            className={'text-left py-2 border-r-2 pr-10 transition duration-100 ' + (active ? 'border-theme-orange text-theme-orange' : 'border-transparent hover:border-theme-orange')}
            href={props.href}
        >
            {props.children}
        </Link>
    )
}
