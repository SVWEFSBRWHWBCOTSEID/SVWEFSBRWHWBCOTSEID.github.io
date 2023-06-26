import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import TicTacToeGame from './TicTacToeGame';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // TODO: fetch API
    return {
        title: `Correspondence Tic-Tac-Toe • kepler vs qpwoeirut`,
        description: `kepler (${params.id}) ...` // TODO
    }
}

export default function TicTacToe({ params }: { params: { id: string } }) {
    // TODO: fetch API, not-found
    if (params.id === 'test') notFound();
    return <TicTacToeGame />
}
