import {Metadata} from 'next';
import Lobby from '../components/Lobby';
import {ReactNode} from 'react';


export const metadata: Metadata = {
    title: '[game website]',
    description: 'todo'
}

export default function Home() {
    return (
        <main className="container pt-16 flex gap-8">
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-center mb-2">Lobbies</h3>
                <Lobby />
            </div>
            <div className="flex flex-col gap-2.5">
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
        <button className="px-16 py-3 bg-[#302e2c] rounded uppercase text-secondary">
            {props.children}
        </button>
    )
}
