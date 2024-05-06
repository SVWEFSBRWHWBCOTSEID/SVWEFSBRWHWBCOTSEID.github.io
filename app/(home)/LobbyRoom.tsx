'use client'

import { ReactNode, useState } from 'react';
import { timeControlToString } from '../../util/game';
import type { Lobby } from './Lobbies';
import { BiCircle, BiSolidCircle, BiSolidCircleHalf } from 'react-icons/bi';


export default function LobbyRoom(props: Lobby) {
    const [loading, setLoading] = useState(false)

    async function joinGame() {
        if (loading) return;
        setLoading(true);

        await fetch(`${process.env.API_BASE}/game/join/${props.id}`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    return (
        // TODO: button is not a legal table row element, but using a div is kinda hacky
        <div
            className={'px-4 table-row text-secondary group cursor-pointer' + (loading ? ' opacity-50' : '')}
            onClick={joinGame}
        >
            <LobbyCell>
                {props.side === 'FIRST' ? (
                    <BiSolidCircle />
                ) : props.side === 'SECOND' ? (
                    <BiCircle />
                ) : (
                    <BiSolidCircleHalf />
                )}
            </LobbyCell>
            <LobbyCell>{props.user.username}</LobbyCell>
            <LobbyCell>{props.user.rating}</LobbyCell>
            <LobbyCell>{timeControlToString(props.timeControl)}</LobbyCell>
            <LobbyCell>{props.game.key.toUpperCase()} {props.rated ? 'Rated' : 'Casual'}</LobbyCell>
        </div>
    )
}

export function LobbyCell(props: { className?: string, children?: ReactNode }) {
    return (
        <span className={'table-cell align-middle border-t border-tertiary px-4 py-1 group-hover:text-white group-hover:bg-theme-orange/50' + (props.className ? ` ${props.className}` : '')}>
            {props.children}
        </span>
    )
}
