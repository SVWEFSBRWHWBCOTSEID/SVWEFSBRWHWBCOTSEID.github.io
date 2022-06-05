import {ReactNode, useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {v4} from 'uuid';
import TicTacToeBoard, {defaultBoard, TTTSymbol} from '../../components/TicTacToeBoard';


export default function Home() {
    const router = useRouter();
    const {gameId} = router.query;

    const [gameState, setGameState] = useState(defaultBoard);
    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');

    useEffect(() => {
        // Uncomment this when testing with server
        /*
        const playerId = v4();
        const eventSource = new EventSource(`/api/ttt/${gameId}/${playerId}`);
        eventSource.onmessage = (e) => {
            setGameState(e.data);
        }
        */
    }, []);

    // Makes a move by checking the given square.
    // For testing, this stores everything in state and alternates between X and O after each move,
    // as a single-computer game of tic-tac-toe might do
    function setSquare(index: number, symbol: TTTSymbol) {
        // TODO: fetch endpoint instead of setting game state directly when testing with server
        // TODO: set the proper symbol based on what symbol the current player is
        // TODO: return early if it's not the player's move
        gameState[index] = symbol;
        setGameState([...gameState]);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
    }

    return (
        <div>
            <Head>
                <title>Tic-Tac-Toe</title>
                <meta name="description" content="Tic-Tac-Toe." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="h-screen flex flex-col gap-8 items-center justify-center">
                <TicTacToeBoard gameState={gameState} setSquare={setSquare} playerSymbol={playerSymbol} />
                <p className="font-light">You are playing as <strong>{playerSymbol}</strong>. It is your move.</p>
            </main>
        </div>
    )
}
