import {BsGithub} from 'react-icons/bs';


export default function Footer() {
    return (
        <footer className="pt-14 pb-16 border-t border-gray-100 dark:border-zinc-700">
            <div className="container text-secondary dark:text-secondary-dark text-sm flex justify-between">
                <p>
                    gulpin.games is open-sourced on <a href="https://github.com/SVWEFSBRWHWBCOTSEID/game-website" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub</a>.
                    <br />
                    Copyright © 2023. All rights reserved.
                </p>
                <a href="https://github.com/SVWEFSBRWHWBCOTSEID/game-website" target="_blank" rel="noopener noreferrer" className="text-base">
                    <BsGithub className="my-auto h-full" />
                </a>
            </div>
        </footer>
    )
}
