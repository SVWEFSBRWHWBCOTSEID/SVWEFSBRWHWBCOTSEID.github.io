import {ReactNode} from 'react';


export default function QuickPairingButton(props: {children?: ReactNode, game: string}) {
    return (
        <div className="flex flex-col gap-1.5 items-center justify-center rounded font-light text-secondary hover:text-[#ccc] border border-tertiary p-6 bg-content-secondary/50 hover:bg-theme-orange/20 transition duration-200">
            {props.children && <h3 className="text-4xl">{props.children}</h3>}
            <h4 className="text-xl">{props.game}</h4>
        </div>
    )
}
