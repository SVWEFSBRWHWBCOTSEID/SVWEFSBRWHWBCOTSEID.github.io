'use client'

import {Tab} from '@headlessui/react';


export default function QuickPairingTab(props: {name: string}) {
    return (
        <Tab className="px-2.5 md:px-6 py-1 flex-grow text-sm font-light text-secondary select-none ui-selected:text-theme-orange ui-selected:border-b-2 ui-selected:border-theme-orange focus:outline-none">
            {props.name}
        </Tab>
    )
}
