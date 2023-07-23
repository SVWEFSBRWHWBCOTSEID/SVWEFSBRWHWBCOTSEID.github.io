'use client'

import {useState} from 'react';

// Components
import Game, {UpdateGameStatesCallbacks} from './Game';
import UltimateTicTacToeBoard, {
    ANY_BOARD,
    defaultUTTTBoard,
    defaultUTTTBoardStatuses,
    UTTTBoard,
    UTTTBoardStatuses
} from './UltimateTicTacToeBoard';

// Utilities
import {BoardStatus, checkBoardStatus, TTTBoard, TTTSymbol} from './TicTacToeBoard';
import {colToIndex, getTTTSymbolFromUsername, indexToCol, rowToIndex} from './TicTacToeGame';
import type {GameInfo} from './page';


export default function UltimateTicTacToeGame(props: {id: string, username?: string, info: GameInfo}) {
    const [gameStatus, setGameStatus] = useState(BoardStatus.PLAYING);
    const [gameStatuses, setGameStatuses] = useState(defaultUTTTBoardStatuses);
    const [activeBoard, setActiveBoard] = useState(4);

    const playerSymbol: TTTSymbol = getTTTSymbolFromUsername(props.username, props.info);

    // Makes a move by checking the given square in the given board.
    async function setSquare(board: number, square: number) {
        const boardCol = board % 3;
        const boardRow = (board - boardCol) / 3;
        const boardCell = `${indexToCol(boardCol)}${boardRow + 1}`;

        const squareCol = square % 3;
        const squareRow = (square - squareCol) / 3;
        const squareCell = `${indexToCol(squareCol)}${squareRow + 1}`;

        await fetch(`${process.env.API_BASE}/game/${props.id}/move/${boardCell}${squareCell}`, {
            method: 'POST',
            credentials: 'include'
        });

        // TODO
        setActiveBoard(gameStatuses[square] !== BoardStatus.PLAYING ? ANY_BOARD : square);
    }

    // Handles a board status change by updating the statuses array.
    // TODO
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

    function updateGameStatesFromMoves(moves: string[], {setGameStates, setGameStateIndex}: UpdateGameStatesCallbacks<UTTTBoard>) {
        setGameStates((gameStates) => {
            const arr = gameStates.slice();
            let symbol: TTTSymbol = arr.length % 2 === 0 ? '◯' : '✕';

            for (let i = 0; i < moves.length; i++) {
                const [, boardCol, boardRow, squareCol, squareRow] = moves[i].match(/(\w)(\d)(\w)(\d)/)!;
                const state = arr.at(-1)!.slice() as UTTTBoard;

                state[rowToIndex(boardRow) + colToIndex(boardCol)][rowToIndex(squareRow) + colToIndex(squareCol)] = symbol;
                arr.push(state);

                symbol = symbol === '✕' ? '◯' : '✕';
            }

            // If the player is viewing the last move, keep them on the last move when new moves are added
            setGameStateIndex((gameStateIndex) => gameStateIndex === gameStates.length - 1 ? arr.length - 1 : gameStateIndex);

            console.log(arr);
            return arr;
        });
    }

    return (
        <Game {...props} defaultBoard={defaultUTTTBoard} updateGameStatesFromMoves={updateGameStatesFromMoves}>
            {(gameStates, gameStateIndex) => (
                <UltimateTicTacToeBoard
                    gameState={gameStates[gameStateIndex]}
                    gameStatuses={gameStatuses}
                    playerSymbol={playerSymbol}
                    activeBoard={activeBoard}
                    setSquare={setSquare}
                    setBoardStatus={handleBoardStatusChange}
                    disabled={gameStatus !== BoardStatus.PLAYING || gameStateIndex !== gameStates.length - 1} // TODO
                />
            )}
        </Game>
    )
}
