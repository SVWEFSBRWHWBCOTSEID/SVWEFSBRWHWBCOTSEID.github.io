import {useState} from 'react';
import Head from 'next/head';
import {BoardStatus, TTTBoard, TTTSymbol} from '../../components/TicTacToeBoard';
import UltimateTicTacToeBoard, {
    defaultUTTTBoard,
    defaultUTTTBoardStatuses,
    UTTTBoard, UTTTBoardStatuses
} from '../../components/UltimateTicTacToeBoard';


export default function OfflineUltimateTicTacToe() {
    const [gameState, setGameState] = useState<UTTTBoard>([...defaultUTTTBoard]);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING)
    const [gameStatuses, setGameStatuses] = useState<UTTTBoardStatuses>([...defaultUTTTBoardStatuses]);
    const [activeBoard, setActiveBoard] = useState(4);

    const [scores, setScores] = useState([0, 0]);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');
    const [nextStartSymbol, setNextStartSymbol] = useState<TTTSymbol>('◯');

    // Makes a move by checking the given square in the given board,
    // alternating the player's symbol and setting the new active square after each move.
    function setSquare(board: number, square: number, symbol: TTTSymbol) {
        const newBoard: TTTBoard = [...gameState[board]];
        newBoard[square] = symbol;
        gameState[board] = newBoard;

        setGameState([...gameState]);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
        setActiveBoard(square);
    }

    // Handles a board status change by updating the statuses array.
    function handleGameStatusChange(board: number, status: BoardStatus) {
        gameStatuses[board] = status;
        setGameStatuses([...gameStatuses]);
    }

    // Starts a new game, resetting the board, status, and symbol, alternating start symbols;
    // if X started the last game, O starts the next game.
    function resetBoard() {
        setGameState([...defaultUTTTBoard]);
        setGameStatuses([...defaultUTTTBoardStatuses]);
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

            <UltimateTicTacToeBoard
                gameState={gameState}
                gameStatuses={gameStatuses}
                playerSymbol={playerSymbol}
                activeBoard={activeBoard}
                setSquare={setSquare}
                setBoardStatus={handleGameStatusChange}
                disabled={gameStatus !== BoardStatus.PLAYING}
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
