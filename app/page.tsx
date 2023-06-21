import {Metadata} from 'next';


export const metadata: Metadata = {
    title: '[game website]',
    description: 'todo'
}

export default function Home() {
    return (
        <main className="flex-grow flex items-center justify-center">
            <h1 className="text-7xl text-center font-bold pb-4">
                [todo]
            </h1>
        </main>
    )
}
