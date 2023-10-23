import type {Metadata} from 'next';
import ClockContent from './ClockContent';


export const metadata: Metadata = {
    title: 'Preferences'
}

export default function Preferences() {
    return <ClockContent />
}
