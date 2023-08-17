'use client'

import {useContext} from 'react';
import Link from 'next/link';
import {Tab} from '@headlessui/react';
import {ImArrowDownRight, ImArrowUpRight} from 'react-icons/im';

// Components
import ProfileGames from './ProfileGames';
import ProfileEloChart from './ProfileEloChart';

// Util
import ProfileContext, {GameKey, GamePerf} from '../../contexts/ProfileContext';
import {keyToName} from './ProfileContent';


export default function ProfileGamePanel(props: GamePerf & {game: GameKey}) {
    const {username, games} = useContext(ProfileContext);
    const filtered = games.filter(info => info.game.key === props.game);

    return (
        <Tab.Panel>
            <h1 className="px-8 py-6 text-4xl">
                <Link href={`/profile/${username}`} className="text-blue-500 hover:underline">{username}</Link>'s{' '}
                {keyToName(props.game)} stats
            </h1>

            {!!filtered.length && (
                <ProfileEloChart username={username} games={filtered} />
            )}

            <section className="px-8 py-6">
                <p className="text-2xl mb-3 font-light">
                    Rating: <strong className="font-semibold">{props.rating.toFixed(2)}</strong>.{' '}
                    {props.prov ? (
                        <span
                            className="text-secondary cursor-help underline decoration-dashed decoration-blue-500 decoration-1 underline-offset-4"
                            title="Not enough rated games have been played to establish a reliable rating."
                        >
                            (provisional)
                        </span>
                    ) : (
                        // TODO: links
                        <span className="text-secondary">
                            You are better than 58.7% of {keyToName(props.game)} players.
                        </span>
                    )}
                </p>

                <p className="text-sm text-secondary">
                    Progression over the last 12 games:{' '}
                    {props.prog > 0 ? (
                        <span className="text-theme-green">
                            <ImArrowUpRight className="inline" /> {props.prog.toFixed()}
                        </span>
                    ) : props.prog < 0 ? (
                        <span className="text-red-600">
                            <ImArrowDownRight className="inline" /> {Math.abs(props.prog).toFixed()}
                        </span>
                    ) : (
                        '-'
                    )}
                    . Rating deviation:{' '}
                    <strong
                        className="cursor-help underline decoration-dashed decoration-blue-500 underline-offset-[3px]"
                        title="A lower value means the rating is more stable. Above 110, the rating is considered provisional."
                    >
                        {props.rd.toFixed(2)}
                    </strong>.
                </p>
            </section>

            {/* TODO: stats tables? */}

            <ProfileGames
                games={games.filter((info) => info.game.key === props.game)}
            />
        </Tab.Panel>
    )
}
