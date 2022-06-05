import {useState} from 'react';
import Head from 'next/head';
import TicTacToeBoard, {defaultBoard, GameStatus, TTTBoard, TTTSymbol} from '../../components/TicTacToeBoard';


export default function OfflineTicTacToe() {
    const [gameState, setGameState] = useState<TTTBoard>([...defaultBoard]);
    const [gameStatus, setGameStatus] = useState(GameStatus.PLAYING);
    const [scores, setScores] = useState([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');
    const [nextStartSymbol, setNextStartSymbol] = useState<TTTSymbol>('◯');

    // Makes a move by checking the given square, alternating the player's symbol after each move.
    function setSquare(index: number, symbol: TTTSymbol) {
        gameState[index] = symbol;
        setGameState([...gameState]);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
    }

    // Handles a game status change by incrementing the player scores.
    function handleGameStatusChange(status: GameStatus) {
        // Wins are +1 for the winner, ties are +0.5 for both players
        switch (status) {
            case GameStatus.TIED: setScores([scores[0] + 0.5, scores[1] + 0.5]); break;
            case GameStatus.X_VICTORY: setScores([scores[0] + 1, scores[1]]); break;
            case GameStatus.O_VICTORY: setScores([scores[0], scores[1] + 1]); break;
        }
        setGameStatus(status);
    }

    // Starts a new game, resetting the board, status, and symbol, alternating start symbols;
    // if X started the last game, O starts the next game.
    function resetBoard() {
        setGameState([...defaultBoard]);
        setGameStatus(GameStatus.PLAYING);
        setPlayerSymbol(nextStartSymbol);
        setNextStartSymbol(nextStartSymbol === '✕' ? '◯' : '✕');
    }

    return (
        <main className="h-screen flex flex-col gap-8 items-center justify-center">
            <Head>
                <title>Offline Tic-Tac-Toe</title>
                <meta name="description" content="Offline Tic-Tac-Toe for single-device games." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="flex gap-3 items-center text-3xl font-medium">
                <div className="h-6 w-6 rounded-full bg-red-400" />
                <span className="pb-0.5">{scores.join(' - ')}</span>
                <div className="h-6 w-6 rounded-full bg-blue-400" />
            </section>

            <TicTacToeBoard
                gameState={gameState}
                playerSymbol={playerSymbol}
                setSquare={setSquare}
                setGameStatus={handleGameStatusChange}
                disabled={gameStatus !== GameStatus.PLAYING}
            />

            <section className="relative">
                {gameStatus === GameStatus.PLAYING ? (
                    <p className="font-light">You are playing as <strong>{playerSymbol}</strong>. It is your move.</p>
                ) : gameStatus === GameStatus.TIED ? (
                    <p className="font-light">The game has tied.</p>
                ) : gameStatus === GameStatus.X_VICTORY ? (
                    <p className="font-light"><strong>✕</strong> has won!</p>
                ) : (
                    <p className="font-light"><strong>◯</strong> has won!</p>
                )}
                {gameStatus !== GameStatus.PLAYING && (
                    <button className="absolute top-8 inset-x-0" onClick={resetBoard}>
                        Play again
                    </button>
                )}
            </section>
        </main>
    )
}
