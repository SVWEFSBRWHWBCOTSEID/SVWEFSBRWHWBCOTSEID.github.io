import type {Metadata} from 'next';
import OfflineChessGame from './OfflineChessGame';


export const metadata: Metadata = {
    title: 'Offline Chess',
    description: 'Offline Chess for single-device games.'
}

export default function OfflineChess() {
    return <OfflineChessGame />;
}
