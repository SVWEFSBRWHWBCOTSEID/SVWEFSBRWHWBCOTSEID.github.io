'use client'

import { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import type { EndType, Status } from './[id]/page';
import type { GameKey } from '../../contexts/ProfileContext';


export default function GameOverMessage() {
    const { info, gameStatus, endType } = useContext(GameContext);

    // Scroll the moves panel to bottom when the game ends
    function scrollToBottom(ref: HTMLDivElement | null) {
        ref?.scrollIntoView();
    }

    return (
        <div className="px-4 py-2 mt-auto text-primary border-t border-tertiary text-center" ref={scrollToBottom}>
            <strong className="text-lg mb-1">
                {gameStatus === 'FIRST_WON' ? (
                    '1-0'
                ) : gameStatus === 'SECOND_WON' ? (
                    '0-1'
                ) : (
                    '0.5-0.5'
                )}
            </strong>
            <p className="italic">
                {gameEndMessage(info.game.key, gameStatus, endType)}
            </p>
        </div>
    )
}

export function gameEndMessage(key: GameKey, status: Status, endType: EndType | null) {
    if (status === 'DRAW') return endType === 'STALEMATE' ? 'Stalemate' : 'Draw by mutual agreement';

    const sides = keyToSideNames(key);
    const winner = status === 'FIRST_WON' ? sides[0] : sides[1];
    const loser = status === 'FIRST_WON' ? sides[1] : sides[0];

    return `${loser} ${winTypeToStr(endType)} • ${winner} is victorious`;
}

// Returns the side names of a given game as a tuple of [first, second].
function keyToSideNames(key: GameKey) {
    switch (key) {
        case "ttt":
        case "uttt": return ['X', 'O'];
        case "c4": return ['Red', 'Yellow'];
        case "pc": return ['White', 'Black'];
    }
}

function winTypeToStr(type: EndType | null) {
    switch (type) {
        case 'RESIGN': return 'resigned';
        case 'TIMEOUT': return 'timed out';
        case 'DISCONNECT': return 'left the game';
        default: return 'lost';
    }
}
