import {ReactNode} from 'react';
import {Inter} from 'next/font/google';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/styles.css'


const inter = Inter({
    subsets: ['latin']
});

export default function Layout(props: {children: ReactNode}) {
    return (
        <html className="dark h-full">
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="bg-zinc-800 text-white h-full flex flex-col" style={inter.style}>
                <Header />
                {props.children}
            </body>
        </html>
    )
}
