import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import InboxContent from './InboxContent';


// TODO: dynamic tab name?
export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
    return {
        title: 'Inbox',
        description: `...`
    }
}

export default async function InboxPage() {
    return <InboxContent />
}
