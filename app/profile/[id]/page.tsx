import {Metadata} from 'next';
import {notFound} from 'next/navigation';
import ProfileContent from '../ProfileContent';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // TODO: fetch user object from backend with id
    return {
        title: params.id
    }
}

export default function Profile({ params }: { params: { id: string } }) {
    // TODO: fetch user object from backend with id
    if (params.id === 'test') notFound();
    return <ProfileContent id={params.id} />
}
