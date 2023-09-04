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
import OfflineScoreIndicator, {Scores} from '../ttt/OfflineScoreIndicator';
import OfflineMoveIndicator from '../OfflineMoveIndicator';
import ScaledBox from '../../../components/ScaledBox';

// Utilities
import {BoardStatus, checkBoardStatus, PlayerSymbol, TTTBoard} from '../../game/[id]/TicTacToeBoard';
import {alternatePlayerSymbol} from '../../game/[id]/TicTacToeGame';


export default function OfflineUltimateTicTacToeGame() {
    const [gameState, setGameState] = useState(defaultUTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
    const [gameStatuses, setGameStatuses] = useState(defaultUTTTBoardStatuses);
    const [activeBoard, setActiveBoard] = useState(4);

    const [scores, setScores] = useState<Scores>([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol>(PlayerSymbol.FIRST);
    const [nextStartSymbol, setNextStartSymbol] = useState<PlayerSymbol>(PlayerSymbol.SECOND);

    // Makes a move by checking the given square in the given board,
    // alternating the player's symbol and setting the new active square after each move.
    function setSquare(board: number, square: number) {
        const newGameState: UTTTBoard = [...gameState];
        const newBoard: TTTBoard = [...newGameState[board]];
        newBoard[square] = playerSymbol;
        newGameState[board] = newBoard;

        // Check inner board status and update if won
        const status = checkBoardStatus(square, newBoard);
        const newGameStatuses: UTTTBoardStatuses = [...gameStatuses];
        newGameStatuses[board] = status;
        setGameStatuses(newGameStatuses);

        setGameState(newGameState);
        setPlayerSymbol(alternatePlayerSymbol(playerSymbol));
        setActiveBoard(newGameStatuses[square] !== BoardStatus.PLAYING ? ANY_BOARD : square);

        // Check outer board status and handle accordingly
        const newGameStatus = checkBoardStatus(board, newGameStatuses.map(status => (
            status === BoardStatus.FIRST_VICTORY ? PlayerSymbol.FIRST
            : status === BoardStatus.SECOND_VICTORY ? PlayerSymbol.SECOND
            : PlayerSymbol.EMPTY
        )))
        setGameStatus(newGameStatus);

        // Wins are +1 for the winner, ties are +0.5 for both players
        switch (newGameStatus) {
            case BoardStatus.TIED: setScores([scores[0] + 0.5, scores[1] + 0.5]); break;
            case BoardStatus.FIRST_VICTORY: setScores([scores[0] + 1, scores[1]]); break;
            case BoardStatus.SECOND_VICTORY: setScores([scores[0], scores[1] + 1]); break;
        }
    }

    // Starts a new game, resetting the board, status, and symbol, alternating start symbols;
    // if X started the last game, O starts the next game.
    function resetBoard() {
        setGameState(defaultUTTTBoard);
        setGameStatus(BoardStatus.PLAYING);
        setGameStatuses(defaultUTTTBoardStatuses);
        setPlayerSymbol(nextStartSymbol);
        setNextStartSymbol(alternatePlayerSymbol(nextStartSymbol));
        setActiveBoard(4);
    }

    return (
        <main className="flex-grow flex flex-col gap-4 items-center justify-center px-4 min-h-0 pb-8 sm:pb-12 md:pb-16">
            <OfflineScoreIndicator scores={scores} />

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

            <OfflineMoveIndicator
                status={gameStatus}
                currPlayer={playerSymbol}
                first={<strong className="text-red-400">✕</strong>}
                second={<strong className="text-blue-400">◯</strong>}
                resetBoard={resetBoard}
            />
        </main>
    )
}
