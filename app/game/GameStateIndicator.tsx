'use client'

import {useContext} from 'react';
import Link from 'next/link';
import GameContext from '../../contexts/GameContext';

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
    const {info, side, gameStatus, drawOffer, ftime, stime} = useContext(GameContext);

    return (
        <div className="flex flex-col w-[25rem] drop-shadow-lg">
            <GameTimeIndicator time={ftime} top playAlert={side === 'FIRST'} />

            {/* TODO: support overflow-clip for time indicator bars without hiding rematch cancel button? */}
            <div className="bg-content rounded-r">
                <GameTimeProgressBar time={ftime} initial={info.timeControl.initial} />
                <PlayerIndicator user={info.first} />

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

                <PlayerIndicator user={info.second} />
                <GameTimeProgressBar time={stime} initial={info.timeControl.initial} />
            </div>

            <GameTimeIndicator time={stime} playAlert={side === 'SECOND'} />
        </div>
    )
}

function PlayerIndicator(props: { user: Player }) {
    return (
        <div className="px-4 py-2 text-lg flex justify-between">
            <Link
                className="flex-grow hover:text-blue-500"
                href={`/profile/${props.user.username}`}
            >
                {props.user.username}
            </Link>
            {props.user.rating && (
                // TODO
                <span className="text-secondary">
                    {props.user.rating}{props.user.provisional && '?'}
                </span>
            )}
        </div>
    )
}
