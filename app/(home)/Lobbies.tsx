'use client'

import {useEffect, useState} from 'react';
import LobbyRoom, {LobbyCell} from './LobbyRoom';
import type {GameNameInfo, Player, TimeControl} from '../game/[id]/page';


export type Lobby = {
    id: string,
    user: Player,
    game: GameNameInfo,
    rated: boolean,
    timeControl: TimeControl
}

type LobbyEvent = {
    type: 'NEW_LOBBY',
    lobbies: Lobby[]
}

export default function Lobbies() {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/lobbies/events`);
        eventSource.onmessage = (m) => {
            const event: LobbyEvent = JSON.parse(m.data);

            console.log(event)
            setLobbies(event.lobbies)
        };
    }, [])

    return (
        <div className="table w-full rounded overflow-clip bg-content/40">
            <div className="px-4 font-light table-header-group bg-content-secondary">
                <div className="table-row">
                    <LobbyCell>Player</LobbyCell>
                    <LobbyCell>Rating</LobbyCell>
                    <LobbyCell>Time</LobbyCell>
                    <LobbyCell>Game</LobbyCell>
                </div>
            </div>

            {lobbies.length === 0 && (
                <div className="px-4 table-row text-secondary relative h-20">
                    <span className="absolute inset-0 m-auto w-max h-max">
                        No games found.
                    </span>
                </div>
            )}
            {lobbies.length > 0 && lobbies.map((game) => (
                // TODO: filter by rating
                <LobbyRoom {...game} key={game.id} />
            ))}
        </div>
    )
}
