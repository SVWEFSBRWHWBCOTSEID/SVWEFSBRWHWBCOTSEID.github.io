import {MouseEventHandler, ReactNode} from 'react';
import {createGame} from '../../util/game';
import type {GameNameInfo} from '../game/[id]/page';


type QuickPairingButtonProps = {game: string, children?: ReactNode, onClick?: MouseEventHandler<HTMLButtonElement>}
export default function QuickPairingButton(props: QuickPairingButtonProps) {
    return (
        <button
            className="flex flex-col gap-1.5 items-center justify-center rounded font-light text-secondary hover:text-[#ccc] border border-tertiary p-6 bg-content-secondary/50 hover:bg-theme-orange/20 transition duration-200"
            onClick={props.onClick}
        >
            {props.children && <h3 className="text-3xl sm:text-4xl">{props.children}</h3>}
            <h4 className="text-lg sm:text-xl">{props.game}</h4>
        </button>
    )
}

type QuickPairingPresetButtonProps = {game: GameNameInfo, minutes: number, increment: number};
export function QuickPairingPresetButton(props: QuickPairingPresetButtonProps) {
    return (
        <QuickPairingButton
            game={props.game.name}
            onClick={() => createGame(props.game.key, 1337, props.minutes, props.increment)}
        >
            {props.minutes}+{props.increment}
        </QuickPairingButton>
    )
}
