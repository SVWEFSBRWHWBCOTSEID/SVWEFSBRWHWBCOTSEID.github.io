import type {Metadata} from 'next';
import OfflineTicTacToeGame from './OfflineTicTacToeGame';


export const metadata: Metadata = {
    title: 'Offline Tic-Tac-Toe',
    description: 'Offline Tic-Tac-Toe for single-device games.'
}

export default function OfflineTicTacToe() {
    return <OfflineTicTacToeGame />;
}
