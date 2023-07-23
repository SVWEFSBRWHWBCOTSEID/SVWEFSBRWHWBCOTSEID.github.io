import {Metadata} from 'next';
import {cookies} from 'next/headers';
import {notFound} from 'next/navigation';

// Components
import TicTacToeGame from './TicTacToeGame';
import UltimateTicTacToeGame from './UltimateTicTacToeGame';

// Util
import {timeControlToString} from '../../../util/game';
import type {GameKey} from '../../../contexts/ProfileContext';


export type ChatMessageEvent = {
    type: 'CHAT_MESSAGE',
    username: string,
    text: string,
    visibility: 'PLAYER' | 'SPECTATOR'
}

export type Status = 'WAITING' | 'STARTED' | 'FIRST_WON' | 'SECOND_WON' | 'DRAW';
export type WinType = 'NORMAL' | 'RESIGN' | 'TIMEOUT' | 'DISCONNECT';
export type DrawOffer = 'NONE' | 'FIRST' | 'SECOND';
export type GameStateEvent = {
    type: 'GAME_STATE',
    ftime: number, // ms
    stime: number, // ms
    moves: string[],
    status: Status,
    winType: WinType | null,
    drawOffer: DrawOffer,
}

export type GameNameInfo = {
    key: GameKey,
    name: string
}
export type TimeControl = {
    initial: number, // ms
    increment: number // ms
}
export type GameFullEvent = {
    type: 'GAME_FULL',
    game: GameNameInfo,
    rated: boolean,
    timeControl: TimeControl,
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

    return {
        title: {
            // TODO
            absolute: `Correspondence ${gameInfo.game.name} • ${gameInfo.first.username} vs ${gameInfo.second.username}`
        },
        description: `${gameInfo.first.username} (${gameInfo.first.rating}) vs ${gameInfo.second.username} (${gameInfo.second.rating}) in ${gameInfo.rated ? 'Rated' : 'Casual'} ${timeControlToString(gameInfo.timeControl)} ${gameInfo.game.name}.`
    }
}

export default async function GamePage({ params }: { params: { id: string } }) {
    const res = await fetch(`${process.env.API_BASE}/game/${params.id}`, {next: {tags: [`game-${params.id}`]}});
    if (!res.ok) notFound();

    const gameInfo: GameInfo = await res.json();
    const username = cookies().get('username')?.value; // TODO: caching is now disabled

    switch (gameInfo.game.key) {
        case 'ttt': return <TicTacToeGame id={params.id} username={username} info={gameInfo} />
        case 'uttt': return <UltimateTicTacToeGame id={params.id} username={username} info={gameInfo} />
        default: return null; // TODO: hacky?
    }
}
