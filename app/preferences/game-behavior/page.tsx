import type {Metadata} from 'next';
import GameBehaviorContent from './GameBehaviorContent';


export const metadata: Metadata = {
    title: 'Game behavior'
}

export default function GameBehavior() {
    return <GameBehaviorContent />
}
