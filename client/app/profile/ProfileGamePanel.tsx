'use client'

import {ReactNode, useContext, useMemo} from 'react';
import Link from 'next/link';
import {Tab} from '@headlessui/react';
import {DateTime} from 'luxon';
import {ImArrowDownRight, ImArrowUpRight} from 'react-icons/im';

// Components
import ProfileGames from './ProfileGames';
import ProfileEloChart from './ProfileEloChart';

// Util
import ProfileContext, {GameKey, GamePerf} from '../../contexts/ProfileContext';
import {keyToName} from './ProfileContent';
import type {ProfileGameInfo} from './ProfileGame';


export default function ProfileGamePanel(props: GamePerf & {game: GameKey, setTab: (tab: number) => void}) {
    const {username, games, perfs} = useContext(ProfileContext);
    const filtered = games.filter(info => info.game.key === props.game)
        .sort((gameA, gameB) => DateTime.fromSQL(gameA.createdAt).valueOf() - DateTime.fromSQL(gameB.createdAt).valueOf());

    // TODO: eventually replace with `Object.groupBy`?
    const rated = filtered.filter((g) => g.rated);
    const victories = filtered.filter((g) => {
        return username === g.first.username ? g.status === 'FIRST_WON' : g.status === 'SECOND_WON';
    });
    const losses = filtered.filter((g) => {
        return username === g.first.username ? g.status === 'SECOND_WON' : g.status === 'FIRST_WON';
    });

    const {averageOpponent, highestRating, highestRated, lowestRating, lowestRated} = useMemo(() => {
        let opponentRatingTotal = 0;

        let highestRating = 1500;
        let highestRated: ProfileGameInfo | null = null;
        let lowestRating = 1500;
        let lowestRated: ProfileGameInfo | null = null;

        for (let i = 0; i < rated.length; i++) {
            const opponent = username === rated[i].first.username ? rated[i].second : rated[i].first;
            opponentRatingTotal += opponent.rating;

            // TODO? these technically aren't inverses of each other because draws
            const isWin = username === rated[i].first.username ? rated[i].status === 'FIRST_WON' : rated[i].status === 'SECOND_WON';
            const isLoss = username === rated[i].first.username ? rated[i].status === 'SECOND_WON' : rated[i].status === 'FIRST_WON';

            // The resultant rating after the game is the next game's rating, or the user's current rating if it was
            // the most recent game played.
            const rating = i === rated.length - 1
                ? perfs[props.game].rating
                : username === rated[i + 1].first.username
                    ? rated[i + 1].first.rating
                    : rated[i + 1].second.rating;

            // The highest rating is the highest rating achieved after a win, and the lowest rating is the lowest
            // rating after a loss.
            if (isWin && (!highestRated || rating > highestRating)) {
                highestRated = rated[i];
                highestRating = rating;
            } else if (isLoss && (!lowestRated || rating < lowestRating)) {
                lowestRated = rated[i];
                lowestRating = rating;
            }
        }

        return {
            highestRating, highestRated,
            lowestRating, lowestRated,
            averageOpponent: rated.length && opponentRatingTotal / rated.length
        }
    }, [username, perfs, props.game])

    return (
        <Tab.Panel>
            <h1 className="px-12 pt-8 pb-6 text-4xl font-light text-primary">
                <button onClick={() => props.setTab(0)} className="text-blue-500 hover:underline">
                    {username}
                </button>
                's {keyToName(props.game)} stats
            </h1>

            {!!filtered.length && (
                <ProfileEloChart games={filtered} />
            )}

            <section className="px-12 py-6">
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
                        <span className="text-theme-red">
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

            <section className="px-12 py-4 grid grid-cols-2 gap-5">
                <ProfileStatsTable>
                    <div className="table-row">
                        <ProfileStatsTableCell className="border-b border-tertiary">
                            Total games
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="border-b border-tertiary text-base font-semibold">
                            {filtered.length}
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="border-b border-tertiary" />
                    </div>
                    <div className="table-row">
                        <ProfileStatsTableCell>
                            Rated games
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="text-base font-semibold">
                            {rated.length}
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="text-base font-semibold bg-content-secondary">
                            {toPercent(rated.length, filtered.length)}%
                        </ProfileStatsTableCell>
                    </div>
                </ProfileStatsTable>

                <ProfileStatsTable>
                    <div className="table-row">
                        <ProfileStatsTableCell className="border-b border-tertiary">
                            Average opponent
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="border-b border-tertiary text-base font-semibold">
                            {averageOpponent.toFixed(2)}
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="border-b border-tertiary" />
                    </div>
                    <div className="table-row">
                        <ProfileStatsTableCell>
                            Victories
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="text-base font-semibold text-theme-green">
                            {victories.length}
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="text-base font-semibold text-theme-green bg-content-secondary">
                            {toPercent(victories.length, filtered.length)}%
                        </ProfileStatsTableCell>
                    </div>
                    <div className="table-row">
                        <ProfileStatsTableCell>
                            Draws
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="text-base font-semibold">
                            {filtered.length - victories.length - losses.length}
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="text-base font-semibold bg-content-secondary">
                            {toPercent(filtered.length - victories.length - losses.length, filtered.length)}%
                        </ProfileStatsTableCell>
                    </div>
                    <div className="table-row">
                        <ProfileStatsTableCell>
                            Defeats
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="text-base font-semibold text-theme-red">
                            {losses.length}
                        </ProfileStatsTableCell>
                        <ProfileStatsTableCell className="text-base font-semibold text-theme-red bg-content-secondary">
                            {toPercent(losses.length, filtered.length)}%
                        </ProfileStatsTableCell>
                    </div>
                </ProfileStatsTable>

                <div className="py-5">
                    <h5 className="text-2xl text-primary font-light">
                        Highest rating:{' '}
                        {highestRated ? (
                            <span className="text-theme-green font-medium">
                                {Math.floor(highestRating)}
                            </span>
                        ) : (
                            '-'
                        )}
                    </h5>
                    {highestRated ? (
                        <Link href={`/game/${highestRated.id}`} className="ml-6 text-sm text-blue-500">
                            {DateTime.fromSQL(highestRated.createdAt).toLocaleString(DateTime.DATETIME_MED)}
                        </Link>
                    ) : (
                        <p className="ml-6 text-sm text-secondary">Not enough games played</p>
                    )}
                </div>

                <div className="py-5">
                    <h5 className="text-2xl text-primary font-light">
                        Lowest rating:{' '}
                        {lowestRated ? (
                            <span className="text-theme-red font-medium">
                                {Math.floor(lowestRating)}
                            </span>
                        ) : (
                            '-'
                        )}
                    </h5>
                    {lowestRated ? (
                        <Link href={`/game/${lowestRated.id}`} className="ml-6 text-sm text-blue-500">
                            {DateTime.fromSQL(lowestRated.createdAt).toLocaleString(DateTime.DATETIME_MED)}
                        </Link>
                    ) : (
                        <p className="ml-6 text-sm text-secondary">Not enough games played</p>
                    )}
                </div>
            </section>

            <ProfileGames games={filtered} />
        </Tab.Panel>
    )
}

function toPercent(a: number, b: number) {
    if (b === 0) return 0;
    return Math.floor((a / b) * 100);
}

function ProfileStatsTable(props: {children: ReactNode}) {
    return (
        <div className="table text-sm text-primary h-max">
            {props.children}
        </div>
    )
}

function ProfileStatsTableCell(props: {children?: ReactNode, className?: string, secondary?: boolean}) {
    return (
        <div className={'table-cell py-3 px-4' + (props.className ? ` ${props.className}` : '')}>
            {props.children}
        </div>
    )
}
