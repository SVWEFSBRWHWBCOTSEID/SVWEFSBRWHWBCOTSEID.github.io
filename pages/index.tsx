import Head from 'next/head';


export default function Home() {
    return (
        <div>
            <Head>
                <title>Stanley Zhong</title>
                <meta name="description" content="Rabbit sign." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="h-screen flex items-center justify-center">
                <h1 className="text-7xl text-center font-bold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent pb-4">
                    Stanley Zhong is cute.
                </h1>
            </main>
        </div>
    )
}
