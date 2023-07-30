'use client'

import {useContext, useState} from 'react';
import GameContext from '../../contexts/GameContext';


export default function RematchButton() {
    const {id, rematchOffer, side} = useContext(GameContext);
    const [offered, setOffered] = useState(false);

    async function handleRematch(rematch: boolean) {
        await fetch(`${process.env.API_BASE}/game/${id}/rematch/${rematch}`, {
            method: 'POST',
            credentials: 'include'
        });
        if (rematch) setOffered(true);
    }

    return (
        <div className="relative mt-2.5">
            <button
                className="py-8 text-lg font-medium w-full bg-[rgb(60_57_52)] text-primary uppercase hover:text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:text-primary disabled:hover:bg-[rgb(60_57_52)] transition duration-100"
                disabled={offered}
                onClick={() => handleRematch(true)}
            >
                Rematch
            </button>
            {rematchOffer !== 'NONE' && rematchOffer !== side && (
                // TODO: blue pulsing?
                <button
                    className="text-white text-xl font-bold px-1 bg-red-600 opacity-50 hover:opacity-75 transition duration-100 border-l border-background absolute inset-y-0 left-full rounded-r-sm"
                    onClick={() => handleRematch(false)}
                >
                    ×
                </button>
            )}
        </div>
    )
}
