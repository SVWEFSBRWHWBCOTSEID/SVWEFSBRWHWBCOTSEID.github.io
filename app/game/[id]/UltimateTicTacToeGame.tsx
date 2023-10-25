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
import {BoardStatus, checkBoardStatus, PlayerSymbol, TTTBoard} from './TicTacToeBoard';
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

    function updateGameStatesFromMoves(moves: string[], {setGameStates, setGameStateIndex, reset}: UpdateGameStatesCallbacks<CombinedUTTTBoard>) {
        const styledMoves: string[] = [];

        setGameStates((gameStates) => {
            const arr = reset ? [defaultCombinedUTTTBoard] : gameStates.slice();
            let symbol = arr.length % 2 === 0 ? PlayerSymbol.SECOND : PlayerSymbol.FIRST;
            let anyBoard = false;

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
                const innerStatus = checkBoardStatus(inner, state[outer]);
                statuses[outer] = innerStatus;
                const activeBoard = statuses[inner] !== BoardStatus.PLAYING ? ANY_BOARD : inner;

                // Style moves based on whether an inner board was taken, whether it's a checkmate or not, and whether
                // the first set of coordinates is needed to disambiguate the currently active board
                const outerStatus = checkBoardStatus(outer, statuses.map(status => (
                    status === BoardStatus.FIRST_VICTORY ? PlayerSymbol.FIRST
                    : status === BoardStatus.SECOND_VICTORY ? PlayerSymbol.SECOND
                    : PlayerSymbol.EMPTY
                )))
                const moveBase = anyBoard ? moves[i] : moves[i].slice(2);
                styledMoves.push(
                    outerStatus === BoardStatus.FIRST_VICTORY || outerStatus === BoardStatus.SECOND_VICTORY ? moveBase + '#'
                    : innerStatus === BoardStatus.FIRST_VICTORY || innerStatus === BoardStatus.SECOND_VICTORY ? moveBase + '!'
                    : moveBase
                );
                anyBoard = statuses[inner] !== BoardStatus.PLAYING;

                arr.push({state, statuses, activeBoard});
                symbol = alternatePlayerSymbol(symbol);
            }

            // If the player is viewing the last move, keep them on the last move when new moves are added
            setGameStateIndex((gameStateIndex) => gameStateIndex === gameStates.length - 1 ? arr.length - 1 : gameStateIndex);

            console.log(arr);
            return arr;
        });

        return styledMoves;
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
