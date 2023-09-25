'use client'

import InfoPanel from '../../components/InfoPanel';
import InfoHeading from '../../components/InfoHeading';


export default function AboutPanel() {
    return (
        <InfoPanel>
            <h1 className="text-4xl mb-6 text-white">About gulpin.games</h1>
            <p className="mb-4">
                gulpin.games is an open-source website for playing silly games online.
            </p>
            <p className="mb-12">[...]</p>

            <InfoHeading id="links">Links</InfoHeading>
            <ul className="list-disc list-outside pl-6">
                <li><a href="https://github.com/SVWEFSBRWHWBCOTSEID" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a></li>
            </ul>
        </InfoPanel>
    )
}
