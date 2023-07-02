import {Metadata} from 'next';
import ProfileContent from './ProfileContent';
import {getServerSession} from 'next-auth';
import {authOptions} from '../api/auth/[...nextauth]/route';


export const metadata: Metadata = {
    title: 'kepler'
}

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session) return;

    return <ProfileContent user={session.data} />
}
