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
        <Tab.Panel className={"grid grid-cols-3 gap-3 p-2 bg-center bg-no-repeat bg-[#262422 url(\"data:image/svg+xml,%3Csvg viewBox='-2 -2 54 54' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23383633' stroke='%23383633' stroke-linejoin='round'%0Ad='M38.956.5c-3.53.418-6.452.902-9.286 2.984C5.534 1.786-.692 18.533.68 29.364 3.493 50.214 31.918 55.785 41.329 41.7c-7.444 7.696-19.276 8.752-28.323 3.084C3.959 39.116-.506 27.392 4.683 17.567 9.873 7.742 18.996 4.535 29.03 6.405c2.43-1.418 5.225-3.22 7.655-3.187l-1.694 4.86 12.752 21.37c-.439 5.654-5.459 6.112-5.459 6.112-.574-1.47-1.634-2.942-4.842-6.036-3.207-3.094-17.465-10.177-15.788-16.207-2.001 6.967 10.311 14.152 14.04 17.663 3.73 3.51 5.426 6.04 5.795 6.756 0 0 9.392-2.504 7.838-8.927L37.4 7.171z'/%3E%3C/svg%3E%0A\")] mb-8"}>
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
