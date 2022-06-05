import {ReactNode} from 'react';


export type TTTSymbol = '✕' | '◯' | '';
export type TTSBoard = [
    TTTSymbol, TTTSymbol, TTTSymbol,
    TTTSymbol, TTTSymbol, TTTSymbol,
    TTTSymbol, TTTSymbol, TTTSymbol
];
export const defaultBoard: TTSBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
];

type TicTacToeBoardProps = {
    gameState: TTSBoard,
    playerSymbol: TTTSymbol,
    setSquare: (index: number, symbol: TTTSymbol) => void
};
export default function TicTacToeBoard(props: TicTacToeBoardProps) {
    return (
        <div className="flex flex-col divide-y-8 divide-white/30">
            <TicTacToeRow>
                <TicTacToeCell {...props} id={0} />
                <TicTacToeCell {...props} id={1} />
                <TicTacToeCell {...props} id={2} />
            </TicTacToeRow>
            <TicTacToeRow>
                <TicTacToeCell {...props} id={3} />
                <TicTacToeCell {...props} id={4} />
                <TicTacToeCell {...props} id={5} />
            </TicTacToeRow>
            <TicTacToeRow>
                <TicTacToeCell {...props} id={6} />
                <TicTacToeCell {...props} id={7} />
                <TicTacToeCell {...props} id={8} />
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

function TicTacToeCell(props: TicTacToeBoardProps & {id: number}) {
    const {gameState, playerSymbol, setSquare, id} = props;

    const symbol = gameState[id]; // The actual state of the cell
    const displaySymbol = symbol || playerSymbol; // The symbol to display in the <span>

    return (
        <button
            className={'w-36 h-36 font-bold text-7xl text-center ' + (displaySymbol === '✕' ? 'text-red-400' : 'text-blue-400')}
            disabled={!!symbol} // TODO: disable the button if it's not the player's move
            onClick={() => setSquare(id, playerSymbol)}
        >
            <span className={'p-8' + (!symbol ? ' opacity-0 hover:opacity-50' : '')}>
                {displaySymbol}
            </span>
        </button>
    )
}
