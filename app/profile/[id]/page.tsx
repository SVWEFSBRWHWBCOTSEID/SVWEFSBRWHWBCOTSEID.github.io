import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DateTime} from 'luxon';
import ProfileContent from '../ProfileContent';
import {User} from '../../../contexts/ProfileContext';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const data: User | null = await (await fetch(`${process.env.API_BASE}/api/user/${params.id}`)).json();
    if (!data) return {
        title: 'User not found'
    }

    const joinedAtDate = DateTime.fromSQL(data.createdAt);
    const games = Object.values(data.perfs).reduce((sum, perf) => sum + perf.games, 0);

    // TODO: rating
    return {
        title: `${params.id} (1337)`,
        description: `${params.id} joined on ${joinedAtDate.toLocaleString()} and has played ${games} games.` // TODO: rating?
    }
}

export default async function Profile({ params }: { params: { id: string } }) {
    const data: User | null = await (await fetch(`${process.env.API_BASE}/api/user/${params.id}`)).json();
    if (!data) notFound();

    return <ProfileContent user={data} />
}
