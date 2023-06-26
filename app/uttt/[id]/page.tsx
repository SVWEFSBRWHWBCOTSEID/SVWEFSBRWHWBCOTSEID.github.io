'use client' // TODO

import {useState} from 'react';
import Head from 'next/head';

// Components
import UltimateTicTacToeBoard, {
    ANY_BOARD,
    defaultUTTTBoard,
    defaultUTTTBoardStatuses,
    UTTTBoard,
    UTTTBoardStatuses
} from '../../../components/UltimateTicTacToeBoard';
import TicTacToeScoreIndicator, {TTTScores} from '../../../components/TicTacToeScoreIndicator';

// Utilities
import {BoardStatus, checkBoardStatus, TTTBoard, TTTSymbol} from '../../../components/TicTacToeBoard';
import Chat from '../../../components/Chat';
import GameHeader from '../../../components/GameHeader';
import GameStateIndicator from '../../../components/GameStateIndicator';


export default function UltimateTicTacToe() {
    const [gameState, setGameState] = useState(defaultUTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
    const [gameStatuses, setGameStatuses] = useState(defaultUTTTBoardStatuses);
    const [activeBoard, setActiveBoard] = useState(4);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');

    // Makes a move by checking the given square in the given board,
    // alternating the player's symbol and setting the new active square after each move.
    function setSquare(board: number, square: number, symbol: TTTSymbol) {
        const newGameState: UTTTBoard = [...gameState];
        const newBoard: TTTBoard = [...newGameState[board]];
        newBoard[square] = symbol;
        newGameState[board] = newBoard;

        setGameState(newGameState);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
        setActiveBoard(gameStatuses[square] !== BoardStatus.PLAYING ? ANY_BOARD : square);
    }

    // Handles a board status change by updating the statuses array.
    function handleBoardStatusChange(board: number, status: BoardStatus) {
        const newGameStatuses: UTTTBoardStatuses = [...gameStatuses];
        newGameStatuses[board] = status;
        setGameStatuses(newGameStatuses);

        // TODO: should we store board statuses as an array of symbols so that it's easier for
        // board checking and symbol displaying? Is there anywhere where having a `BoardStatus`
        // for each cell is *required*?
        setGameStatus(
            checkBoardStatus(newGameStatuses.map(status => (
                status === BoardStatus.X_VICTORY ? '✕'
                    : status === BoardStatus.O_VICTORY ? '◯'
                    : ''
            )) as TTTBoard)
        )
    }

    return (
        <main className="flex gap-8 items-center justify-between px-12 pt-4">
            <Head>
                <title>Ultimate Tic-Tac-Toe</title>
                <meta name="description" content="Offline Ultimate Tic-Tac-Toe for single-device games." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="flex flex-col gap-5 w-[21rem]">
                <GameHeader />
                <Chat />
            </div>

            <UltimateTicTacToeBoard
                gameState={gameState}
                gameStatuses={gameStatuses}
                playerSymbol={playerSymbol}
                activeBoard={activeBoard}
                setSquare={setSquare}
                setBoardStatus={handleBoardStatusChange}
                disabled={gameStatus !== BoardStatus.PLAYING}
            />

            <GameStateIndicator />
        </main>
    )
}
