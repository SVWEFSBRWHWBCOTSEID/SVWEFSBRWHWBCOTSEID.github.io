'use client'

import {useContext} from 'react';
import Link from 'next/link';
import GameContext from '../../contexts/GameContext';
import PreferencesContext from '../../contexts/PreferencesContext';

// Components
import GameTimeIndicator from './GameTimeIndicator';
import GameTimeProgressBar from './GameTimeProgressBar';
import GameMoveHistoryHeader from './GameMoveHistoryHeader';
import GameMoveHistory from './GameMoveHistory';
import GameControls from './GameControls';
import GameDrawOffer from './GameDrawOffer';
import GameOverMessage from './GameOverMessage';
import RematchButton from './RematchButton';

// Types
import type {Player} from './[id]/page';


export default function GameStateIndicator() {
    const {info, side, gameStatus, drawOffer, ftime, stime, fratingDiff, sratingDiff} = useContext(GameContext);
    const {preferences} = useContext(PreferencesContext);

    return (
        <div className="flex flex-col flex-shrink basis-[400px] min-w-[320px] drop-shadow-lg max-w-full">
            <GameTimeIndicator time={ftime} top playAlert={side === 'FIRST'} />

            {/* TODO: support overflow-clip for time indicator bars without hiding rematch cancel button? */}
            <div className="bg-content rounded-r">
                {preferences.clock.showProgressBars && (
                    <GameTimeProgressBar time={ftime} initial={info.timeControl.initial} />
                )}
                <PlayerIndicator user={info.first} ratingDiff={fratingDiff} />

                <div className="h-64 flex flex-col">
                    <GameMoveHistoryHeader />

                    <div className="flex flex-col flex-shrink flex-grow overflow-auto scrollbar:hidden">
                        <GameMoveHistory />

                        {gameStatus !== 'WAITING' && gameStatus !== 'STARTED' && (
                            <GameOverMessage />
                        )}
                    </div>

                    {gameStatus === 'WAITING' || gameStatus === 'STARTED' ? (
                        // TODO: better way to express this?
                        <>
                            {drawOffer !== 'NONE' ? (
                                <GameDrawOffer />
                            ) : (
                                <GameControls />
                            )}
                        </>
                    ) : (
                        <RematchButton />
                    )}
                </div>

                <PlayerIndicator user={info.second} ratingDiff={sratingDiff} />
                {preferences.clock.showProgressBars && (
                    <GameTimeProgressBar time={stime} initial={info.timeControl.initial} />
                )}
            </div>

            <GameTimeIndicator time={stime} playAlert={side === 'SECOND'} />
        </div>
    )
}

function PlayerIndicator(props: { user: Player, ratingDiff: number }) {
    return (
        <div className="px-4 py-2 text-lg flex justify-between">
            <Link
                className="flex-grow text-primary hover:text-blue-500"
                href={`/profile/${props.user.username}`}
            >
                {props.user.username}
            </Link>
            {props.user.rating && (
                // TODO
                <span className="text-secondary">
                    {props.user.rating}{props.user.provisional && '?'}
                    {props.ratingDiff !== 0 && (
                        <span className={props.ratingDiff > 0 ? 'text-theme-green' : 'text-theme-red'}>
                            {' '}{props.ratingDiff > 0 && '+'}{props.ratingDiff}
                        </span>
                    )}
                </span>
            )}
        </div>
    )
}
