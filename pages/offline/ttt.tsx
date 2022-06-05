import {useState} from 'react';
import Head from 'next/head';
import TicTacToeBoard, {defaultBoard, GameStatus, TTTSymbol} from '../../components/TicTacToeBoard';


export default function OfflineTicTacToe() {
    const [gameState, setGameState] = useState(defaultBoard);
    const [gameStatus, setGameStatus] = useState(GameStatus.PLAYING);
    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');

    // Makes a move by checking the given square, alternating the player's symbol after each move.
    function setSquare(index: number, symbol: TTTSymbol) {
        gameState[index] = symbol;
        setGameState([...gameState]);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
    }

    return (
        <div>
            <Head>
                <title>Offline Tic-Tac-Toe</title>
                <meta name="description" content="Offline Tic-Tac-Toe for single-device games." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="h-screen flex flex-col gap-8 items-center justify-center">
                <TicTacToeBoard
                    gameState={gameState}
                    playerSymbol={playerSymbol}
                    setSquare={setSquare}
                    setGameStatus={setGameStatus}
                    disabled={gameStatus !== GameStatus.PLAYING}
                />
                {gameStatus === GameStatus.PLAYING ? (
                    <p className="font-light">You are playing as <strong>{playerSymbol}</strong>. It is your move.</p>
                ) : gameStatus === GameStatus.TIED ? (
                    <p className="font-light">The game has tied.</p>
                ) : gameStatus === GameStatus.X_VICTORY ? (
                    <p className="font-light"><strong>✕</strong> has won!</p>
                ) : (
                    <p className="font-light"><strong>◯</strong> has won!</p>
                )}
            </main>
        </div>
    )
}
