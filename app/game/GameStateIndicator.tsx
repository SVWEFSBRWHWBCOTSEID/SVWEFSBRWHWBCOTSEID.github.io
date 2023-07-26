import Link from 'next/link';
import {Duration} from 'luxon';

// Components
import GameTimeIndicator from './GameTimeIndicator';
import GameTimeProgressBar from './GameTimeProgressBar';
import GameMoveHistory, {GameMoveHistoryProps} from './GameMoveHistory';
import GameControls from './GameControls';
import GameOverMessage, {GameOverMessageProps} from './GameOverMessage';

// Types
import type {Player, GameInfo, Status} from './[id]/page';
import type {PlayerSide} from './[id]/Game';


type GameStateIndicatorProps = GameMoveHistoryProps & GameOverMessageProps & {
    id: string,
    ftime: Duration,
    stime: Duration,
    info: GameInfo,
    side: PlayerSide
}
export default function GameStateIndicator(props: GameStateIndicatorProps) {
    return (
        <div className="flex flex-col w-[25rem] drop-shadow-lg">
            <GameTimeIndicator time={props.ftime} top playAlert={props.side === 'FIRST'} />

            <div className="bg-content rounded-r">
                <GameTimeProgressBar time={props.ftime} initial={props.info.timeControl.initial} />
                <PlayerIndicator user={props.info.first} />

                <div className="h-56 flex flex-col">
                    <GameMoveHistory moves={props.moves} index={props.index} setIndex={props.setIndex} />

                    {props.status !== 'WAITING' && props.status !== 'STARTED' ? (
                        <GameOverMessage status={props.status} type={props.type} />
                    ) : (
                        <GameControls id={props.id} />
                    )}
                </div>

                <PlayerIndicator user={props.info.second} />
                <GameTimeProgressBar time={props.stime} initial={props.info.timeControl.initial} />
            </div>

            <GameTimeIndicator time={props.stime} playAlert={props.side === 'SECOND'} />
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
