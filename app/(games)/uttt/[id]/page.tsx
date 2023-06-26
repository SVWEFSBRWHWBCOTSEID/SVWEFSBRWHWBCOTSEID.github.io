import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import UltimateTicTacToeGame from './UltimateTicTacToeGame';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // TODO: fetch API
    return {
        title: `Correspondence Ultimate Tic-Tac-Toe • kepler vs qpwoeirut`,
        description: `kepler (${params.id}) ...` // TODO
    }
}

export default function UltimateTicTacToe({ params }: { params: { id: string } }) {
    // TODO: fetch API, not-found
    if (params.id === 'test') notFound();
    return <UltimateTicTacToeGame />
}
