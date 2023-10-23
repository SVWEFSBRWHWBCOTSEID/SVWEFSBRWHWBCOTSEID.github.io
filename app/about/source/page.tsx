import type {Metadata} from 'next';
import InfoHeading from '../../../components/InfoHeading';


export const metadata: Metadata = {
    title: 'Source Code'
}

export default function SourceCode() {
    return (
        <>
            <h1 className="text-4xl mb-6 text-white">Source code</h1>
            <p className="mb-4">
                All of gulpin.games' code is open-sourced on our <a href="https://github.com/SVWEFSBRWHWBCOTSEID" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub organization</a>.
            </p>
            <p className="mb-12">
                Our frontend is built using TypeScript with <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Next.js</a>,
                and our backend is built using Rust and <a href="https://actix.rs/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Actix Web</a>.
                For more specific info on client/server architecture, contributing, and running the website locally, check out the
                READMEs of the repositories linked below.
            </p>

            <InfoHeading id="links">Links</InfoHeading>
            <ul className="list-disc list-outside pl-6">
                <li>
                    <a href="https://github.com/SVWEFSBRWHWBCOTSEID/game-website" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        SVWEFSBRWHWBCOTSEID/game-website
                    </a>{' '}
                    — the React frontend, written in Next.js and deployed on Vercel.
                </li>
                <li>
                    <a href="https://github.com/SVWEFSBRWHWBCOTSEID/game-website-backend" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        SVWEFSBRWHWBCOTSEID/game-website-backend
                    </a>{' '}
                    — the Rust backend, written in Actix Web and deployed on Fly.io.
                </li>
            </ul>
        </>
    )
}
