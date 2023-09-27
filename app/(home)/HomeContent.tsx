'use client'

import {useEffect, useState} from 'react';

// Components
import QuickPairing from './QuickPairing';
import Lobbies, {Lobby} from './Lobbies';
import CreateGameButton from './CreateGameButton';


type LobbyFullEvent = {
    type: 'LOBBY_FULL',
    lobbies: Lobby[],
    players: number,
    games: number
}

type AllLobbiesEvent = {
    type: 'ALL_LOBBIES',
    lobbies: Lobby[]
}

type PlayerStatsEvent = {
    type: 'PLAYER_STATS',
    players: number,
    games: number
}

type LobbyEvent = LobbyFullEvent | AllLobbiesEvent | PlayerStatsEvent;

export default function HomeContent(props: {username?: string}) {
    const [lobbies, setLobbies] = useState<Lobby[]>([]);
    const [players, setPlayers] = useState('-');
    const [games, setGames] = useState('-');

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/lobbies/events`);
        eventSource.onmessage = (m) => {
            const event: LobbyEvent = JSON.parse(m.data);
            console.log(event)

            switch (event.type) {
                case 'LOBBY_FULL':
                    setPlayers(event.players.toString());
                    setGames(event.games.toString());
                    setLobbies(event.lobbies);
                    break;
                case 'ALL_LOBBIES':
                    setLobbies(event.lobbies);
                    break;
                case 'PLAYER_STATS':
                    setPlayers(event.players.toString());
                    setGames(event.games.toString());
                    break;
            }
        };
    }, [])

    return (
        <main className="container pt-16 pb-20 flex flex-wrap md:flex-nowrap gap-x-8 gap-y-16">
            <div className="flex-grow max-w-full min-w-0">
                {/* <h3 className="text-lg text-center font-medium mb-4">Quick Pairing</h3> */}
                <QuickPairing />

                <h3 className="text-lg text-center font-medium mb-2">Lobbies</h3>
                <Lobbies
                    username={props.username}
                    lobbies={lobbies}
                />
            </div>
            <div className="flex flex-col gap-3.5 sticky top-6 h-max w-full md:w-auto ">
                <CreateGameButton>Create a game</CreateGameButton>
                <CreateGameButton>Play with friend</CreateGameButton>

                <div className="mt-3 text-sm text-secondary">
                    <p><strong>{players}</strong> player{players !== '1' ? 's' : ''}</p>
                    <p><strong>{games}</strong> game{games !== '1' ? 's' : ''} in play</p>
                </div>
            </div>
        </main>
    )
}
