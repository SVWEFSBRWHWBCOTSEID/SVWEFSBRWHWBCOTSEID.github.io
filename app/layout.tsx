import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';

// Components
import Header from './Header';
import PlayingBanner from './PlayingBanner';
import UserProvider from '@/components/UserProvider';
import PreferencesProvider from '@/components/PreferencesProvider';
import ConversationProvider from '@/components/ConversationProvider';
import ChallengesProvider from '@/components/ChallengesProvider';
import CurrentTimeProvider from '@/components/CurrentTimeProvider';

// Utils
import { getUser } from '@/util/user';

import '@/styles/styles.css'


export const metadata: Metadata = {
    title: {
        template: '%s | gulpin.games',
        absolute: 'gulpin.games'
    },
    description: 'Free online Tic-Tac-Toe, Ultimate Tic-Tac-Toe, Pokemon Chess, and other silly games server. Play with friends or random opponents!'
}

const inter = Inter({
    subsets: ['latin']
});

export default async function Layout(props: { children: ReactNode }) {
    const username = cookies().get('username')?.value;

    // If a username cookie is already set, preload the referenced user.
    const user = username
        ? await getUser(username)
        : null

    return (
        <html className="dark h-full scroll-smooth">
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.png" />
            </head>
            <body className="text-white h-full flex flex-col bg-background bg-gradient-to-b from-[hsl(37,_12%,_16%)] to-[116px] to-[hsl(37,_10%,_8%)] bg-no-repeat" style={inter.style}>
                <UserProvider user={user}>
                    <PreferencesProvider>
                        <ConversationProvider>
                            <ChallengesProvider>
                                <CurrentTimeProvider>
                                    <Header />
                                    <PlayingBanner />

                                    {props.children}
                                </CurrentTimeProvider>
                            </ChallengesProvider>
                        </ConversationProvider>
                    </PreferencesProvider>
                </UserProvider>
            </body>
        </html>
    )
}
