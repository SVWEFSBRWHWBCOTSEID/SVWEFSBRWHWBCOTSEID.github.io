'use client'

import { useContext } from 'react';
import Link from 'next/link';
import { DateTime } from 'luxon';
import { BiCircle, BiSolidCircle } from 'react-icons/bi';

// Utils
import { keyToIcon } from '../profile/ProfileSidebarItem';
import { timeControlToString } from '../../util/game';
import { gameEndMessage } from './GameOverMessage';
import type { Player } from './[id]/page';

// Contexts
import GameContext from '../../contexts/GameContext';
import CurrentTimeContext from '../../contexts/CurrentTimeContext';


export default function GameHeader() {
    const { info, gameStatus, endType, fratingDiff, sratingDiff } = useContext(GameContext);
    const time = useContext(CurrentTimeContext);

    const Icon = keyToIcon(info.game.key);

    return (
        <div className="bg-content rounded p-6 shadow-lg h-max">
            <div className="flex gap-3 mb-2 text-primary">
                <Icon className="text-4xl flex-none" />
                <div>
                    <p className="text-sm">
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
                    <p className="text-secondary text-xs">
                        {DateTime.fromSQL(info.createdAt).toRelative({ base: time })}
                    </p>
                </div>
            </div>

            <PlayerIndicator user={info.first} first ratingDiff={fratingDiff} />
            <PlayerIndicator user={info.second} ratingDiff={sratingDiff} />

            {gameStatus !== 'WAITING' && gameStatus !== 'STARTED' && (
                <>
                    <hr className="border-tertiary my-3.5" />
                    <p className="text-[#BABABA] text-center text-sm leading-none">
                        {gameEndMessage(info.game.key, gameStatus, endType)}
                    </p>
                </>
            )}
        </div>
    )
}

function PlayerIndicator(props: { user: Player, first?: boolean, ratingDiff: number }) {
    return (
        <div className="flex gap-2 items-center text-[13px] text-[#BABABA]">
            {props.first ? <BiSolidCircle /> : <BiCircle />}
            <Link
                className="flex-grow hover:text-blue-500"
                href={`/profile/${props.user.username}`}
            >
                {props.user.username}
                {props.user.provisional ? (
                    <> (
                        <span
                            className="text-blue-400"
                            title="Not enough rated games have been played to establish a reliable rating."
                        >
                            {props.user.rating}?
                        </span>
                    )</>
                ) : (
                    ` (${props.user.rating})`
                )}
                {props.ratingDiff !== 0 && (
                    <span className={props.ratingDiff > 0 ? 'text-theme-green' : 'text-theme-red'}>
                        {' '}{props.ratingDiff > 0 && '+'}{props.ratingDiff}
                    </span>
                )}
            </Link>
        </div>
    )
}
