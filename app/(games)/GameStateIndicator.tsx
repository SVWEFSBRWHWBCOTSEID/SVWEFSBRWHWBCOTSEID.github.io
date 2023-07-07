import Link from 'next/link';
import {Duration} from 'luxon';
import {FaRegFlag} from 'react-icons/fa';

// Components
import GameTimeIndicator from './GameTimeIndicator';
import GameTimeProgressBar from './GameTimeProgressBar';

// Types
import type {GameInfo} from './GameHeader';
import type {GameUser} from './ttt/[id]/page';


type GameStateIndicatorProps = {ftime: Duration, stime: Duration}
export default function GameStateIndicator(props: GameStateIndicatorProps & GameInfo) {
    return (
        <div className="flex flex-col w-[25rem] drop-shadow-lg">
            <GameTimeIndicator time={props.ftime} top />

            <div className="bg-content rounded-r">
                <GameTimeProgressBar time={props.ftime} initial={props.timeControl.initial} />
                <PlayerIndicator user={props.first} />

                <div className="bg-content-secondary px-5 py-1.5 border-b border-tertiary">
                    aaa
                </div>
                <div className="grid grid-cols-[4rem_1fr_1fr]">
                    {/* TODO: display moves, set indices */}
                    <div className="text-secondary bg-content-secondary flex items-center justify-center font-light">1</div>
                    <div className="px-4 py-2">Xa3</div>
                    <div className="px-4 py-2">Oa2</div>

                    <div className="text-secondary bg-content-secondary flex items-center justify-center font-light">2</div>
                    <div className="px-4 py-2">Xa3</div>
                    <div className="px-4 py-2">Oa2</div>

                    <div className="text-secondary bg-content-secondary flex items-center justify-center font-light">3</div>
                    <div className="px-4 py-2">Xa3</div>
                </div>

                <div className="px-4 py-1 text-secondary flex justify-center border-b border-tertiary text-2xl">
                    <button
                        className="px-3.5 py-1.5 hover:bg-theme-green hover:text-white"
                        title="Offer draw"
                    >
                        ½
                    </button>
                    <button
                        className="px-3.5 py-1.5 hover:bg-theme-green hover:text-white"
                        title="Resign"
                    >
                        <FaRegFlag />
                    </button>
                </div>

                <PlayerIndicator user={props.second} />
                <GameTimeProgressBar time={props.stime} initial={props.timeControl.initial} />
            </div>

            <GameTimeIndicator time={props.stime} />
        </div>
    )
}

function PlayerIndicator(props: { user: GameUser }) {
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
