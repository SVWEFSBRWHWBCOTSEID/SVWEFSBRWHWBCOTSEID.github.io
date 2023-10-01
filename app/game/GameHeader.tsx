'use client'

import {useContext} from 'react';
import Link from 'next/link';
import GameContext from '../../contexts/GameContext';
import {BiCircle, BiSolidCircle} from 'react-icons/bi';

// Util
import {keyToIcon} from '../profile/ProfileSidebarItem';
import {timeControlToString} from '../../util/game';
import {winTypeToStr} from './GameOverMessage';
import type {Player} from './[id]/page';


export default function GameHeader() {
    const {info, gameStatus, endType, fratingDiff, sratingDiff} = useContext(GameContext);
    const Icon = keyToIcon(info.game.key);

    return (
        <div className="bg-content rounded p-6 shadow-lg h-max">
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
                    <p className="text-secondary text-sm">
                        {DateTime.fromSQL(info.createdAt).toRelative()}
                    </p>
                </div>
            </div>

            <PlayerIndicator user={info.first} first ratingDiff={fratingDiff} />
            <PlayerIndicator user={info.second} ratingDiff={sratingDiff} />

            {gameStatus !== 'WAITING' && gameStatus !== 'STARTED' && (
                <>
                    <hr className="border-tertiary my-3.5" />
                    <p className="text-secondary text-center">
                        {gameStatus === 'DRAW' ? (
                            endType === 'STALEMATE' ? 'Stalemate' : 'Draw by mutual agreement'
                        ) : (
                            `${gameStatus === 'FIRST_WON' ? 'O' : 'X'} ${winTypeToStr(endType)} • ${gameStatus === 'FIRST_WON' ? 'X' : 'O'} is victorious`
                        )}
                    </p>
                </>
            )}
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
                {props.user.provisional ? (
                    <> (
                        <span className="text-blue-400" title="Not enough rated games have been played to establish a reliable rating.">
                            {props.user.rating}?
                        </span>
                    )</>
                ) : (
                    ` (${props.user.rating})`
                )}
                {props.ratingDiff !== 0 && (
                    <span className={props.ratingDiff > 0 ? 'text-theme-green' : 'text-red-600'}>
                        {' '}{props.ratingDiff > 0 && '+'}{props.ratingDiff}
                    </span>
                )}
            </Link>
        </div>
    )
}
