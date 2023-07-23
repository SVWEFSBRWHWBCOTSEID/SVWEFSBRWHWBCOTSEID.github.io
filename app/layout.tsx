import {ReactNode} from 'react';
import {Metadata} from 'next';
import {Inter} from 'next/font/google';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/styles.css'


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

export default function Layout(props: {children: ReactNode}) {
    return (
        <html className="dark h-full scroll-smooth">
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="text-white h-full flex flex-col bg-background bg-gradient-to-b from-[hsl(37,_12%,_16%)] to-[116px] to-[hsl(37,_10%,_8%)] bg-no-repeat" style={inter.style}>
                <Header />
                {props.children}
            </body>
        </html>
    )
}
