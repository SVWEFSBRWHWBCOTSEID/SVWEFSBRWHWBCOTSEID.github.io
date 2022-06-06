import {ReactNode} from 'react';
import Head from 'next/head';
import Link from 'next/link';


export default function Home() {
    return (
        <div>
            <Head>
                <title>Offline Games</title>
                <meta name="description" content="Rabbit sign." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="h-screen flex flex-col items-center justify-center">
                <h1 className="text-7xl text-center font-bold mb-4">
                    Offline games
                </h1>
                <p className="mb-8">
                    Locally hosted games that don't require a server connection to play.
                </p>

                <section className="flex flex-wrap justify-center gap-6">
                    <GameCard href="/offline/ttt">
                        <GameCardHeading>Tic-Tac-Toe</GameCardHeading>
                        <img src="./ttt.png" alt="ttt" className="w-72" />
                        <p>...</p>
                    </GameCard>

                    <GameCard href="/offline/uttt">
                        <GameCardHeading>Ultimate Tic-Tac-Toe</GameCardHeading>
                        <img src="./uttt.png" alt="uttt" className="w-72" />
                        <p>...</p>
                    </GameCard>
                </section>
            </main>
        </div>
    )
}

function GameCard(props: {href: string, children: ReactNode}) {
    return (
        <Link href={props.href}>
            <a className="flex">
                <div className="group px-6 py-4 rounded-lg shadow-lg bg-black/30 hover:bg-black/50 transition duration-150">
                    {props.children}
                </div>
            </a>
        </Link>
    )
}

function GameCardHeading(props: {children: ReactNode}) {
    return (
        <h3 className="text-lg font-medium mb-2 group-hover:underline">
            {props.children}
        </h3>
    )
}
