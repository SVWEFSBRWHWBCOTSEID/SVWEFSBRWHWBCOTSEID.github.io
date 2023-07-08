'use client'

import {useEffect, useState} from 'react';
import {Duration} from 'luxon';

// Components
import Chat from '../Chat';
import GameHeader from '../GameHeader';
import GameStateIndicator from '../GameStateIndicator';
import UltimateTicTacToeBoard, {
    ANY_BOARD,
    defaultUTTTBoard,
    defaultUTTTBoardStatuses,
    UTTTBoard,
    UTTTBoardStatuses
} from './UltimateTicTacToeBoard';

// Utilities
import {BoardStatus, checkBoardStatus, TTTBoard, TTTSymbol} from './TicTacToeBoard';
import type {GameInfo} from './page';


export default function UltimateTicTacToeGame(props: {info: GameInfo}) {
    const [gameState, setGameState] = useState(defaultUTTTBoard);
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
    const [gameStatuses, setGameStatuses] = useState(defaultUTTTBoardStatuses);
    const [activeBoard, setActiveBoard] = useState(4);

    const [playerSymbol, setPlayerSymbol] = useState<TTTSymbol>('✕');

    const [ftime, setFtime] = useState(Duration.fromObject({minutes: 3, seconds: 23, milliseconds: 200}));
    const [stime, setStime] = useState(Duration.fromObject({minutes: 1, seconds: 20, milliseconds: 200}));

    useEffect(() => {
        const intervalID = setInterval(() => {
            const setActiveTime = playerSymbol === '✕' ? setFtime : setStime;

            setActiveTime((time) => {
                const decremented = time.minus(100).normalize();
                return decremented.toMillis() > 0 ? decremented : Duration.fromMillis(0)
            });
        }, 100)

        return () => clearInterval(intervalID);
    }, [playerSymbol])

    // Makes a move by checking the given square in the given board,
    // alternating the player's symbol and setting the new active square after each move.
    function setSquare(board: number, square: number, symbol: TTTSymbol) {
        const newGameState: UTTTBoard = [...gameState];
        const newBoard: TTTBoard = [...newGameState[board]];
        newBoard[square] = symbol;
        newGameState[board] = newBoard;

        setGameState(newGameState);
        setPlayerSymbol(playerSymbol === '✕' ? '◯' : '✕');
        setActiveBoard(gameStatuses[square] !== BoardStatus.PLAYING ? ANY_BOARD : square);
    }

    // Handles a board status change by updating the statuses array.
    function handleBoardStatusChange(board: number, status: BoardStatus) {
        const newGameStatuses: UTTTBoardStatuses = [...gameStatuses];
        newGameStatuses[board] = status;
        setGameStatuses(newGameStatuses);

        // TODO: should we store board statuses as an array of symbols so that it's easier for
        // board checking and symbol displaying? Is there anywhere where having a `BoardStatus`
        // for each cell is *required*?
        setGameStatus(
            checkBoardStatus(newGameStatuses.map(status => (
                status === BoardStatus.X_VICTORY ? '✕'
                    : status === BoardStatus.O_VICTORY ? '◯'
                        : ''
            )) as TTTBoard)
        )
    }

    return (
        <>
            <div className="flex flex-col gap-5 w-[21rem]">
                <GameHeader info={props.info} />
                <Chat />
            </div>

            <UltimateTicTacToeBoard
                gameState={gameState}
                gameStatuses={gameStatuses}
                playerSymbol={playerSymbol}
                activeBoard={activeBoard}
                setSquare={setSquare}
                setBoardStatus={handleBoardStatusChange}
                disabled={gameStatus !== BoardStatus.PLAYING}
            />

            <GameStateIndicator
                ftime={ftime}
                stime={stime}
                {...props.info}
            />
        </>
    )
}
