import {MouseEventHandler, ReactNode} from 'react';


type QuickPairingButtonProps = {game: string, children?: ReactNode, onClick?: MouseEventHandler<HTMLButtonElement>}
export default function QuickPairingButton(props: QuickPairingButtonProps) {
    return (
        <button
            className="flex flex-col gap-1.5 items-center justify-center rounded font-light text-secondary hover:text-[#ccc] border border-tertiary p-6 bg-content-secondary/50 hover:bg-theme-orange/20 transition duration-200"
            onClick={props.onClick}
        >
            {props.children && <h3 className="text-4xl">{props.children}</h3>}
            <h4 className="text-xl">{props.game}</h4>
        </button>
    )
}
