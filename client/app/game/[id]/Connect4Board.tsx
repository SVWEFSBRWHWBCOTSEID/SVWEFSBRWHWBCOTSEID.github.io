'use client'

import {ReactNode} from 'react';
import {PlayerSymbol} from './TicTacToeBoard';


type Connect4BoardProps = {
    boardState: PlayerSymbol[],
    playerSymbol: PlayerSymbol,
    setColumn: (column: number) => void,
    disabled: boolean,
    over: boolean,
    rows?: number,
    columns?: number
};
export default function Connect4Board(props: Connect4BoardProps) {
    const {disabled, over} = props;

    const rows = props.rows ?? 6;
    const columns = props.columns ?? 7;

    return (
        <Connect4Grid disabled={disabled} over={over}>
            {Array(columns).fill(0).map((_, i) => (
                <Connect4Column {...props} id={i} key={i}>
                    {Array(rows).fill(0).map((_, j) => (
                        <Connect4Cell {...props} column={i} id={i + columns * j} key={i + columns * j} />
                    ))}
                </Connect4Column>
            ))}
        </Connect4Grid>
    )
}

export function Connect4Grid(props: {children: ReactNode, disabled: boolean, over: boolean}) {
    return (
        <div className={'flex divide-white/30 transition-opacity duration-500 divide-x-2 border-white/30 border-2' + (props.over ? ' opacity-30' : '')}>
            {props.children}
        </div>
    )
}

export function Connect4Column(props: Connect4BoardProps & {id: number, children: ReactNode}) {
    const {id, disabled, setColumn} = props;

    return (
        <button
            className="group flex flex-col-reverse divide-white/30 divide-y-2 divide-y-reverse hover:bg-white/5"
            disabled={disabled} // TODO: disable the button if it's not the player's move
            onClick={() => setColumn(id)}
        >
            {props.children}
        </button>
    )
}

function Connect4Cell(props: Connect4BoardProps & {column: number, id: number}) {
    const {boardState, playerSymbol, column, columns, id} = props;

    const symbol = boardState[id]; // The actual state of the cell
    const displaySymbol = symbol || playerSymbol; // The symbol to display in the <span>
    const isHighest = getNextUnfilledIndex(boardState, column, columns) === id;

    return (
        <div className="flex items-center justify-center box-content w-24 h-24">
            <div className={'w-16 h-16 rounded-full '  + (displaySymbol === PlayerSymbol.FIRST ? 'bg-red-400' : 'bg-yellow-400') + (!symbol ? isHighest ? ' opacity-0 group-hover:opacity-50 group-disabled:opacity-0' : ' opacity-0' : '')} />
        </div>
    )
}

// Gets the index of the next unfilled cell in a connect 4 column.
export function getNextUnfilledIndex(board: PlayerSymbol[], column: number, columns: number = 7) {
    for (let i = column; i < board.length; i += columns) {
        if (board[i] === PlayerSymbol.EMPTY) return i;
    }

    return -1;
}
