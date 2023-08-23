import {Metadata} from 'next';
import OfflineCustomTicTacToeGame from './OfflineCustomTicTacToeGame';


export const metadata: Metadata = {
    title: 'Offline Custom Tic-Tac-Toe',
    description: 'Offline custom-size Tic-Tac-Toe for single-device games.'
}

export default function OfflineCustomTicTacToe() {
    return <OfflineCustomTicTacToeGame />;
}
