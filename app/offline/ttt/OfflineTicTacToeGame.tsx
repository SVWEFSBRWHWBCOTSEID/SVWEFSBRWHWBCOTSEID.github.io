'use client'

import {useState} from 'react';

// Components
import TicTacToeBoard, {BoardStatus, checkBoardStatus, defaultTTTBoard, PlayerSymbol, TTTBoard} from '../../game/[id]/TicTacToeBoard';
import OfflineScoreIndicator, {Scores} from './OfflineScoreIndicator';
import OfflineMoveIndicator from '../OfflineMoveIndicator';
import ScaledBox from '../../../components/ScaledBox';

// Util
import {alternatePlayerSymbol} from '../../game/[id]/TicTacToeGame';


export default function OfflineTicTacToeGame() {
    const [gameState, setGameState] = useState<TTTBoard>(defaultTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);

    const [scores, setScores] = useState<Scores>([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol>(PlayerSymbol.FIRST);
    const [nextStartSymbol, setNextStartSymbol] = useState<PlayerSymbol>(PlayerSymbol.SECOND);

    // Makes a move by checking the given square, alternating the player's symbol after each move.
    function setSquare(square: number) {
        const newGameState: TTTBoard = [...gameState]
        newGameState[square] = playerSymbol;

        setGameState(newGameState);
        setPlayerSymbol(alternatePlayerSymbol(playerSymbol));

        // Check board status and handle accordingly
        const status = checkBoardStatus(square, newGameState);
        setGameStatus(status);

        // Wins are +1 for the winner, ties are +0.5 for both players
        switch (status) {
            case BoardStatus.TIED: setScores([scores[0] + 0.5, scores[1] + 0.5]); break;
            case BoardStatus.FIRST_VICTORY: setScores([scores[0] + 1, scores[1]]); break;
            case BoardStatus.SECOND_VICTORY: setScores([scores[0], scores[1] + 1]); break;
        }
    }

    // Starts a new game, resetting the board, status, and symbol, alternating start symbols;
    // if X started the last game, O starts the next game.
    function resetBoard() {
        setGameState(defaultTTTBoard);
        setGameStatus(BoardStatus.PLAYING);
        setPlayerSymbol(nextStartSymbol);
        setNextStartSymbol(alternatePlayerSymbol(nextStartSymbol));
    }

    return (
        <main className="flex-grow flex flex-col gap-4 items-center justify-center px-4 min-h-0 pb-8 sm:pb-12 md:pb-16">
            <OfflineScoreIndicator scores={scores} />

            <ScaledBox className="w-full">
                <TicTacToeBoard
                    boardState={gameState}
                    playerSymbol={playerSymbol}
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
