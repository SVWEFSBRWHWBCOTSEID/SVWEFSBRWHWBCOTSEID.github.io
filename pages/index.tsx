import Head from 'next/head';


export default function Home() {
    return (
        <div>
            <Head>
                <title>Stanley Zhong</title>
                <meta name="description" content="Rabbit sign." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="text-7xl">Stanley Zhong is cute.</h1>
            </main>
        </div>
    )
}
