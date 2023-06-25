import {Metadata} from 'next';
import ProfileContent from '../ProfileContent';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    // TODO: fetch user object from backend with id
    return {
        title: params.id
    }
}

export default function Profile({ params }: { params: { id: string } }) {
    // TODO: fetch user object from backend with id
    return <ProfileContent id={params.id} />
}
