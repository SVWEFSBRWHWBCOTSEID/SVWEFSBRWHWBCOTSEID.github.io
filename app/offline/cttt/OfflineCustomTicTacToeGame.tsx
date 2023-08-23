'use client'

import {useState} from 'react';

// Components
import TicTacToeBoard, {
    defaultTTTBoard,
    BoardStatus,
    TTTBoard,
    TTTSymbol,
    checkBoardStatus
} from '../../game/[id]/TicTacToeBoard';
import TicTacToeScoreIndicator, {TTTScores} from '../ttt/TicTacToeScoreIndicator';
import SecondarySlider from '../../../components/SecondarySlider';


export default function OfflineCustomTicTacToeGame() {
    const [gameState, setGameState] = useState<TTTBoard>(defaultTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);

    const [scores, setScores] = useState<TTTScores>([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');
    const [nextStartSymbol, setNextStartSymbol] = useState<TTTSymbol>('◯');

    const [rows, setRows] = useState(3);
    const [columns, setColumns] = useState(3);
    const [needed, setNeeded] = useState(3);

    // Makes a move by checking the given square, alternating the player's symbol after each move.
    function setSquare(square: number, symbol: TTTSymbol) {
        const newGameState: TTTBoard = [...gameState]
        newGameState[square] = symbol;

        setGameState(newGameState);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');

        // Check board status and handle accordingly
        const status = checkBoardStatus(square, newGameState, rows, columns, needed);
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
            <TicTacToeScoreIndicator scores={scores} />

            <TicTacToeBoard
                boardState={gameState}
                playerSymbol={playerSymbol}
                setSquare={setSquare}
                disabled={gameStatus !== BoardStatus.PLAYING}
                over={gameStatus !== BoardStatus.PLAYING}
                rows={rows}
                columns={columns}
            />

            <section className="flex gap-4">
                <div className="w-56">
                    <p className="mb-1.5 text-sm">Rows: <strong>{rows}</strong></p>
                    <SecondarySlider
                        value={rows}
                        onChange={(r) => setRows(r)}
                        min={2}
                        max={10}
                        className="h-5 slider-thumb:w-8 slider-thumb:h-5 transition duration-200"
                    />
                </div>

                <div className="w-56">
                    <p className="mb-1.5 text-sm">Columns: <strong>{columns}</strong></p>
                    <SecondarySlider
                        value={columns}
                        onChange={(c) => setColumns(c)}
                        min={2}
                        max={10}
                        className="h-5 slider-thumb:w-8 slider-thumb:h-5 transition duration-200"
                    />
                </div>

                <div className="w-56">
                    <p className="mb-1.5 text-sm"># in a row to win: <strong>{needed}</strong></p>
                    <SecondarySlider
                        value={needed}
                        onChange={(n) => setNeeded(n)}
                        min={2}
                        max={Math.max(rows, columns)} // TODO: set needed to max when other sliders change
                        className="h-5 slider-thumb:w-8 slider-thumb:h-5 transition duration-200"
                    />
                </div>
            </section>

            <section className="relative pb-16">
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
