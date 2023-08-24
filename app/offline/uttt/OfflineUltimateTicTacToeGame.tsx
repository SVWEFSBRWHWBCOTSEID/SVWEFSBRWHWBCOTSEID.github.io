'use client'

import {useState} from 'react';

// Components
import UltimateTicTacToeBoard, {
    ANY_BOARD,
    defaultUTTTBoard,
    defaultUTTTBoardStatuses,
    UTTTBoard,
    UTTTBoardStatuses
} from '../../game/[id]/UltimateTicTacToeBoard';
import TicTacToeScoreIndicator, {TTTScores} from '../ttt/TicTacToeScoreIndicator';
import ScaledBox from '../../../components/ScaledBox';

// Utilities
import {BoardStatus, checkBoardStatus, TTTBoard, TTTSymbol} from '../../game/[id]/TicTacToeBoard';


export default function OfflineUltimateTicTacToeGame() {
    const [gameState, setGameState] = useState(defaultUTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
    const [gameStatuses, setGameStatuses] = useState(defaultUTTTBoardStatuses);
    const [activeBoard, setActiveBoard] = useState(4);

    const [scores, setScores] = useState<TTTScores>([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');
    const [nextStartSymbol, setNextStartSymbol] = useState<TTTSymbol>('◯');

    // Makes a move by checking the given square in the given board,
    // alternating the player's symbol and setting the new active square after each move.
    function setSquare(board: number, square: number, symbol: TTTSymbol) {
        const newGameState: UTTTBoard = [...gameState];
        const newBoard: TTTBoard = [...newGameState[board]];
        newBoard[square] = symbol;
        newGameState[board] = newBoard;

        // Check inner board status and update if won
        const status = checkBoardStatus(square, newBoard);
        const newGameStatuses: UTTTBoardStatuses = [...gameStatuses];
        newGameStatuses[board] = status;
        setGameStatuses(newGameStatuses);

        setGameState(newGameState);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
        setActiveBoard(newGameStatuses[square] !== BoardStatus.PLAYING ? ANY_BOARD : square);

        // Check outer board status and handle accordingly
        const newGameStatus = checkBoardStatus(board, newGameStatuses.map(status => (
            status === BoardStatus.X_VICTORY ? '✕'
                : status === BoardStatus.O_VICTORY ? '◯'
                    : ''
        )) as TTTBoard)
        setGameStatus(newGameStatus);

        // Wins are +1 for the winner, ties are +0.5 for both players
        switch (newGameStatus) {
            case BoardStatus.TIED: setScores([scores[0] + 0.5, scores[1] + 0.5]); break;
            case BoardStatus.X_VICTORY: setScores([scores[0] + 1, scores[1]]); break;
            case BoardStatus.O_VICTORY: setScores([scores[0], scores[1] + 1]); break;
        }
    }

    // Starts a new game, resetting the board, status, and symbol, alternating start symbols;
    // if X started the last game, O starts the next game.
    function resetBoard() {
        setGameState(defaultUTTTBoard);
        setGameStatus(BoardStatus.PLAYING);
        setGameStatuses(defaultUTTTBoardStatuses);
        setPlayerSymbol(nextStartSymbol);
        setNextStartSymbol(nextStartSymbol === '✕' ? '◯' : '✕');
        setActiveBoard(4);
    }

    return (
        <main className="flex-grow flex flex-col gap-4 items-center justify-center px-4 min-h-0 pb-8 sm:pb-12 md:pb-16">
            <TicTacToeScoreIndicator scores={scores} />

            <ScaledBox className="w-full">
                <UltimateTicTacToeBoard
                    gameState={gameState}
                    gameStatuses={gameStatuses}
                    playerSymbol={playerSymbol}
                    activeBoard={activeBoard}
                    setSquare={setSquare}
                    disabled={gameStatus !== BoardStatus.PLAYING}
                    over={gameStatus !== BoardStatus.PLAYING}
                />
            </ScaledBox>

            <section className="relative mb-8">
                {gameStatus === BoardStatus.PLAYING ? (
                    <p className="font-light">You are playing as <strong>{playerSymbol}</strong>. It is your move.</p>
                ) : gameStatus === BoardStatus.TIED ? (
                    <p className="font-light">The game has tied.</p>
                ) : gameStatus === BoardStatus.X_VICTORY ? (
                    <p className="font-light"><strong>✕</strong> has won!</p>
                ) : (
                    <p className="font-light"><strong>◯</strong> has won!</p>
                )}
                {gameStatus !== BoardStatus.PLAYING && (
                    <button className="absolute top-8 inset-x-0" onClick={resetBoard}>
                        Play again
                    </button>
                )}
            </section>
        </main>
    )
}
