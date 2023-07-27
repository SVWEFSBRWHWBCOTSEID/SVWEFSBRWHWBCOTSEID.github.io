import {Fragment, MouseEventHandler, ReactNode, useContext} from 'react';
import {useHotkeys} from 'react-hotkeys-hook'
import {MdFastForward, MdFastRewind, MdSkipNext, MdSkipPrevious} from 'react-icons/md';
import GameContext from '../../contexts/GameContext';


export default function GameMoveHistory() {
    const {moves, gameStateIndex, setGameStateIndex} = useContext(GameContext);

    useHotkeys('left', () => setGameStateIndex(Math.max(gameStateIndex - 1, 1)), [gameStateIndex]);
    useHotkeys('right', () => setGameStateIndex(Math.min(gameStateIndex + 1, moves.length)), [gameStateIndex]);

    return (
        <>
            <div className="bg-content-secondary border-b border-tertiary flex justify-center text-secondary text-2xl shadow-xl">
                <HeaderButton
                    onClick={() => setGameStateIndex(1)}
                    disabled={gameStateIndex <= 1}
                >
                    <MdFastRewind />
                </HeaderButton>
                <HeaderButton
                    onClick={() => setGameStateIndex(Math.max(gameStateIndex - 1, 1))}
                    disabled={gameStateIndex <= 1}
                >
                    <MdSkipPrevious />
                </HeaderButton>
                <HeaderButton
                    onClick={() => setGameStateIndex(Math.min(gameStateIndex + 1, moves.length))}
                    disabled={gameStateIndex === moves.length}
                >
                    <MdSkipNext />
                </HeaderButton>
                <HeaderButton
                    onClick={() => setGameStateIndex(moves.length)}
                    disabled={gameStateIndex === moves.length}
                >
                    <MdFastForward />
                </HeaderButton>
            </div>
            <div className="flex-shrink overflow-auto mb-auto">
                <div className="grid grid-cols-[4rem_1fr_1fr] h-max">
                    {Array(Math.ceil(moves.length / 2)).fill(0).map((_, index) => index * 2).map(begin => moves.slice(begin, begin + 2)).map((chunk, i) => (
                        <Fragment key={i}>
                            <div className="text-secondary bg-content-secondary flex items-center justify-center font-light">{i + 1}</div>
                            {chunk.map((move, j) => (
                                <GameMove index={i * 2 + j + 1} currentIndex={gameStateIndex} setIndex={setGameStateIndex} key={i * 2 + j + 1}>
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
