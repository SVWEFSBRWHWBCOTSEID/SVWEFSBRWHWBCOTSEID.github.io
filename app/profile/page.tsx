import {Metadata} from 'next';
import ProfileContent from './ProfileContent';
import {getServerSession} from 'next-auth';
import {authOptions} from '../api/auth/[...nextauth]/route';
import {getUser} from '../../util/users';
import {redirect} from 'next/navigation';


export const metadata: Metadata = {
    title: 'kepler'
}

export default async function Profile() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.name) redirect('/login');

    // TODO: hacky?
    redirect(`/profile/${session.user.name}`);

    /*
    const user = await getUser(session.user.name);
    if (!user) return;

    return <ProfileContent user={user} />
    */
}
