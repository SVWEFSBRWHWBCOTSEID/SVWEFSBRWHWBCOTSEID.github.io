import {Metadata} from 'next';
import OfflineCustomConnect4Game from './OfflineCustomConnect4Game';


export const metadata: Metadata = {
    title: 'Offline Custom Connect 4',
    description: 'Offline custom-size Connect 4 for single-device games.'
}

export default function OfflineConnect4() {
    return <OfflineCustomConnect4Game />;
}
