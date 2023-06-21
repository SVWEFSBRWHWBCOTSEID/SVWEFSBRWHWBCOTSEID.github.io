'use client'

import Link from 'next/link';
import {Tab} from '@headlessui/react';
import ProfileGames from './ProfileGames';


type ProfileGamePanelProps = {name: string, rating: number, games: number, provisional?: boolean}
export default function ProfileGamePanel(props: ProfileGamePanelProps) {
    return (
        <Tab.Panel>
            <h1 className="px-8 py-6 text-4xl">
                <Link href="/profile" className="text-blue-500 hover:underline">kepler</Link>'s {props.name} stats
            </h1>

            <section className="border-y border-tertiary flex items-center justify-center text-secondary py-12">
                [todo: lichess elo chart thing]
            </section>

            <section className="px-8 py-6">
                <p className="text-2xl mb-3">
                    Rating: <strong className="font-semibold">{props.rating}</strong>.{' '}
                    {props.provisional ? (
                        <span className="text-secondary">(provisional)</span>
                    ) : (
                        // TODO: links
                        <span className="text-secondary">
                            You are better than 58.7% of {props.name} players.
                        </span>
                    )}
                </p>

                {/* TODO: rating change arrow / color, tooltips */}
                <p className="text-sm text-secondary">
                    Progression over the last 12 games: -17. Rating deviation: 71.89.
                </p>
            </section>

            {/* TODO: filter these by game */}
            <ProfileGames />
        </Tab.Panel>
    )
}
