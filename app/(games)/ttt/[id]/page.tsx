import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import TicTacToeGame from './TicTacToeGame';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // TODO: fetch API
    return {
        title: {
            absolute: `Correspondence Tic-Tac-Toe • kepler vs qpwoeirut`
        },
        description: `kepler (${params.id}) vs qpwoeirut (${params.id}) in Casual 5+5 Tic-Tac-Toe.` // TODO
    }
}

export default function TicTacToe({ params }: { params: { id: string } }) {
    // TODO: fetch API, not-found
    if (params.id === 'test') notFound();
    return <TicTacToeGame />
}
