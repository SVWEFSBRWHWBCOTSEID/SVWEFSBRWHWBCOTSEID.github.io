import {ReactNode} from 'react';
import '../styles/styles.css'


export default function Layout(props: {children: ReactNode}) {
    return (
        <html className="dark">
            <head>
                <meta charSet="utf-8" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="bg-zinc-800 text-white">
                {props.children}
            </body>
        </html>
    )
}
