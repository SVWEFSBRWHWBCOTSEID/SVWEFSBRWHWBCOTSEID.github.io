'use client'

import {useState} from 'react';
import Chat from '../../../components/Chat';
import GameHeader from '../../../components/GameHeader';
import GameStateIndicator from '../../../components/GameStateIndicator';
import TicTacToeBoard, {BoardStatus, defaultTTTBoard, TTTBoard, TTTSymbol} from '../../../components/TicTacToeBoard';


export default function TicTacToeGame() {
    const [gameState, setGameState] = useState<TTTBoard>(defaultTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');

    // Makes a move by checking the given square, alternating the player's symbol after each move.
    function setSquare(square: number, symbol: TTTSymbol) {
        const newGameState: TTTBoard = [...gameState]
        newGameState[square] = symbol;
        setGameState(newGameState);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
    }

    return (
        <main className="flex gap-8 items-center justify-between px-12 pt-4">
            <div className="flex flex-col gap-5 w-[21rem]">
                <GameHeader />
                <Chat />
            </div>

            <TicTacToeBoard
                boardState={gameState}
                playerSymbol={playerSymbol}
                setSquare={setSquare}
                setBoardStatus={setGameStatus}
                disabled={gameStatus !== BoardStatus.PLAYING}
            />

            <GameStateIndicator />
        </main>
    )
}
