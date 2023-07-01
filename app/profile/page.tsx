import {Metadata} from 'next';
import ProfileContent from './ProfileContent';
import {defaultUser} from '../../contexts/ProfileContext';


export const metadata: Metadata = {
    title: 'kepler'
}

export default function Profile() {
    // TODO
    return <ProfileContent {...defaultUser} />
}
