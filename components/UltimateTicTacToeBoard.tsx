import TicTacToeBoard, {
    BoardStatus,
    defaultTTTBoard,
    TicTacToeGrid,
    TicTacToeRow,
    TTTBoard,
    TTTSymbol
} from './TicTacToeBoard';


export type UTTTBoard = [
    TTTBoard, TTTBoard, TTTBoard,
    TTTBoard, TTTBoard, TTTBoard,
    TTTBoard, TTTBoard, TTTBoard
];
export const defaultUTTTBoard: UTTTBoard = [
    defaultTTTBoard, defaultTTTBoard, defaultTTTBoard,
    defaultTTTBoard, defaultTTTBoard, defaultTTTBoard,
    defaultTTTBoard, defaultTTTBoard, defaultTTTBoard
];

export type UTTTBoardStatuses = [
    BoardStatus, BoardStatus, BoardStatus,
    BoardStatus, BoardStatus, BoardStatus,
    BoardStatus, BoardStatus, BoardStatus
];
export const defaultUTTTBoardStatuses: UTTTBoardStatuses = [
    BoardStatus.PLAYING, BoardStatus.PLAYING, BoardStatus.PLAYING,
    BoardStatus.PLAYING, BoardStatus.PLAYING, BoardStatus.PLAYING,
    BoardStatus.PLAYING, BoardStatus.PLAYING, BoardStatus.PLAYING
];

export type UltimateTicTacToeBoardProps = {
    gameState: UTTTBoard,
    gameStatuses: UTTTBoardStatuses,
    playerSymbol: TTTSymbol,
    activeBoard: number,
    setSquare: (board: number, square: number, symbol: TTTSymbol) => void,
    setBoardStatus: (board: number, status: BoardStatus) => void,
    disabled: boolean
};
export default function UltimateTicTacToeBoard(props: UltimateTicTacToeBoardProps) {
    return (
        <TicTacToeGrid disabled={props.disabled}>
            <TicTacToeRow>
                <UltimateTicTacToeCell {...props} id={0} />
                <UltimateTicTacToeCell {...props} id={1} />
                <UltimateTicTacToeCell {...props} id={2} />
            </TicTacToeRow>
            <TicTacToeRow>
                <UltimateTicTacToeCell {...props} id={3} />
                <UltimateTicTacToeCell {...props} id={4} />
                <UltimateTicTacToeCell {...props} id={5} />
            </TicTacToeRow>
            <TicTacToeRow>
                <UltimateTicTacToeCell {...props} id={6} />
                <UltimateTicTacToeCell {...props} id={7} />
                <UltimateTicTacToeCell {...props} id={8} />
            </TicTacToeRow>
        </TicTacToeGrid>
    )
}

function UltimateTicTacToeCell(props: UltimateTicTacToeBoardProps & {id: number}) {
    const {gameState, gameStatuses, playerSymbol, activeBoard, setSquare, setBoardStatus, disabled, id} = props;

    const boardState = gameState[id];
    const boardStatus = gameStatuses[id];

    return (
        <span className="p-4">
            {boardStatus !== BoardStatus.PLAYING && (
                <span className="absolute inset-0 text-7xl font-bold">
                    {boardStatus === BoardStatus.X_VICTORY ? (
                        '✕'
                    ) : boardStatus === BoardStatus.O_VICTORY ? (
                        '◯'
                    ) : (
                        ''
                    )}
                </span>
            )}
            <TicTacToeBoard
                small
                boardState={boardState}
                playerSymbol={playerSymbol}
                setSquare={(square, symbol) => setSquare(id, square, symbol)}
                setBoardStatus={(status) => setBoardStatus(id, status)}
                disabled={disabled || boardStatus !== BoardStatus.PLAYING || id !== activeBoard}
            />
        </span>
    )
}
