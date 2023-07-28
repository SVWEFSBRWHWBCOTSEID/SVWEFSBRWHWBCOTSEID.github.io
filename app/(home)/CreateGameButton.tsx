'use client'

import {MouseEventHandler, ReactNode, useState} from 'react';
import CreateGameModal from './CreateGameModal';


export default function CreateGameButton(props: {children: ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <SecondaryButton onClick={() => setIsOpen(true)}>
                {props.children}
            </SecondaryButton>
            <CreateGameModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}

// TODO: delete?
function SecondaryButton(props: {children: ReactNode, onClick?: MouseEventHandler<HTMLButtonElement>}) {
    return (
        <button
            className="px-16 py-3 bg-[#302e2c] hover:bg-[hsl(37,_7%,_25%)] text-secondary hover:text-primary transition duration-200 rounded uppercase"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
