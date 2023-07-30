import {createContext, Dispatch, SetStateAction} from 'react';
import {Duration} from 'luxon';

// Types
import type {GameInfo, Offer, Status, EndType} from '../app/game/[id]/page';
import type {ChatData} from '../app/game/Chat';
import type {PlayerSide} from '../app/game/[id]/Game';


type GameContextData = {
    id: string,
    info: GameInfo,
    username?: string,
    side: PlayerSide,

    moves: string[],
    gameStateIndex: number,
    setGameStateIndex: Dispatch<SetStateAction<number>>,

    gameStatus: Status,
    drawOffer: Offer,
    endType: EndType | null,

    ftime: Duration,
    stime: Duration,
    chat: ChatData[]
}

const GameContext = createContext<GameContextData>(null!); // TODO
export default GameContext;
