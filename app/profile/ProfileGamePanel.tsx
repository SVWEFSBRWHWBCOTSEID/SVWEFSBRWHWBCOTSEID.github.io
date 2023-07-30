'use client'

import {useContext} from 'react';
import Link from 'next/link';
import {Tab} from '@headlessui/react';

// Components
import ProfileGames from './ProfileGames';
import ProfileEloChart from './ProfileEloChart';

// Util
import ProfileContext, {GameKey, GamePerf} from '../../contexts/ProfileContext';
import {keyToName} from './ProfileContent';


export default function ProfileGamePanel(props: GamePerf & {game: GameKey}) {
    const {username, games} = useContext(ProfileContext);

    return (
        <Tab.Panel>
            <h1 className="px-8 py-6 text-4xl">
                <Link href={`/profile/${username}`} className="text-blue-500 hover:underline">{username}</Link>'s{' '}
                {keyToName(props.game)} stats
            </h1>

            <ProfileEloChart />

            <section className="px-8 py-6">
                <p className="text-2xl mb-3 font-light">
                    Rating: <strong className="font-semibold">{props.rating}</strong>.{' '}
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

                {/* TODO: rating change arrow / color, tooltips */}
                <p className="text-sm text-secondary">
                    Progression over the last 12 games: {props.prog}. Rating deviation:{' '}
                    <strong
                        className="cursor-help underline decoration-dashed decoration-blue-500 underline-offset-[3px]"
                        title="A lower value means the rating is more stable. ..."
                    >
                        {props.rd}
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
