'use client'

import {useState} from 'react';
import {Tab} from '@headlessui/react';
import type {GameNameInfo} from '../game/[id]/page';

// Components
import QuickPairingButton, {QuickPairingPresetButton} from './QuickPairingButton';
import CreateGameModal from './CreateGameModal';


export default function QuickPairingPanel(props: {game: GameNameInfo}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        // TODO: create own gulpin SVG
        <Tab.Panel className="grid grid-cols-3 gap-3 p-2 bg-center bg-no-repeat bg-[#262422] bg-[url('/lichess.svg')] mb-8 rounded-b">
            <QuickPairingPresetButton game={props.game} minutes={1} increment={0} />
            <QuickPairingPresetButton game={props.game} minutes={2} increment={1} />
            <QuickPairingPresetButton game={props.game} minutes={3} increment={0} />

            <QuickPairingPresetButton game={props.game} minutes={3} increment={2} />
            <QuickPairingPresetButton game={props.game} minutes={5} increment={0} />
            <QuickPairingPresetButton game={props.game} minutes={5} increment={3} />

            <QuickPairingPresetButton game={props.game} minutes={10} increment={0} />
            <QuickPairingPresetButton game={props.game} minutes={10} increment={5} />
            <QuickPairingPresetButton game={props.game} minutes={15} increment={10} />

            <QuickPairingPresetButton game={props.game} minutes={30} increment={0} />
            <QuickPairingPresetButton game={props.game} minutes={30} increment={20} />
            <QuickPairingButton game="Custom" onClick={() => setIsOpen(true)} />

            <CreateGameModal isOpen={isOpen} setIsOpen={setIsOpen} game={props.game} />
        </Tab.Panel>
    )
}
