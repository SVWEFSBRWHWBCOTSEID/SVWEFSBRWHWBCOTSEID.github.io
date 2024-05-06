import { Fragment, ReactNode, useContext } from 'react';
import GameContext from '../../contexts/GameContext';


export default function GameMoveHistory() {
    const { moves, gameStateIndex, setGameStateIndex } = useContext(GameContext);

    return (
        <div className="grid grid-cols-[4rem_1fr_1fr] h-max">
            {Array(Math.ceil(moves.length / 2)).fill(0).map((_, index) => index * 2).map(begin => moves.slice(begin, begin + 2)).map((chunk, i) => (
                <Fragment key={i}>
                    <div className="text-secondary bg-content-secondary flex items-center justify-center font-light select-none">
                        {i + 1}
                    </div>
                    {chunk.map((move, j) => (
                        <GameMove
                            index={i * 2 + j + 1}
                            currentIndex={gameStateIndex}
                            setIndex={setGameStateIndex}
                            key={i * 2 + j + 1}
                        >
                            {move}
                        </GameMove>
                    ))}
                </Fragment>
            ))}
        </div>
    )
}

function GameMove(props: { index: number, currentIndex: number, setIndex: (i: number) => void, children: ReactNode }) {
    const active = props.index === props.currentIndex;

    return (
        <button
            className={'px-4 py-1 text-sm ' + (active ? 'text-primary bg-[#293a49] font-semibold' : 'text-[#BABABA] hover:bg-blue-500 hover:text-white')}
            onClick={() => props.setIndex(props.index)}
        >
            {props.children}
        </button>
    )
}
