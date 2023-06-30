'use client'

import {useState} from 'react';
import {Tab} from '@headlessui/react';

// Components
import QuickPairingButton, {QuickPairingPresetButton} from './QuickPairingButton';
import CreateGameModal from './CreateGameModal';


export default function QuickPairingPanel(props: {game: {name: string, key: string}}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Tab.Panel className="grid grid-cols-3 gap-3 mb-8">
            <QuickPairingPresetButton game={props.game.name} minutes={1} increment={0} />
            <QuickPairingPresetButton game={props.game.name} minutes={2} increment={1} />
            <QuickPairingPresetButton game={props.game.name} minutes={3} increment={0} />

            <QuickPairingPresetButton game={props.game.name} minutes={3} increment={2} />
            <QuickPairingPresetButton game={props.game.name} minutes={5} increment={0} />
            <QuickPairingPresetButton game={props.game.name} minutes={5} increment={3} />

            <QuickPairingPresetButton game={props.game.name} minutes={10} increment={0} />
            <QuickPairingPresetButton game={props.game.name} minutes={10} increment={5} />
            <QuickPairingPresetButton game={props.game.name} minutes={15} increment={10} />

            <QuickPairingPresetButton game={props.game.name} minutes={30} increment={0} />
            <QuickPairingPresetButton game={props.game.name} minutes={30} increment={20} />
            <QuickPairingButton game="Custom" onClick={() => setIsOpen(true)} />

            <CreateGameModal isOpen={isOpen} setIsOpen={setIsOpen} game={props.game} />
        </Tab.Panel>
    )
}
