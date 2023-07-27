import {MouseEventHandler, ReactNode, useContext} from 'react';
import {useHotkeys} from 'react-hotkeys-hook';
import {MdFastForward, MdFastRewind, MdSkipNext, MdSkipPrevious} from 'react-icons/md';
import GameContext from '../../contexts/GameContext';


export default function GameMoveHistoryHeader() {
    const {moves, gameStateIndex, setGameStateIndex} = useContext(GameContext);

    useHotkeys('left', () => setGameStateIndex(Math.max(gameStateIndex - 1, 1)), [gameStateIndex]);
    useHotkeys('right', () => setGameStateIndex(Math.min(gameStateIndex + 1, moves.length)), [gameStateIndex]);

    return (
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
