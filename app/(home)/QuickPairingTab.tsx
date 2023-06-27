'use client'

import {Tab} from '@headlessui/react';


export default function QuickPairingTab(props: {game: string}) {
    return (
        <Tab className="px-6 py-1 flex-grow text-secondary ui-selected:text-theme-orange ui-selected:border-b-2 ui-selected:border-theme-orange focus:outline-none">
            {props.game}
        </Tab>
    )
}
