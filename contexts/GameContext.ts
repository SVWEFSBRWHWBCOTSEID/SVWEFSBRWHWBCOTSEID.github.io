import {createContext, Dispatch, SetStateAction} from 'react';
import {Duration} from 'luxon';

// Types
import type {GameInfo, Status, WinType} from '../app/game/[id]/page';
import type {ChatMessage} from '../app/game/Chat';
import type {PlayerSide} from '../app/game/[id]/Game';


type GameContextData = {
    id: string,
    info: GameInfo,
    gameStatus: Status,
    winType: WinType | null,
    username?: string,
    side: PlayerSide,

    ftime: Duration,
    stime: Duration,
    chat: ChatMessage[],

    moves: string[],
    gameStateIndex: number,
    setGameStateIndex: Dispatch<SetStateAction<number>>
}

const GameContext = createContext<GameContextData>(null!); // TODO
export default GameContext;
