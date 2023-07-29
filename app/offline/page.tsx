import {Metadata} from 'next';
import GameCard from './GameCard';


export const metadata: Metadata = {
    title: 'Offline Games',
    description: 'Locally hosted games that don\'t require an account or internet connection to play.'
}

export default function Home() {
    return (
        <div className="container py-16">
            <h1 className="text-6xl text-center font-bold mb-4">
                Offline games
            </h1>
            <p className="text-center">
                Locally hosted games that don't require an account or internet connection to play.
            </p>
            <p className="text-center mb-8">
                In an offline game, all players take turns making moves on the same computer.
            </p>

            <section className="flex flex-wrap justify-center gap-6">
                {/* TODO: update images after UI changes */}
                <GameCard href="/offline/ttt" name="Tic-Tac-Toe" src="/examples/ttt.png" />
                <GameCard href="/offline/uttt" name="Ultimate Tic-Tac-Toe" src="/examples/uttt.png" />
            </section>
        </div>
    )
}
