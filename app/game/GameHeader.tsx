'use client'

import {useContext} from 'react';
import Link from 'next/link';
import GameContext from '../../contexts/GameContext';
import {BiCircle, BiSolidCircle} from 'react-icons/bi';

// Util
import {keyToIcon} from '../profile/ProfileSidebarItem';
import {timeControlToString} from '../../util/game';
import type {Player} from './[id]/page';


export default function GameHeader() {
    const {info, fratingDiff, sratingDiff} = useContext(GameContext);
    const Icon = keyToIcon(info.game.key);

    return (
        <div className="bg-content rounded p-6 shadow-lg">
            <div className="flex gap-4 mb-2">
                <Icon className="text-4xl" />
                <div>
                    <p>
                        {timeControlToString(info.timeControl)} •{' '}
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

            <PlayerIndicator user={info.first} first ratingDiff={fratingDiff} />
            <PlayerIndicator user={info.second} ratingDiff={sratingDiff} />
        </div>
    )
}

function PlayerIndicator(props: { user: Player, first?: boolean, ratingDiff: number }) {
    return (
        <div className="flex gap-2 items-center text-sm text-secondary">
            {props.first ? <BiSolidCircle /> : <BiCircle />}
            <Link
                className="flex-grow hover:text-blue-500"
                href={`/profile/${props.user.username}`}
            >
                {props.user.username}
                {props.user.rating && ` (${props.user.rating})`} {/* TODO */}
                {props.ratingDiff !== 0 && (
                    <span className={props.ratingDiff > 0 ? 'text-theme-green' : 'text-red-600'}>
                        {' '}{props.ratingDiff > 0 && '+'}{props.ratingDiff}
                    </span>
                )}
            </Link>
        </div>
    )
}
