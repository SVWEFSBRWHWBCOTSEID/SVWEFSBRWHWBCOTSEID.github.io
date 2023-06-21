import {ReactNode} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../styles/styles.css'


export default function Layout(props: {children: ReactNode}) {
    return (
        <html className="dark h-full">
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="bg-zinc-800 text-white h-full flex flex-col">
                <Header />
                {props.children}
            </body>
        </html>
    )
}
