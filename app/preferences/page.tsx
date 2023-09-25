import type {Metadata} from 'next';
import PreferencesContent from './PreferencesContent';


export const metadata: Metadata = {
    title: 'Preferences'
}

export default function Preferences() {
    return <PreferencesContent />
}
