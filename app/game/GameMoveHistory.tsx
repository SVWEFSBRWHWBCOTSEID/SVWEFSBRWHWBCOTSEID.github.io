import {Fragment, MouseEventHandler, ReactNode} from 'react';
import {useHotkeys} from 'react-hotkeys-hook'
import {MdFastForward, MdFastRewind, MdSkipNext, MdSkipPrevious} from 'react-icons/md';


export type GameMoveHistoryProps = {moves: string[], index: number, setIndex: (i: number) => void}
export default function GameMoveHistory(props: GameMoveHistoryProps) {
    const {moves, index, setIndex} = props;

    useHotkeys('left', () => setIndex(Math.max(index - 1, 1)), [index]);
    useHotkeys('right', () => setIndex(Math.min(index + 1, moves.length)), [index]);

    return (
        <>
            <div className="bg-content-secondary border-b border-tertiary flex justify-center text-secondary text-2xl">
                <HeaderButton
                    onClick={() => setIndex(1)}
                    disabled={index === 1}
                >
                    <MdFastRewind />
                </HeaderButton>
                <HeaderButton
                    onClick={() => setIndex(Math.max(index - 1, 1))}
                    disabled={index === 1}
                >
                    <MdSkipPrevious />
                </HeaderButton>
                <HeaderButton
                    onClick={() => setIndex(Math.min(index + 1, moves.length))}
                    disabled={index === moves.length}
                >
                    <MdSkipNext />
                </HeaderButton>
                <HeaderButton
                    onClick={() => setIndex(moves.length)}
                    disabled={index === moves.length}
                >
                    <MdFastForward />
                </HeaderButton>
            </div>
            <div className="flex-shrink overflow-auto mb-auto">
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

function HeaderButton(props: {onClick: MouseEventHandler<HTMLButtonElement>, disabled?: boolean, children: ReactNode}) {
    return (
        <button
            className="px-4 py-1.5 hover:bg-theme-green hover:text-white transition duration-150 disabled:opacity-30 disabled:hover:text-inherit disabled:hover:bg-transparent"
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}
