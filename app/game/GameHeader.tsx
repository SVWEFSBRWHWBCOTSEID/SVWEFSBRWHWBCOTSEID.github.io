import Link from 'next/link';
import {BiCircle, BiSolidCircle} from 'react-icons/bi';

// Util
import {keyToIcon} from '../profile/ProfileSidebarItem';
import {timeControlToString} from '../../util/game';
import type {GameInfo, Player} from './[id]/page';


export default function GameHeader(props: {info: GameInfo}) {
    const {info} = props;
    const Icon = keyToIcon(info.game.key);

    return (
        <div className="bg-content rounded p-6 shadow-lg">
            <div className="flex gap-4 mb-2">
                <Icon className="text-4xl" />
                <div>
                    <p>
                        {timeControlToString(props.info.timeControl)} •{' '}
                        {info.rated ? 'Rated' : 'Casual'} •{' '}
                        <a
                            href={`/rules#${info.game.key}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 uppercase"
                        >
                            {info.game.name}
                        </a>
                    </p>
                    {/* TODO: parse createdAt timestamp, countdown clock */}
                    <p className="text-secondary text-sm">39 hours ago</p>
                </div>
            </div>

            <PlayerIndicator user={info.first} first />
            <PlayerIndicator user={info.second} />
        </div>
    )
}

function PlayerIndicator(props: { user: Player, first?: boolean }) {
    return (
        <div className="flex gap-2 items-center text-sm text-secondary">
            {props.first ? <BiSolidCircle /> : <BiCircle />}
            <Link
                className="flex-grow hover:text-blue-500"
                href={`/profile/${props.user.username}`}
            >
                {props.user.username}{props.user.rating && ` (${props.user.rating})`} {/* TODO */}
            </Link>
        </div>
    )
}
