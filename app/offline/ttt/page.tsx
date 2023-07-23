'use client' // TODO

import {useState} from 'react';
import Head from 'next/head';

// Components
import TicTacToeBoard, {
    defaultTTTBoard,
    BoardStatus,
    TTTBoard,
    TTTSymbol,
    TTTIndices
} from '../../game/[id]/TicTacToeBoard';
import TicTacToeScoreIndicator, {TTTScores} from './TicTacToeScoreIndicator';


export default function OfflineTicTacToe() {
    const [gameState, setGameState] = useState<TTTBoard>(defaultTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);

    const [scores, setScores] = useState<TTTScores>([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');
    const [nextStartSymbol, setNextStartSymbol] = useState<TTTSymbol>('◯');

    // Makes a move by checking the given square, alternating the player's symbol after each move.
    function setSquare(square: number, symbol: TTTSymbol) {
        const newGameState: TTTBoard = [...gameState]
        newGameState[square] = symbol;

        setGameState(newGameState);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');

        // Check board status and handle accordingly
        const status = checkBoardStatus(newGameState);
        setGameStatus(status);

        // Wins are +1 for the winner, ties are +0.5 for both players
        switch (status) {
            case BoardStatus.TIED: setScores([scores[0] + 0.5, scores[1] + 0.5]); break;
            case BoardStatus.X_VICTORY: setScores([scores[0] + 1, scores[1]]); break;
            case BoardStatus.O_VICTORY: setScores([scores[0], scores[1] + 1]); break;
        }
    }

    // Starts a new game, resetting the board, status, and symbol, alternating start symbols;
    // if X started the last game, O starts the next game.
    function resetBoard() {
        setGameState(defaultTTTBoard);
        setGameStatus(BoardStatus.PLAYING);
        setPlayerSymbol(nextStartSymbol);
        setNextStartSymbol(nextStartSymbol === '✕' ? '◯' : '✕');
    }

    return (
        <main className="flex-grow flex flex-col gap-8 items-center justify-center">
            <Head>
                <title>Offline Tic-Tac-Toe</title>
                <meta name="description" content="Offline Tic-Tac-Toe for single-device games." />
            </Head>

            <TicTacToeScoreIndicator scores={scores} />

            <TicTacToeBoard
                boardState={gameState}
                playerSymbol={playerSymbol}
                setSquare={setSquare}
                disabled={gameStatus !== BoardStatus.PLAYING}
                over={gameStatus !== BoardStatus.PLAYING}
            />

            <section className="relative">
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

// Checks a board for whether someone has won or the game has tied.
// TODO: make this prettier
export function checkBoardStatus(boardState: TTTBoard) {
    // Rows
    for (const row of TTTIndices) {
        const [left, middle, right] = row.map(i => boardState[i]);
        if (left && left === middle && left === right)
            return left === '✕' ? BoardStatus.X_VICTORY : BoardStatus.O_VICTORY;
    }

    // Columns
    for (const i in TTTIndices[0]) {
        const [top, middle, bottom] = TTTIndices.map(row => row[i]).map(i => boardState[i]);
        if (top && top === middle && top === bottom)
            return top === '✕' ? BoardStatus.X_VICTORY : BoardStatus.O_VICTORY;
    }

    // Diagonals
    if (boardState[0] && boardState[0] === boardState[4] && boardState[0] === boardState[8])
        return boardState[0] === '✕' ? BoardStatus.X_VICTORY : BoardStatus.O_VICTORY;
    if (boardState[2] && boardState[2] === boardState[4] && boardState[2] === boardState[6])
        return boardState[2] === '✕' ? BoardStatus.X_VICTORY : BoardStatus.O_VICTORY;

    // If the board is full and no one has won, it's a tie
    if (boardState.every(x => x)) return BoardStatus.TIED;

    return BoardStatus.PLAYING;
}
