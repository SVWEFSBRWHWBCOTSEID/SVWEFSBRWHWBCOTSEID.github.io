import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import ProfileContent from '../ProfileContent';
import {User} from '../../../contexts/ProfileContext';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // TODO: fetch user object from backend with id
    return {
        title: `${params.id} (1337)`,
        description: '...' // TODO: bio?
    }
}

export default async function Profile({ params }: { params: { id: string } }) {
    const data: User | null = await (await fetch(`${process.env.API_BASE}/api/user/${params.id}`)).json();
    if (!data) notFound();

    return <ProfileContent {...data} />
}
