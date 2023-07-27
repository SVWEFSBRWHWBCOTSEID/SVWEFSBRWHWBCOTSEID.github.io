'use client'

import {useContext} from 'react';
import Link from 'next/link';
import GameContext from '../../contexts/GameContext';

// Components
import GameTimeIndicator from './GameTimeIndicator';
import GameTimeProgressBar from './GameTimeProgressBar';
import GameMoveHistory from './GameMoveHistory';
import GameControls from './GameControls';
import GameOverMessage from './GameOverMessage';

// Types
import type {Player} from './[id]/page';


export default function GameStateIndicator() {
    const {info, side, gameStatus, ftime, stime} = useContext(GameContext);

    return (
        <div className="flex flex-col w-[25rem] drop-shadow-lg">
            <GameTimeIndicator time={ftime} top playAlert={side === 'FIRST'} />

            <div className="bg-content rounded-r overflow-clip">
                <GameTimeProgressBar time={ftime} initial={info.timeControl.initial} />
                <PlayerIndicator user={info.first} />

                <div className="h-56 flex flex-col">
                    <GameMoveHistory />

                    {gameStatus !== 'WAITING' && gameStatus !== 'STARTED' ? (
                        <GameOverMessage />
                    ) : (
                        <GameControls />
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
