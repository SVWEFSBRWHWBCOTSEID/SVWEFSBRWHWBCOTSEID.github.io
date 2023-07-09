import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import type {GameKey} from '../../../contexts/ProfileContext';

// Components
import TicTacToeGame from './TicTacToeGame';
import UltimateTicTacToeGame from './UltimateTicTacToeGame';


export type ChatMessageEvent = {
    type: 'CHAT_MESSAGE',
    username: string,
    text: string,
    visibility: 'PLAYER' | 'SPECTATOR'
}

export type GameStateEvent = {
    type: 'GAME_STATE',
    ftime: number, // ms
    stime: number, // ms
    moves: string[],
    status: 'WAITING' | 'STARTED' | 'FIRST_RESIGNED' | 'SECOND_RESIGNED' | 'FIRST_WON' | 'SECOND_WON' | 'FIRST_DRAW_OFFER' | 'SECOND_DRAW_OFFER' | 'DRAW'
}

export type GameFullEvent = {
    type: 'GAME_FULL',
    game: {
        key: GameKey,
        name: string
    },
    rated: boolean,
    timeControl: {
        initial: number, // ms
        increment: number // ms
    },
    createdAt: string, // SQL date
    first: Player,
    second: Player,
    chat: Omit<ChatMessageEvent, 'type'>[],
    // TODO: startpos?
    state: Omit<GameStateEvent, 'type'>
}

export type GameEvent = GameFullEvent | GameStateEvent | ChatMessageEvent;

export type Player = {
    username: string,
    rating: number,
    provisional: boolean
}

export type GameInfo = Omit<GameFullEvent, 'type' | 'chat' | 'state'>;

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const res = await fetch(`${process.env.API_BASE}/game/${params.id}`, {next: {tags: [`game-${params.id}`]}});
    if (!res.ok) return {
        title: 'Game not found'
    }

    const gameInfo: Omit<GameFullEvent, 'type' | 'chat' | 'state'> = await res.json();
    const minutes = gameInfo.timeControl.initial / 60000;
    const increment = gameInfo.timeControl.initial / 1000;

    // TODO: fetch API
    return {
        title: {
            // TODO
            absolute: `Correspondence ${gameInfo.game.name} • ${gameInfo.first.username} vs ${gameInfo.second.username}`
        },
        description: `${gameInfo.first.username} (${gameInfo.first.rating}) vs ${gameInfo.second.username} (${gameInfo.second.rating}) in ${gameInfo.rated ? 'Rated' : 'Casual'} ${minutes}+${increment} ${gameInfo.game.name}.`
    }
}

export default async function GamePage({ params }: { params: { id: string } }) {
    const res = await fetch(`${process.env.API_BASE}/game/${params.id}`, {next: {tags: [`game-${params.id}`]}});
    if (!res.ok) notFound();

    const gameInfo: GameInfo = await res.json();

    switch (gameInfo.game.key) {
        case 'ttt': return <TicTacToeGame id={params.id} info={gameInfo} />
        case 'uttt': return <UltimateTicTacToeGame id={params.id} info={gameInfo} />
        default: return null; // TODO: hacky?
    }
}
