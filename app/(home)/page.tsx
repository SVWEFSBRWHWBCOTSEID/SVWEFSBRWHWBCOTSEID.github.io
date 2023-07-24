import {Metadata} from 'next';
import {cookies} from 'next/headers';

// Components
import QuickPairing from './QuickPairing';
import Lobbies from './Lobbies';
import CreateGameButton from './CreateGameButton';


export const metadata: Metadata = {
    description: 'todo'
}

export default function Home() {
    const username = cookies().get('username')?.value;

    return (
        <main className="container pt-16 pb-20 flex gap-8">
            <div className="flex-grow">
                {/* <h3 className="text-lg text-center font-medium mb-4">Quick Pairing</h3> */}
                <QuickPairing />

                <h3 className="text-lg text-center font-medium mb-2">Lobbies</h3>
                <Lobbies username={username} />
            </div>
            <div className="flex flex-col gap-3.5 sticky top-6 h-max">
                <CreateGameButton>Create a game</CreateGameButton>
                <CreateGameButton>Play with friend</CreateGameButton>

                <div className="mt-3 text-sm text-secondary">
                    <p><strong>41,600</strong> players</p>
                    <p><strong>18,005</strong> games in play</p>
                </div>
            </div>
        </main>
    )
}
