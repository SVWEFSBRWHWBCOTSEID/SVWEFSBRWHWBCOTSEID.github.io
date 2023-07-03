import {Metadata} from 'next';
import ProfileContent from './ProfileContent';
import {getServerSession} from 'next-auth';
import {authOptions} from '../api/auth/[...nextauth]/route';
import {getUser} from '../../util/users';


export const metadata: Metadata = {
    title: 'kepler'
}

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.name) return; // TODO: use this instead of middleware?

    const user = await getUser(session.user.name);
    if (!user) return;

    return <ProfileContent user={user} />
}
