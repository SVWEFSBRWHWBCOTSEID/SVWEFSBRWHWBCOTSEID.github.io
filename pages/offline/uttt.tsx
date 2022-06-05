import {useState} from 'react';
import Head from 'next/head';
import {BoardStatus, checkBoardStatus, TTTBoard, TTTSymbol} from '../../components/TicTacToeBoard';
import UltimateTicTacToeBoard, {
    defaultUTTTBoard,
    defaultUTTTBoardStatuses,
    UTTTBoard,
    UTTTBoardStatuses
} from '../../components/UltimateTicTacToeBoard';


export default function OfflineUltimateTicTacToe() {
    const [gameState, setGameState] = useState<UTTTBoard>([...defaultUTTTBoard]);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
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
        setActiveBoard(gameStatuses[square] !== BoardStatus.PLAYING ? 9 : square);
    }

    // Handles a board status change by updating the statuses array.
    function handleBoardStatusChange(board: number, status: BoardStatus) {
        gameStatuses[board] = status;
        setGameStatuses([...gameStatuses]);

        // TODO: should we store board statuses as an array of symbols so that it's easier for
        // board checking and symbol displaying? Is there anywhere where having a `BoardStatus`
        // for each cell is *required*?
        handleGameStatusChange(
            checkBoardStatus(gameStatuses.map(status => (
                status === BoardStatus.X_VICTORY ? '✕'
                    : status === BoardStatus.O_VICTORY ? '◯'
                    : ''
            )) as TTTBoard)
        )
    }

    // Handles a game status change by incrementing the player scores.
    // TODO: this is a duplicated code fragment, but abstraction would be hard
    function handleGameStatusChange(status: BoardStatus) {
        // Wins are +1 for the winner, ties are +0.5 for both players
        switch (status) {
            case BoardStatus.TIED: setScores([scores[0] + 0.5, scores[1] + 0.5]); break;
            case BoardStatus.X_VICTORY: setScores([scores[0] + 1, scores[1]]); break;
            case BoardStatus.O_VICTORY: setScores([scores[0], scores[1] + 1]); break;
        }
        setGameStatus(status);
    }

    // Starts a new game, resetting the board, status, and symbol, alternating start symbols;
    // if X started the last game, O starts the next game.
    function resetBoard() {
        setGameState([...defaultUTTTBoard]);
        setGameStatuses([...defaultUTTTBoardStatuses]);
        setPlayerSymbol(nextStartSymbol);
        setNextStartSymbol(nextStartSymbol === '✕' ? '◯' : '✕');
        setActiveBoard(4);
    }

    return (
        <main className="h-screen flex flex-col gap-8 items-center justify-center">
            <Head>
                <title>Offline Ultimate Tic-Tac-Toe</title>
                <meta name="description" content="Offline Ultimate Tic-Tac-Toe for single-device games." />
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
                setBoardStatus={handleBoardStatusChange}
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
