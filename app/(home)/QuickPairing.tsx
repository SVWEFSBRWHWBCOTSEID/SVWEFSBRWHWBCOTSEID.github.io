import {ReactNode} from 'react';


export default function QuickPairing() {
    return (
        <div className="grid grid-cols-3 gap-3 mb-8">
            <QuickPairingButton game="Tic-Tac-Toe">1+0</QuickPairingButton>
            <QuickPairingButton game="Tic-Tac-Toe">5+3</QuickPairingButton>
            <QuickPairingButton game="Tic-Tac-Toe">10+5</QuickPairingButton>

            <QuickPairingButton game="Ultimate Tic-Tac-Toe">1+0</QuickPairingButton>
            <QuickPairingButton game="Ultimate Tic-Tac-Toe">3+2</QuickPairingButton>
            <QuickPairingButton game="Ultimate Tic-Tac-Toe">5+3</QuickPairingButton>

            <QuickPairingButton game="Ultimate Tic-Tac-Toe">10+5</QuickPairingButton>
            <QuickPairingButton game="Ultimate Tic-Tac-Toe">30+0</QuickPairingButton>
            <QuickPairingButton game="Custom" />
        </div>
    )
}

function QuickPairingButton(props: {children?: ReactNode, game: string}) {
    return (
        <div className="flex flex-col gap-1.5 items-center justify-center rounded font-light text-secondary hover:text-[#ccc] border border-tertiary p-6 bg-content-secondary/50 hover:bg-theme-orange/20 transition duration-200">
            {props.children && <h3 className="text-4xl">{props.children}</h3>}
            <h4 className="text-xl">{props.game}</h4>
        </div>
    )
}
