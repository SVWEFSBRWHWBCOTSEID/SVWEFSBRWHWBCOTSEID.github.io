import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DateTime} from 'luxon';
import ProfileContent from '../ProfileContent';
import {getUser} from '../../../util/user';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const user = await getUser(params.id)
    if (!user) return {
        title: 'User not found'
    }

    const joinedAtDate = DateTime.fromSQL(user.createdAt);
    const games = Object.values(user.perfs).reduce((sum, perf) => sum + perf.games, 0);

    // TODO: rating
    return {
        title: `${params.id} (1337)`,
        description: `${params.id} joined on ${joinedAtDate.toLocaleString()} and has played ${games} games.` // TODO: rating?
    }
}

export default async function Profile({ params }: { params: { id: string } }) {
    const user = await getUser(params.id);

    if (!user) notFound();
    return <ProfileContent user={user} />
}
