'use client'

import {Tab} from '@headlessui/react';
import QuickPairingTab from './QuickPairingTab';
import QuickPairingPanel from './QuickPairingPanel';
import {GameKey} from '../../contexts/ProfileContext';


export default function QuickPairing() {
    return (
        <Tab.Group>
            <Tab.List className="flex gap-2 mb-2">
                {games.map(game => (
                    <QuickPairingTab name={game.name} key={game.key} />
                ))}
            </Tab.List>
            <Tab.Panels>
                {games.map(game => (
                    <QuickPairingPanel game={game} key={game.key} />
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}

export const games: {name: string, key: GameKey}[] = [
    {name: 'Tic-Tac-Toe', key: 'ttt'},
    {name: 'Ultimate Tic-Tac-Toe', key: 'uttt'},
    {name: 'Connect 4', key: 'c4'},
    {name: 'Pokemon Chess', key: 'pc'}
]
