import {ReactNode} from 'react';
import {Metadata} from 'next';
import {Inter} from 'next/font/google';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/styles.css'


export const metadata: Metadata = {
    title: {
        template: '%s | [game website]',
        default: '[game website]'
    }
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
            <body className="bg-background text-white h-full flex flex-col" style={inter.style}>
                <Header />
                {props.children}
            </body>
        </html>
    )
}
