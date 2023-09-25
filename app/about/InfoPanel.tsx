'use client'

import {ReactNode} from 'react';
import {Tab} from '@headlessui/react';


export default function InfoPanel(props: {children: ReactNode}) {
    return (
        <Tab.Panel className="bg-content px-16 py-10 shadow-md">
            {props.children}
        </Tab.Panel>
    )
}
