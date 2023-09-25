'use client'

import {ReactNode} from 'react';
import {Tab} from '@headlessui/react';


export default function InfoSidebarItem(props: {children: ReactNode}) {
    return (
        <Tab className="py-1 border-r-2 border-transparent hover:border-theme-orange ui-selected:border-theme-orange ui-selected:text-theme-orange pr-10">
            {props.children}
        </Tab>
    )
}
