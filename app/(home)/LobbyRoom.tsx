import {ReactNode} from 'react';
import Link from 'next/link';
import {timeControlToString} from '../../util/game';
import type {Lobby} from './Lobbies';


export default function LobbyRoom(props: Lobby) {
    return (
        <Link className="px-4 table-row text-secondary group" href={`/game/${props.id}`}>
            <LobbyCell>{props.user.username}</LobbyCell>
            <LobbyCell>{props.user.rating}</LobbyCell>
            <LobbyCell>{timeControlToString(props.timeControl)}</LobbyCell>
            <LobbyCell>{props.game.key.toUpperCase()} {props.rated ? 'Rated' : 'Casual'}</LobbyCell>
        </Link>
    )
}

export function LobbyCell(props: {children: ReactNode}) {
    return (
        <span className="table-cell border-t border-tertiary px-4 py-1 group-hover:text-white group-hover:bg-theme-orange/50">
            {props.children}
        </span>
    )
}
