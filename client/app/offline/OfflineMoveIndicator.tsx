import {BoardStatus, PlayerSymbol} from '../game/[id]/TicTacToeBoard';
import type {ReactElement} from 'react';


type OfflineMoveIndicatorProps = {
    status: BoardStatus,
    currPlayer: PlayerSymbol,
    first: ReactElement,
    second: ReactElement,
    resetBoard: () => void
}
export default function OfflineMoveIndicator(props: OfflineMoveIndicatorProps) {
    return (
        <section className="relative">
            {props.status === BoardStatus.PLAYING ? (
                <p className="font-light flex gap-1.5 items-center">
                    You are playing as {props.currPlayer === PlayerSymbol.FIRST ? props.first : props.second}.
                    It is your move.
                </p>
            ) : props.status === BoardStatus.TIED ? (
                <p className="font-light">The game has tied.</p>
            ) : props.status === BoardStatus.FIRST_VICTORY ? (
                <p className="font-light flex gap-1.5 items-center">
                    {props.first} has won!
                </p>
            ) : (
                <p className="font-light flex gap-1.5 items-center">
                    {props.second} has won!
                </p>
            )}
            {props.status !== BoardStatus.PLAYING && (
                <button className="absolute top-8 inset-x-0" onClick={props.resetBoard}>
                    Play again
                </button>
            )}
        </section>
    )
}
