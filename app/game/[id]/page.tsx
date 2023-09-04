import {Metadata} from 'next';
import {cookies} from 'next/headers';
import {notFound} from 'next/navigation';

// Components
import TicTacToeGame from './TicTacToeGame';
import UltimateTicTacToeGame from './UltimateTicTacToeGame';
import Connect4Game from './Connect4Game';

// Util
import {timeControlToString} from '../../../util/game';
import type {GameKey} from '../../../contexts/ProfileContext';


export type ChatMessageEvent = {
    type: 'CHAT_MESSAGE',
    username: string,
    text: string,
    visibility: 'PLAYER' | 'SPECTATOR'
}
export type ChatAlertEvent = {
    type: 'CHAT_ALERT',
    message: string
}

type RematchEvent = {
    type: 'REMATCH',
    id: string | null,
    rematchOffer: Offer
}

export type Status = 'WAITING' | 'STARTED' | 'FIRST_WON' | 'SECOND_WON' | 'DRAW';
export type EndType = 'NORMAL' | 'RESIGN' | 'TIMEOUT' | 'DISCONNECT' | 'STALEMATE';
export type Offer = 'NONE' | 'FIRST' | 'SECOND';
export type GameStateEvent = {
    type: 'GAME_STATE',
    ftime: number, // ms
    stime: number, // ms
    moves: string[],
    status: Status,
    endType: EndType | null,
    drawOffer: Offer,
    fratingDiff: number,
    sratingDiff: number
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

export type GameEvent = GameFullEvent | GameStateEvent | ChatMessageEvent | ChatAlertEvent | RematchEvent;

export type Player = {
    username: string,
    rating: number,
    provisional: boolean
}

export type GameInfo = Omit<GameFullEvent, 'type' | 'chat' | 'state'> & {id: string};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const res = await fetch(`${process.env.API_BASE}/game/${params.id}`, {next: {tags: [`game-${params.id}`]}});
    if (!res.ok) return {
        title: 'Game not found'
    }

    const gameInfo: Omit<GameFullEvent, 'type' | 'chat' | 'state'> = await res.json();

    return {
        title: {
            absolute: `${timeControlToSpeed(gameInfo.timeControl)} ${gameInfo.game.name} • ${gameInfo.first.username} vs ${gameInfo.second.username}`
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
        case 'c4': return <Connect4Game id={params.id} username={username} info={gameInfo} />
        default: return null; // TODO: hacky?
    }
}

function timeControlToSpeed(times: TimeControl) {
    if (times.initial < 3 * 60 * 1000) return 'Bullet';
    if (times.initial < 8 * 60 * 1000) return 'Blitz';
    if (times.initial < 25 * 60 * 1000) return 'Rapid';
    return 'Classical';
    // TODO: correspondence?
}
