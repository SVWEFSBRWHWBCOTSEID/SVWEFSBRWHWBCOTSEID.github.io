import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import HomeContent from './HomeContent';


export const metadata: Metadata = {
    description: 'todo'
}

export default function Home() {
    const username = cookies().get('username')?.value;
    return <HomeContent username={username} />;
}
