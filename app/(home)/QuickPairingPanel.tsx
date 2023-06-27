'use client'

import {Tab} from '@headlessui/react';
import QuickPairingButton from './QuickPairingButton';


export default function QuickPairingPanel(props: {game: string}) {
    return (
        <Tab.Panel className="grid grid-cols-3 gap-3 mb-8">
            <QuickPairingButton game={props.game}>1+0</QuickPairingButton>
            <QuickPairingButton game={props.game}>2+1</QuickPairingButton>
            <QuickPairingButton game={props.game}>3+0</QuickPairingButton>

            <QuickPairingButton game={props.game}>3+2</QuickPairingButton>
            <QuickPairingButton game={props.game}>5+0</QuickPairingButton>
            <QuickPairingButton game={props.game}>5+3</QuickPairingButton>

            <QuickPairingButton game={props.game}>10+0</QuickPairingButton>
            <QuickPairingButton game={props.game}>10+5</QuickPairingButton>
            <QuickPairingButton game={props.game}>15+10</QuickPairingButton>

            <QuickPairingButton game={props.game}>30+0</QuickPairingButton>
            <QuickPairingButton game={props.game}>30+20</QuickPairingButton>
            <QuickPairingButton game="Custom" />
        </Tab.Panel>
    )
}
