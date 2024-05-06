import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

// Components
import InboxContent from '../InboxContent';

// Utils
import { getUser } from '../../../util/user';


// TODO: dynamic tab name?
export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    return {
        title: 'Inbox',
        description: `...`
    }
}

export default async function InboxPage({ params }: { params: { username: string } }) {
    const user = await getUser(params.username);
    if (!user) redirect('/inbox');

    return <InboxContent username={decodeURIComponent(params.username)} />
}
