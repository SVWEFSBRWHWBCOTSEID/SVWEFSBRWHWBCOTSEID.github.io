'use client'

import Game, {UpdateGameStatesCallbacks} from './Game';
import UltimateTicTacToeBoard, {
    ANY_BOARD,
    defaultUTTTBoard,
    defaultUTTTBoardStatuses,
    UTTTBoard,
    UTTTBoardStatuses
} from './UltimateTicTacToeBoard';

// Utilities
import {BoardStatus, checkBoardStatus, TTTBoard, PlayerSymbol} from './TicTacToeBoard';
import {alternatePlayerSymbol, colToIndex, getPlayerSymbolFromSide, indexToCol, rowToIndex} from './TicTacToeGame';
import type {GameInfo} from './page';


// Stuff all related states into one object to avoid nested `setState()`s when generating game data from moves.
// TODO: better name?
type CombinedUTTTBoard = {
    state: UTTTBoard,
    statuses: UTTTBoardStatuses,
    activeBoard: number
};
const defaultCombinedUTTTBoard: CombinedUTTTBoard = {
    state: defaultUTTTBoard,
    statuses: defaultUTTTBoardStatuses,
    activeBoard: 4
}

export default function UltimateTicTacToeGame(props: {id: string, username?: string, info: GameInfo}) {
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
    }

    function updateGameStatesFromMoves(moves: string[], {setGameStates, setGameStateIndex}: UpdateGameStatesCallbacks<CombinedUTTTBoard>) {
        setGameStates((gameStates) => {
            const arr = gameStates.slice();
            let symbol = arr.length % 2 === 0 ? PlayerSymbol.SECOND : PlayerSymbol.FIRST;

            for (let i = 0; i < moves.length; i++) {
                const [, boardCol, boardRow, squareCol, squareRow] = moves[i].match(/(\w)(\d)(\w)(\d)/)!;
                const outer = rowToIndex(boardRow) + colToIndex(boardCol);
                const inner = rowToIndex(squareRow) + colToIndex(squareCol);

                const board = {...arr.at(-1)!};
                const state = board.state.slice() as UTTTBoard;
                const statuses = board.statuses.slice() as UTTTBoardStatuses;

                // 1. Set the square on the inner board to the given player symbol
                const innerState = state[outer].slice() as TTTBoard;
                innerState[inner] = symbol;
                state[outer] = innerState;

                // 2. Update the inner board status, and only then
                // 3. Update the active board
                statuses[outer] = checkBoardStatus(inner, state[outer]);
                const activeBoard = statuses[inner] !== BoardStatus.PLAYING ? ANY_BOARD : inner;

                arr.push({state, statuses, activeBoard});
                symbol = alternatePlayerSymbol(symbol);
            }

            // If the player is viewing the last move, keep them on the last move when new moves are added
            setGameStateIndex((gameStateIndex) => gameStateIndex === gameStates.length - 1 ? arr.length - 1 : gameStateIndex);

            console.log(arr);
            return arr;
        });
    }

    return (
        <Game {...props} defaultBoard={defaultCombinedUTTTBoard} updateGameStatesFromMoves={updateGameStatesFromMoves}>
            {(gameStates, gameStateIndex, gameStatus, side) => (
                <UltimateTicTacToeBoard
                    gameState={gameStates[gameStateIndex].state}
                    gameStatuses={gameStates[gameStateIndex].statuses}
                    playerSymbol={getPlayerSymbolFromSide(side)}
                    activeBoard={gameStates[gameStateIndex].activeBoard}
                    setSquare={setSquare}
                    disabled={gameStatus !== 'STARTED' || gameStateIndex !== gameStates.length - 1 || side === 'SPECTATOR'}
                    over={gameStatus !== 'STARTED' && gameStateIndex === gameStates.length - 1}
                />
            )}
        </Game>
    )
}
