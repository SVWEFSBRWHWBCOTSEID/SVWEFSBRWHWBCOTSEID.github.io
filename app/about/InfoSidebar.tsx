'use client'

import {ReactNode} from 'react';
import {Tab} from '@headlessui/react';


export default function InfoSidebar(props: {children: ReactNode}) {
    return (
        <Tab.List as="aside" className="flex flex-col py-1 text-secondary">
            {props.children}
        </Tab.List>
    )
}
