'use client'

import {useContext} from 'react';
import GameContext from '../../contexts/GameContext';
import type {EndType} from './[id]/page';
import type {GameKey} from '../../contexts/ProfileContext';


export default function GameOverMessage() {
    const {info, gameStatus, endType} = useContext(GameContext);
    const sides = keyToSideNames(info.game.key);

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
                {gameStatus === 'DRAW' ? (
                    endType === 'STALEMATE' ? 'Stalemate' : 'Draw by mutual agreement'
                ) : (
                    `${gameStatus === 'FIRST_WON' ? sides[1] : sides[0]} ${winTypeToStr(endType)} • ${gameStatus === 'FIRST_WON' ? sides[0] : sides[1]} is victorious`
                )}
            </p>
        </div>
    )
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

export function winTypeToStr(type: EndType | null) {
    switch (type) {
        case 'RESIGN': return 'resigned';
        case 'TIMEOUT': return 'timed out';
        case 'DISCONNECT': return 'left the game';
        default: return 'lost';
    }
}
