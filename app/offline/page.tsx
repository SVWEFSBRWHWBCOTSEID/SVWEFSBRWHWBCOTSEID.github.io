import type {Metadata} from 'next';
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
                <GameCard href="/offline/ttt" name="Tic-Tac-Toe" src="/examples/ttt.png">
                    Classic, 3x3 Tic-Tac-Toe.
                </GameCard>
                <GameCard href="/offline/uttt" name="Ultimate Tic-Tac-Toe" src="/examples/uttt.png">
                    Tic-Tac-Toe within Tic-Tac-Toe! See <strong>Rules</strong> for more.
                </GameCard>
                <GameCard href="/offline/cttt" name="Custom Tic-Tac-Toe" src="/examples/cttt.png">
                    Custom-sized Tic-Tac-Toe, up to 10x10.
                </GameCard>
                <GameCard href="/offline/c4" name="Connect 4" src="/examples/c4.png">
                    Connect 4 in a row on a 6x7 board.
                </GameCard>
                <GameCard href="/offline/cc4" name="Custom Connect 4" src="/examples/cc4.png">
                    Custom-sized Connect 4, up to 20x20.
                </GameCard>
                <GameCard href="/offline/chess" name="Chess" src="/examples/chess.png">
                    Unlimited time, standard rules chess.
                </GameCard>
            </section>
        </div>
    )
}
