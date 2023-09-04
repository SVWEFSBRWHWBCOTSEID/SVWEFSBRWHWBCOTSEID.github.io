'use client'

import {useState} from 'react';

// Components
import Connect4Board, {getNextUnfilledIndex} from '../../game/[id]/Connect4Board';
import OfflineScoreIndicator, {Scores} from '../OfflineScoreIndicator';
import OfflineMoveIndicator from '../OfflineMoveIndicator';
import ScaledBox from '../../../components/ScaledBox';

// Util
import {BoardStatus, checkBoardStatus, PlayerSymbol} from '../../game/[id]/TicTacToeBoard';
import {alternatePlayerSymbol} from '../../game/[id]/TicTacToeGame';


export default function OfflineConnect4Game() {
    const [gameState, setGameState] = useState<PlayerSymbol[]>(Array(42).fill(PlayerSymbol.EMPTY)); // TODO
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);

    const [scores, setScores] = useState<Scores>([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<PlayerSymbol>(PlayerSymbol.FIRST);
    const [nextStartSymbol, setNextStartSymbol] = useState<PlayerSymbol>(PlayerSymbol.SECOND);

    // Makes a move by setting the lowest unfilled square in the column, alternating the player's symbol after each move.
    function setColumn(column: number) {
        const newGameState = [...gameState];
        const index = getNextUnfilledIndex(gameState, column);

        newGameState[index] = playerSymbol;

        setGameState(newGameState);
        setPlayerSymbol(alternatePlayerSymbol(playerSymbol));

        // Check board status and handle accordingly
        const status = checkBoardStatus(index, newGameState, 6, 7, 4);
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
        setGameState(Array(42).fill(PlayerSymbol.EMPTY)); // TODO
        setGameStatus(BoardStatus.PLAYING);
        setPlayerSymbol(nextStartSymbol);
        setNextStartSymbol(alternatePlayerSymbol(nextStartSymbol));
    }

    return (
        <main className="flex-grow flex flex-col gap-4 items-center justify-center px-4 min-h-0 pb-8 sm:pb-12 md:pb-16">
            <OfflineScoreIndicator
                scores={scores}
                firstColor="bg-red-400"
                secondColor="bg-yellow-400"
            />

            <ScaledBox className="w-full">
                <Connect4Board
                    boardState={gameState}
                    playerSymbol={playerSymbol}
                    setColumn={setColumn}
                    disabled={gameStatus !== BoardStatus.PLAYING}
                    over={gameStatus !== BoardStatus.PLAYING}
                />
            </ScaledBox>

            <OfflineMoveIndicator
                status={gameStatus}
                currPlayer={playerSymbol}
                first={<div className="w-4 h-4 rounded-full bg-red-400" />}
                second={<div className="w-4 h-4 rounded-full bg-yellow-400" />}
                resetBoard={resetBoard}
            />
        </main>
    )
}
