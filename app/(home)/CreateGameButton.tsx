'use client'

import {MouseEventHandler, ReactNode, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import CreateGameModal from './CreateGameModal';


export default function CreateGameButton(props: {children: ReactNode, open?: boolean}) {
    const [isOpen, setIsOpen] = useState(!!props.open);
    const {replace} = useRouter();

    // Subscribe to rising edges on the modal search param, opening and resetting the param for later navigation.
    useEffect(() => {
        if (!props.open) return;
        setIsOpen(props.open);
        replace('/');
    }, [props.open]);

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
