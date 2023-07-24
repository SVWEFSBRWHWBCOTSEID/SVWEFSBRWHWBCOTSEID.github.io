'use client'

import {startTransition, useEffect, useLayoutEffect, useState} from 'react';
import LobbyRoom, {LobbyCell} from './LobbyRoom';
import YouLobbyRoom from './YouLobbyRoom';

// Util
import {getUser} from '../../util/user';
import {defaultGamePerfs} from '../../contexts/ProfileContext';
import type {GameNameInfo, Player, TimeControl} from '../game/[id]/page';
import type {Side} from '../../util/game';


export type Lobby = {
    id: string,
    user: Player,
    game: GameNameInfo,
    rated: boolean,
    minRating: number,
    maxRating: number,
    side: Side,
    timeControl: TimeControl
}

type LobbyEvent = {
    type: 'NEW_LOBBY',
    lobbies: Lobby[]
}

export default function Lobbies(props: {username?: string}) {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);

    // TODO: hacky?
    const [perfs, setPerfs] = useState(defaultGamePerfs);
    useLayoutEffect(() => {
        startTransition(() => {
            if (!props.username) return;
            void getUser(props.username).then(user => user && setPerfs(user.perfs));
        })
    }, [])

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/lobbies/events`);
        eventSource.onmessage = (m) => {
            const event: LobbyEvent = JSON.parse(m.data);

            console.log(event)
            setLobbies(event.lobbies)
        };
    }, [])

    const youLobby = lobbies.find((lobby) => lobby.user.username === props.username);
    const filteredLobbies = lobbies
        .filter((lobby) => lobby.user.username !== props.username)
        .filter((lobby) => {
            const rating = perfs[lobby.game.key].rating;
            return !lobby.rated || (lobby.minRating <= rating && lobby.maxRating >= rating)
        })

    return (
        <div className="table w-full rounded overflow-clip bg-content/40">
            <div className="px-4 font-light table-header-group bg-content-secondary">
                <div className="table-row">
                    <LobbyCell className="w-12" />
                    <LobbyCell>Player</LobbyCell>
                    <LobbyCell>Rating</LobbyCell>
                    <LobbyCell>Time</LobbyCell>
                    <LobbyCell>Game</LobbyCell>
                </div>
            </div>

            {lobbies.length === 0 && !youLobby && (
                <div className="px-4 table-row text-secondary relative h-20">
                    <span className="absolute inset-0 m-auto w-max h-max">
                        No games found.
                    </span>
                </div>
            )}

            {youLobby && <YouLobbyRoom {...youLobby} />}
            {filteredLobbies.length > 0 && filteredLobbies.map((lobby) => (
                <LobbyRoom {...lobby} key={lobby.id} />
            ))}
        </div>
    )
}
