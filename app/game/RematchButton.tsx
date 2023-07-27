'use client'

import {useContext, useState} from 'react';
import GameContext from '../../contexts/GameContext';


export default function RematchButton() {
    const {id} = useContext(GameContext);
    const [offered, setOffered] = useState(false);

    async function offerRematch() {
        await fetch(`${process.env.API_BASE}/game/${id}/rematch/true`, {
            method: 'POST',
            credentials: 'include'
        });
        setOffered(true);
    }

    return (
        <button
            className="py-8 mt-2.5 text-lg font-medium w-full bg-[rgb(60_57_52)] text-[#ccc] uppercase hover:text-white hover:bg-blue-500 disabled:opacity-50 disabled:hover:text-[#ccc] disabled:hover:bg-[rgb(60_57_52)] transition duration-100"
            disabled={offered}
            onClick={offerRematch}
        >
            Rematch
        </button>
    )
}
