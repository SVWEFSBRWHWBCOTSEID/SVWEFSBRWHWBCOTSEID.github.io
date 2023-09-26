import type {Metadata} from 'next';
import OfflineConnect4Game from './OfflineConnect4Game';


export const metadata: Metadata = {
    title: 'Offline Connect 4',
    description: 'Offline Connect 4 for single-device games.'
}

export default function OfflineConnect4() {
    return <OfflineConnect4Game />;
}
