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
        <Tab.Panel className={"grid grid-cols-3 gap-3 p-2 bg-center bg-no-repeat bg-[#262422_url(\"data:image/svg+xml,%3Csvg_viewBox='-2_-2_54_54'_xmlns='http://www.w3.org/2000/svg'%3E%3Cpath_fill='%23383633'_stroke='%23383633'_stroke-linejoin='round'%0Ad='M38.956.5c-3.53.418-6.452.902-9.286_2.984C5.534_1.786-.692_18.533.68_29.364_3.493_50.214_31.918_55.785_41.329_41.7c-7.444_7.696-19.276_8.752-28.323_3.084C3.959_39.116-.506_27.392_4.683_17.567_9.873_7.742_18.996_4.535_29.03_6.405c2.43-1.418_5.225-3.22_7.655-3.187l-1.694_4.86_12.752_21.37c-.439_5.654-5.459_6.112-5.459_6.112-.574-1.47-1.634-2.942-4.842-6.036-3.207-3.094-17.465-10.177-15.788-16.207-2.001_6.967_10.311_14.152_14.04_17.663_3.73_3.51_5.426_6.04_5.795_6.756_0_0_9.392-2.504_7.838-8.927L37.4_7.171z'/%3E%3C/svg%3E%0A\")] mb-8"}>
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
