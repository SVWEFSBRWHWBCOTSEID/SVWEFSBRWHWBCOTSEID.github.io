import {GiPotato} from 'react-icons/gi';
import Link from 'next/link';


export default function GameHeader() {
    return (
        <div className="bg-content rounded p-6 shadow-lg">
            <div className="flex gap-4 mb-2">
                <GiPotato className="text-4xl" />
                <div>
                    <p>
                        5+5 • Casual •{' '}
                        <a
                            href="/rules#ttt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 uppercase"
                        >
                            Tic-Tac-Toe
                        </a>
                    </p>
                    <p className="text-secondary text-sm">39 hours ago</p>
                </div>
            </div>

            <PlayerIndicator username="qpwoeirut" id="qpwoeirut" />
            <PlayerIndicator username="kepler" id="kepler" rating={1337} />
        </div>
    )
}

function PlayerIndicator(props: {username: string, id: string, rating?: number}) {
    return (
        <div className="flex gap-2 text-sm">
            <Link
                className="flex-grow hover:text-blue-500"
                href={`/profile/${props.id}`}
            >
                {props.username}{props.rating && ` (${props.rating})`}
            </Link>

        </div>
    )
}
