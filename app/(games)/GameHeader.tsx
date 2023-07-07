import Link from 'next/link';
import {GiPotato} from 'react-icons/gi';
import {keyToName} from '../profile/ProfileContent';
import type {GameKey} from '../../contexts/ProfileContext';
import type {GameFullEvent, GameUser} from './ttt/[id]/page';


export type GameInfo = Omit<GameFullEvent, 'type' | 'chat' | 'state'>;

export default function GameHeader(props: {game: GameKey} & GameInfo) {
    return (
        <div className="bg-content rounded p-6 shadow-lg">
            <div className="flex gap-4 mb-2">
                <GiPotato className="text-4xl" />
                <div>
                    <p>
                        {props.timeControl.initial / 60000}+{props.timeControl.increment / 1000} •
                        {props.rated ? 'Rated' : 'Casual'} •{' '}
                        <a
                            href={`/rules#${props.game}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 uppercase"
                        >
                            {keyToName(props.game)}
                        </a>
                    </p>
                    {/* TODO: parse createdAt timestamp, countdown clock */}
                    <p className="text-secondary text-sm">39 hours ago</p>
                </div>
            </div>

            <PlayerIndicator user={props.first} />
            <PlayerIndicator user={props.second} />
        </div>
    )
}

function PlayerIndicator(props: { user: GameUser }) {
    return (
        <div className="flex gap-2 text-sm">
            <Link
                className="flex-grow hover:text-blue-500"
                href={`/profile/${props.user.username}`}
            >
                {props.user.username}{props.user.rating && ` (${props.user.rating})`} {/* TODO */}
            </Link>
        </div>
    )
}
