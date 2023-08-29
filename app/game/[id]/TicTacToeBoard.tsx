'use client'

import {ReactNode} from 'react';
import {toDisplayTTTSymbol} from './TicTacToeGame';


export enum PlayerSymbol {
    EMPTY, FIRST, SECOND
}
export type TTTBoard = [
    PlayerSymbol, PlayerSymbol, PlayerSymbol,
    PlayerSymbol, PlayerSymbol, PlayerSymbol,
    PlayerSymbol, PlayerSymbol, PlayerSymbol
];
export const defaultTTTBoard: TTTBoard = [
    PlayerSymbol.EMPTY, PlayerSymbol.EMPTY, PlayerSymbol.EMPTY,
    PlayerSymbol.EMPTY, PlayerSymbol.EMPTY, PlayerSymbol.EMPTY,
    PlayerSymbol.EMPTY, PlayerSymbol.EMPTY, PlayerSymbol.EMPTY
];

export enum BoardStatus {
    PLAYING, TIED, FIRST_VICTORY, SECOND_VICTORY
}

type TicTacToeBoardProps = {
    boardState: PlayerSymbol[],
    playerSymbol: PlayerSymbol,
    setSquare: (square: number, symbol: PlayerSymbol) => void,
    small?: boolean,
    disabled: boolean,
    over: boolean,
    rows?: number,
    columns?: number
};
export default function TicTacToeBoard(props: TicTacToeBoardProps) {
    const {small, disabled, over} = props;

    const rows = props.rows ?? 3;
    const columns = props.columns ?? 3;

    return (
        <TicTacToeGrid disabled={disabled} over={over} small={small}>
            {Array(rows).fill(0).map((_, i) => (
                <TicTacToeRow small={small} key={i}>
                    {Array(columns).fill(0).map((_, j) => (
                        <TicTacToeCell {...props} id={columns * i + j} key={columns * i + j} />
                    ))}
                </TicTacToeRow>
            ))}
        </TicTacToeGrid>
    )
}

export function TicTacToeGrid(props: {children: ReactNode, small?: boolean, disabled: boolean, over: boolean}) {
    return (
        <div className={'flex flex-col divide-white/30 transition-opacity duration-500 ' + (props.small ? 'divide-y-4' : 'divide-y-8') + (props.over ? ' opacity-30' : '')}>
            {props.children}
        </div>
    )
}

export function TicTacToeRow(props: {children: ReactNode, small?: boolean,}) {
    return (
        <div className={'flex divide-white/30 ' + (props.small ? 'divide-x-4' : 'divide-x-8')}>
            {props.children}
        </div>
    )
}

function TicTacToeCell(props: TicTacToeBoardProps & {id: number}) {
    const {boardState, playerSymbol, setSquare, small, disabled, id} = props;

    const symbol = boardState[id]; // The actual state of the cell
    const displaySymbol = symbol || playerSymbol; // The symbol to display in the <span>

    return (
        <button
            className={'group font-bold text-center box-content ' + (small ? 'w-16 h-16 text-3xl ' : 'w-36 h-36 text-7xl ') + (displaySymbol === PlayerSymbol.FIRST ? 'text-red-400' : 'text-blue-400')}
            disabled={disabled || !!symbol} // TODO: disable the button if it's not the player's move
            onClick={() => setSquare(id, playerSymbol)}
        >
            <span className={(small ? 'p-4' : 'p-8') + (!symbol ? ' opacity-0 hover:opacity-50 group-disabled:opacity-0' : '')}>
                {toDisplayTTTSymbol(displaySymbol)}
            </span>
        </button>
    )
}

// Checks a board for whether someone has won or the game has tied.
export function checkBoardStatus(move: number, board: PlayerSymbol[], rows = 3, columns = 3, needed = 3) {
    // Row
    const rowStart = move - (move % columns)
    for (
        let i = Math.max(move - needed, rowStart);
        i < Math.min(move + needed, rowStart + columns);
        i++
    ) {
        let cond = !!board[i];
        for (let j = 1; j < needed; j++)
            cond = cond && board[i] === board[i + j];

        if (cond) return board[i] === PlayerSymbol.FIRST
            ? BoardStatus.FIRST_VICTORY
            : BoardStatus.SECOND_VICTORY;
    }

    // Column
    const colStart = move % columns;
    for (
        let i = Math.max(move - (needed * columns), colStart);
        i < Math.min(move + (needed * columns) + 1, board.length);
        i += columns
    ) {
        let cond = !!board[i];
        for (let j = 1; j < needed; j++)
            cond = cond && board[i] === board[i + (j * columns)];

        if (cond) return board[i] === PlayerSymbol.FIRST
            ? BoardStatus.FIRST_VICTORY
            : BoardStatus.SECOND_VICTORY;
    }

    // Diagonal
    const rowNum = rowStart / columns;
    const diagStart = rowNum > colStart
        ? (rowNum - colStart) * columns
        : colStart - rowNum

    if (Math.min(rows, columns) - Math.abs(rowNum - colStart) >= needed) for (
        let i = diagStart;
        i < Math.min(move + (needed * (columns + 1)) + 1, board.length);
        i += columns + 1
    ) {
        let cond = !!board[i];
        for (let j = 1; j < needed; j++)
            cond = cond && board[i] === board[i + (j * (columns + 1))];

        if (cond) return board[i] === PlayerSymbol.FIRST
            ? BoardStatus.FIRST_VICTORY
            : BoardStatus.SECOND_VICTORY;
    }

    // Anti-diagonal
    const antiDiagStart = rowNum + colStart >= columns
        ? ((rowNum + colStart) - (columns - 1)) * columns + (columns - 1)
        : rowNum + colStart

    // TODO: rows check?
    if (antiDiagStart >= needed - 1) for (
        let i = antiDiagStart;
        i < Math.min(move + (needed * (columns - 1)) + 1, board.length);
        i += columns - 1
    ) {
        let cond = !!board[i];
        for (let j = 1; j < needed; j++)
            cond = cond && board[i] === board[i + (j * (columns - 1))];

        if (cond) return board[i] === PlayerSymbol.FIRST
            ? BoardStatus.FIRST_VICTORY
            : BoardStatus.SECOND_VICTORY;
    }

    // If the board is full and no one has won, it's a tie
    // TODO: replace with move number?
    if (board.every(x => x)) return BoardStatus.TIED;

    return BoardStatus.PLAYING;
}
