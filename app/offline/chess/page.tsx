import type {Metadata} from 'next';
import ChessBoard from '../../game/[id]/ChessBoard';


export const metadata: Metadata = {
    title: 'Offline Chess',
    description: 'Offline Chess for single-device games.'
}

export default function OfflineConnect4() {
    return <ChessBoard />;
}
