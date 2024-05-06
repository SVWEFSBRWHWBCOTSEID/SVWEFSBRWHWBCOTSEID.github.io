'use client'

import { ReactNode, useState } from 'react';
import { timeControlToString } from '../../util/game';
import type { Lobby } from './Lobbies';
import { BiCircle, BiSolidCircle, BiSolidCircleHalf } from 'react-icons/bi';


// TODO: abstract with `LobbyRoom.tsx`?
export default function YouLobbyRoom(props: Lobby) {
    const [loading, setLoading] = useState(false)

    async function cancelGame() {
        if (loading) return;
        setLoading(true);

        await fetch(`${process.env.API_BASE}/game/cancel`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    return (
        // TODO: button is not a legal table row element, but using a div is kinda hacky
        <div
            className={'px-4 table-row text-primary cursor-pointer transition duration-75 ' + (loading ? 'opacity-50' : 'group')}
            onClick={cancelGame}
        >
            <YouLobbyCell>
                {props.side === 'FIRST' ? (
                    <BiSolidCircle />
                ) : props.side === 'SECOND' ? (
                    <BiCircle />
                ) : (
                    <BiSolidCircleHalf />
                )}
            </YouLobbyCell>
            <YouLobbyCell>{props.user.username}</YouLobbyCell>
            <YouLobbyCell>{props.user.rating}</YouLobbyCell>
            <YouLobbyCell>{timeControlToString(props.timeControl)}</YouLobbyCell>
            <YouLobbyCell>{props.game.key.toUpperCase()} {props.rated ? 'Rated' : 'Casual'}</YouLobbyCell>
        </div>
    )
}

function YouLobbyCell(props: { children: ReactNode }) {
    return (
        <span className="table-cell align-middle border-t border-tertiary px-4 py-1 group-hover:text-white bg-theme-green/50">
            {props.children}
        </span>
    )
}
