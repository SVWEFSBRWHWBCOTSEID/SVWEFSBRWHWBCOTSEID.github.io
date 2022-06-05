import {ReactNode} from 'react';


export type TTTSymbol = '✕' | '◯' | '';
export type TTTBoard = [
    TTTSymbol, TTTSymbol, TTTSymbol,
    TTTSymbol, TTTSymbol, TTTSymbol,
    TTTSymbol, TTTSymbol, TTTSymbol
];
export const defaultTTTBoard: TTTBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
];

export enum BoardStatus {
    PLAYING, TIED, X_VICTORY, O_VICTORY
}

type TicTacToeBoardProps = {
    boardState: TTTBoard,
    playerSymbol: TTTSymbol,
    setSquare: (square: number, symbol: TTTSymbol) => void,
    setBoardStatus: (status: BoardStatus) => void,
    small?: boolean,
    disabled: boolean
};
export default function TicTacToeBoard(props: TicTacToeBoardProps) {
    return (
        <TicTacToeGrid disabled={props.disabled} small={props.small}>
            <TicTacToeRow small={props.small}>
                <TicTacToeCell {...props} id={0} />
                <TicTacToeCell {...props} id={1} />
                <TicTacToeCell {...props} id={2} />
            </TicTacToeRow>
            <TicTacToeRow small={props.small}>
                <TicTacToeCell {...props} id={3} />
                <TicTacToeCell {...props} id={4} />
                <TicTacToeCell {...props} id={5} />
            </TicTacToeRow>
            <TicTacToeRow small={props.small}>
                <TicTacToeCell {...props} id={6} />
                <TicTacToeCell {...props} id={7} />
                <TicTacToeCell {...props} id={8} />
            </TicTacToeRow>
        </TicTacToeGrid>
    )
}

export function TicTacToeGrid(props: {children: ReactNode, small?: boolean, disabled: boolean}) {
    return (
        <div className={'flex flex-col divide-white/30 transition-opacity duration-500 ' + (props.small ? 'divide-y-4' : 'divide-y-8') + (props.disabled ? ' opacity-30' : '')}>
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
    const {boardState, playerSymbol, setSquare, setBoardStatus, small, disabled, id} = props;

    const symbol = boardState[id]; // The actual state of the cell
    const displaySymbol = symbol || playerSymbol; // The symbol to display in the <span>

    function handleClick() {
        setSquare(id, playerSymbol)

        // Check the status of the board to display whether someone has won or the game has tied.
        // TODO: implement victory checks
        if (boardState.every(x => x)) setBoardStatus(BoardStatus.TIED);
    }

    return (
        <button
            className={'font-bold text-center box-content ' + (small ? 'w-16 h-16 text-3xl ' : 'w-36 h-36 text-7xl ') + (displaySymbol === '✕' ? 'text-red-400' : 'text-blue-400')}
            disabled={disabled || !!symbol} // TODO: disable the button if it's not the player's move
            onClick={handleClick}
        >
            {/* TODO: don't display hover effect when disabled */}
            <span className={(small ? 'p-4' : 'p-8') + (!symbol ? ' opacity-0 hover:opacity-50' : '')}>
                {displaySymbol}
            </span>
        </button>
    )
}
