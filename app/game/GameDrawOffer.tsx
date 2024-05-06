'use client'

import { MouseEventHandler, useContext } from 'react';
import GameContext from '../../contexts/GameContext';


export default function GameDrawOffer() {
    const { id, drawOffer, side } = useContext(GameContext);

    async function handleDrawOffer(draw: boolean) {
        await fetch(`${process.env.API_BASE}/game/${id}/draw/${draw}`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    if (side === 'SPECTATOR') return null;

    return (
        <div className="flex">
            {side === drawOffer ? (
                <>
                    <DeclineButton onClick={() => handleDrawOffer(false)} />
                    <p className="flex-grow bg-content-secondary text-center p-6">
                        Draw offer sent
                    </p>
                </>
            ) : (
                <>
                    <DeclineButton onClick={() => handleDrawOffer(false)} />
                    <p className="flex-grow bg-content-secondary text-center p-6">
                        Your opponent offers a draw
                    </p>
                    <AcceptButton onClick={() => handleDrawOffer(true)} />
                </>
            )}
        </div>
    )
}

function DeclineButton(props: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button
            className="flex-none text-theme-red text-4xl w-20 flex items-center justify-center border border-tertiary font-bold hover:border-none hover:text-white hover:bg-theme-red transition duration-150"
            onClick={props.onClick}
        >
            ×
        </button>
    )
}

function AcceptButton(props: { onClick?: MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button
            className="flex-none text-theme-green text-4xl w-20 flex items-center justify-center border border-tertiary font-bold hover:border-none hover:text-white hover:bg-theme-green transition duration-150"
            onClick={props.onClick}
        >
            ½
        </button>
    )
}
