'use client'

import {useContext} from 'react';
import Link from 'next/link';
import {Tab} from '@headlessui/react';
import ProfileGames from './ProfileGames';
import ProfileContext, {GamePerf} from '../../contexts/ProfileContext';


export default function ProfileGamePanel(props: GamePerf & {name: string}) {
    const {username} = useContext(ProfileContext);

    return (
        <Tab.Panel>
            <h1 className="px-8 py-6 text-4xl">
                <Link href={`/profile/${username}`} className="text-blue-500 hover:underline">{username}</Link>'s {props.name} stats
            </h1>

            <section className="border-y border-tertiary flex items-center justify-center text-secondary py-12">
                [todo: lichess elo chart thing]
            </section>

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
                            You are better than 58.7% of {props.name} players.
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

            {/* TODO: filter these by game */}
            <ProfileGames />
        </Tab.Panel>
    )
}
