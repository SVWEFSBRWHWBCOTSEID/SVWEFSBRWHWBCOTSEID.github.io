'use client'

import {useState} from 'react';
import {Tab} from '@headlessui/react';

// Components
import QuickPairingButton from './QuickPairingButton';
import CreateGameModal from './CreateGameModal';


export default function QuickPairingPanel(props: {game: {name: string, key: string}}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Tab.Panel className="grid grid-cols-3 gap-3 mb-8">
            <QuickPairingButton game={props.game.name}>1+0</QuickPairingButton>
            <QuickPairingButton game={props.game.name}>2+1</QuickPairingButton>
            <QuickPairingButton game={props.game.name}>3+0</QuickPairingButton>

            <QuickPairingButton game={props.game.name}>3+2</QuickPairingButton>
            <QuickPairingButton game={props.game.name}>5+0</QuickPairingButton>
            <QuickPairingButton game={props.game.name}>5+3</QuickPairingButton>

            <QuickPairingButton game={props.game.name}>10+0</QuickPairingButton>
            <QuickPairingButton game={props.game.name}>10+5</QuickPairingButton>
            <QuickPairingButton game={props.game.name}>15+10</QuickPairingButton>

            <QuickPairingButton game={props.game.name}>30+0</QuickPairingButton>
            <QuickPairingButton game={props.game.name}>30+20</QuickPairingButton>
            <QuickPairingButton game="Custom" onClick={() => setIsOpen(true)} />

            <CreateGameModal isOpen={isOpen} setIsOpen={setIsOpen} game={props.game} />
        </Tab.Panel>
    )
}
