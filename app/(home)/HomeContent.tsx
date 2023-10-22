'use client'

import {MouseEventHandler, ReactNode, useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';

// Components
import QuickPairing from './QuickPairing';
import Lobbies, {Lobby} from './Lobbies';
import CreateGameModal from './CreateGameModal';
import CreateChallengeModal from './CreateChallengeModal';


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

    const [gameOpen, setGameOpen] = useState(false);
    const [challengeOpen, setChallengeOpen] = useState(false);
    const [challengeUsername, setChallengeUsername] = useState('bbb'); // TODO

    const params = useSearchParams();
    const {replace} = useRouter();

    // Subscribe to rising edges on the modal search param, opening and resetting the param for later navigation.
    useEffect(() => {
        if (!params.get('modal') && !params.get('challenge')) return;

        setGameOpen(!!params.get('modal'));
        setChallengeOpen(!!params.get('challenge'));
        setChallengeUsername(params.get('challenge') ?? 'bbb'); // TODO

        replace('/');
    }, [params.get('modal'), params.get('challenge')]);

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
        <main className="container pt-4 pb-20 flex flex-wrap md:flex-nowrap gap-x-8 gap-y-16">
            <div className="flex-grow max-w-full min-w-0">
                {/* <h3 className="text-lg text-center font-medium mb-4">Quick Pairing</h3> */}
                <QuickPairing />

                <h3 className="text-lg text-center font-medium mb-2">Lobbies</h3>
                <Lobbies lobbies={lobbies} />
            </div>
            <div className="flex flex-col gap-3.5 sticky top-6 h-max w-full md:w-auto md:mt-16">
                <SecondaryButton open={gameOpen} onClick={() => setGameOpen(true)}>
                    Create a game
                </SecondaryButton>
                <SecondaryButton open={challengeOpen} onClick={() => setChallengeOpen(true)}>
                    Play with friend
                </SecondaryButton>

                <CreateGameModal
                    isOpen={gameOpen}
                    setIsOpen={setGameOpen}
                />
                <CreateChallengeModal
                    username={challengeUsername}
                    isOpen={challengeOpen}
                    setIsOpen={setChallengeOpen}
                />

                <div className="mt-3 text-sm text-secondary">
                    <p><strong>{players}</strong> player{players !== '1' ? 's' : ''}</p>
                    <p><strong>{games}</strong> game{games !== '1' ? 's' : ''} in play</p>
                </div>
            </div>
        </main>
    )
}

// TODO: move to own file?
// TODO: `props.open` maybe a bit hacky
function SecondaryButton(props: {children: ReactNode, open?: boolean, onClick?: MouseEventHandler<HTMLButtonElement>}) {
    return (
        <button
            className={'px-16 py-3 transition duration-200 rounded uppercase ' + (props.open ? 'bg-theme-orange text-white' : 'bg-[#302e2c] hover:bg-[hsl(37,_7%,_25%)] text-secondary hover:text-primary')}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    )
}
