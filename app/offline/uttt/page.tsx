import {Metadata} from 'next';
import OfflineUltimateTicTacToeGame from './OfflineUltimateTicTacToeGame';


export const metadata: Metadata = {
    title: 'Offline Ultimate Tic-Tac-Toe',
    description: 'Offline Ultimate Tic-Tac-Toe for single-device games.'
}

export default function OfflineUltimateTicTacToe() {
    return <OfflineUltimateTicTacToeGame />;
}
