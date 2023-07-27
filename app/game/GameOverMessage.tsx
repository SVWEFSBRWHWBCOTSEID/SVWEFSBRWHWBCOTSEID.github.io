'use client'

import {useContext} from 'react';
import GameContext from '../../contexts/GameContext';
import type {WinType} from './[id]/page';


export default function GameOverMessage() {
    const {gameStatus, winType} = useContext(GameContext);

    return (
        <div className="px-4 py-2 text-[#ccc] border-t border-tertiary text-center">
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
                    // TODO: stalemate, insufficient material
                    'Draw by mutual agreement'
                ) : (
                    `${gameStatus === 'FIRST_WON' ? 'O' : 'X'} ${winTypeToStr(winType)} • ${gameStatus === 'FIRST_WON' ? 'X' : 'O'} is victorious`
                )}
            </p>
        </div>
    )
}

function winTypeToStr(type: WinType | null) {
    switch (type) {
        case 'RESIGN': return 'resigned';
        case 'TIMEOUT': return 'timed out';
        case 'DISCONNECT': return 'left the game';
        default: return 'lost';
    }
}
