'use client'

import {Tab} from '@headlessui/react';
import QuickPairingTab from './QuickPairingTab';
import QuickPairingPanel from './QuickPairingPanel';


export default function QuickPairing() {
    const games = ['Tic-Tac-Toe', 'Ultimate Tic-Tac-Toe', 'Connect 4', 'Pokemon Chess']

    return (
        <Tab.Group>
            <Tab.List className="flex gap-2 mb-2">
                {games.map(game => (
                    <QuickPairingTab game={game} key={game} />
                ))}
            </Tab.List>
            <Tab.Panels>
                {games.map(game => (
                    <QuickPairingPanel game={game} key={game} />
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}
