import {ReactNode} from 'react';
import {Metadata} from 'next';
import QuickPairing from './QuickPairing';
import Lobbies from './Lobbies';


export const metadata: Metadata = {
    title: '[game website]',
    description: 'todo'
}

export default function Home() {
    return (
        <main className="container pt-16 pb-20 flex gap-8">
            <div className="flex-grow">
                {/* <h3 className="text-lg text-center font-medium mb-4">Quick Pairing</h3> */}
                <QuickPairing />

                <h3 className="text-lg text-center font-medium mb-2">Lobbies</h3>
                <Lobbies />
            </div>
            <div className="flex flex-col gap-3.5 sticky top-6 h-max">
                <SecondaryButton>Create a game</SecondaryButton>
                <SecondaryButton>Play with friend</SecondaryButton>

                <div className="mt-3 text-sm text-secondary">
                    <p><strong>41,600</strong> players</p>
                    <p><strong>18,005</strong> games in play</p>
                </div>
            </div>
        </main>
    )
}

function SecondaryButton(props: {children: ReactNode}) {
    return (
        <button className="px-16 py-3 bg-[#302e2c] hover:bg-[hsl(37,_7%,_25%)] text-secondary hover:text-[#ccc] transition duration-200 rounded uppercase">
            {props.children}
        </button>
    )
}
