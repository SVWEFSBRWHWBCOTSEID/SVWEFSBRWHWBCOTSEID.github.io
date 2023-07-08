import Link from 'next/link';
import {Duration} from 'luxon';

// Components
import GameTimeIndicator from './GameTimeIndicator';
import GameTimeProgressBar from './GameTimeProgressBar';
import GameMoveHistory, {GameMoveHistoryProps} from './GameMoveHistory';
import GameControls from './GameControls';

// Types
import type {Player, GameInfo} from './[id]/page';


type GameStateIndicatorProps = {id: string, ftime: Duration, stime: Duration}
export default function GameStateIndicator(props: GameStateIndicatorProps & GameMoveHistoryProps & GameInfo) {
    return (
        <div className="flex flex-col w-[25rem] drop-shadow-lg">
            <GameTimeIndicator time={props.ftime} top />

            <div className="bg-content rounded-r">
                <GameTimeProgressBar time={props.ftime} initial={props.timeControl.initial} />
                <PlayerIndicator user={props.first} />

                <GameMoveHistory moves={props.moves} index={props.index} setIndex={props.setIndex} />

                <GameControls id={props.id} />

                <PlayerIndicator user={props.second} />
                <GameTimeProgressBar time={props.stime} initial={props.timeControl.initial} />
            </div>

            <GameTimeIndicator time={props.stime} />
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
            {props.user.rating && <span className="text-secondary">{props.user.rating}</span>} {/* TODO */}
        </div>
    )
}
