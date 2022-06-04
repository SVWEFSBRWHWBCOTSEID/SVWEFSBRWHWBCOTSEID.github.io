import {ReactNode, useEffect, useState} from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import {v4} from 'uuid';


type TTTSymbol = '✕' | '◯' | '';
type TTSBoard = [
    TTTSymbol, TTTSymbol, TTTSymbol,
    TTTSymbol, TTTSymbol, TTTSymbol,
    TTTSymbol, TTTSymbol, TTTSymbol
];
const defaultBoard: TTSBoard = [ // TODO: make this all empty when testing with actual games
    '✕', '', '',
    '✕', '✕', '◯',
    '', '', '◯'
]

export default function Home() {
    const router = useRouter();
    const {gameId} = router.query;

    const [gameState, setGameState] = useState(defaultBoard);

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

    return (
        <div>
            <Head>
                <title>Tic-Tac-Toe</title>
                <meta name="description" content="Tic-Tac-Toe." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="h-screen flex items-center justify-center">
                <TicTacToeBoard gameState={gameState} />
            </main>
        </div>
    )
}

function TicTacToeBoard(props: {gameState: TTSBoard}) {
    return (
        <div className="flex flex-col divide-y-8 divide-white/30 font-bold text-7xl">
            <TicTacToeRow>
                <TicTacToeCell symbol={props.gameState[0]} />
                <TicTacToeCell symbol={props.gameState[1]} />
                <TicTacToeCell symbol={props.gameState[2]} />
            </TicTacToeRow>
            <TicTacToeRow>
                <TicTacToeCell symbol={props.gameState[3]} />
                <TicTacToeCell symbol={props.gameState[4]} />
                <TicTacToeCell symbol={props.gameState[5]} />
            </TicTacToeRow>
            <TicTacToeRow>
                <TicTacToeCell symbol={props.gameState[6]} />
                <TicTacToeCell symbol={props.gameState[7]} />
                <TicTacToeCell symbol={props.gameState[8]} />
            </TicTacToeRow>
        </div>
    )
}

function TicTacToeRow(props: {children: ReactNode}) {
    return (
        <div className="flex divide-x-8 divide-white/30">
            {props.children}
        </div>
    )
}

function TicTacToeCell(props: {symbol: TTTSymbol}) {
    return (
        <span className={'w-36 text-center p-8 ' + (props.symbol === '✕' ? 'text-red-400' : props.symbol === '◯' ? 'text-blue-400' : 'cursor-pointer')}>
            {props.symbol}
        </span>
    )
}
