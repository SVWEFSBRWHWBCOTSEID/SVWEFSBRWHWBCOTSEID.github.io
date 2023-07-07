import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import TicTacToeGame from './TicTacToeGame';


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
    rated: boolean,
    timeControl: {
        initial: number, // ms
        increment: number // ms
    },
    createdAt: string, // SQL date
    first: GameUser,
    second: GameUser,
    chat: Omit<ChatMessageEvent, 'type'>[],
    // TODO: startpos?
    state: Omit<GameStateEvent, 'type'>
}

export type GameEvent = GameFullEvent | GameStateEvent | ChatMessageEvent;

export type GameUser = {
    username: string,
    rating: number,
    provisional: boolean
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // TODO: fetch API
    return {
        title: {
            absolute: `Correspondence Tic-Tac-Toe • kepler vs qpwoeirut`
        },
        description: `kepler (${params.id}) vs qpwoeirut (${params.id}) in Casual 5+5 Tic-Tac-Toe.` // TODO
    }
}

export default function TicTacToe({ params }: { params: { id: string } }) {
    // TODO: fetch API, not-found
    if (params.id === 'test') notFound();
    return <TicTacToeGame id={params.id} />
}
