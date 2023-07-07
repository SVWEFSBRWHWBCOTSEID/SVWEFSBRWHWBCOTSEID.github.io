import {Fragment, ReactNode} from 'react';


export type GameMoveHistoryProps = {moves: string[], index: number, setIndex: (i: number) => void}
export default function GameMoveHistory(props: GameMoveHistoryProps) {
    return (
        <>
            <div className="bg-content-secondary px-5 py-1.5 border-b border-tertiary">
                aaa
            </div>
            <div className="h-36 overflow-auto">
                <div className="grid grid-cols-[4rem_1fr_1fr] h-max">
                    {Array(Math.ceil(props.moves.length / 2)).fill(0).map((_, index) => index * 2).map(begin => props.moves.slice(begin, begin + 2)).map((chunk, i) => (
                        <Fragment key={i}>
                            <div className="text-secondary bg-content-secondary flex items-center justify-center font-light">{i + 1}</div>
                            {chunk.map((move, j) => (
                                <GameMove index={i * 2 + j + 1} currentIndex={props.index} setIndex={props.setIndex} key={i * 2 + j + 1}>
                                    {move}
                                </GameMove>
                            ))}
                        </Fragment>
                    ))}
                </div>
            </div>
        </>
    )
}

function GameMove(props: {index: number, currentIndex: number, setIndex: (i: number) => void, children: ReactNode}) {
    const active = props.index === props.currentIndex;

    return (
        <button
            className={'px-4 py-1 text-sm ' + (active ? 'bg-[#293a49]' : 'hover:bg-blue-500')}
            onClick={() => props.setIndex(props.index)}
        >
            {props.children}
        </button>
    )
}
