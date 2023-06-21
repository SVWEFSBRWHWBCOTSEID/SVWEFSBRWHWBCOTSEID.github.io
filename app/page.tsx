import {Metadata} from 'next';


export const metadata: Metadata = {
    title: 'Stanley Zhong',
    description: 'Rabbit sign.'
}

export default function Home() {
    return (
        <div>
            <main className="h-screen flex items-center justify-center">
                <h1 className="text-7xl text-center font-bold bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent pb-4">
                    Stanley Zhong is cute.
                </h1>
            </main>
        </div>
    )
}
