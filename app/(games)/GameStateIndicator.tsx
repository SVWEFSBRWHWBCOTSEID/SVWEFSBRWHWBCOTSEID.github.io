import Link from 'next/link';
import {FaRegFlag} from 'react-icons/fa';


export default function GameStateIndicator() {
    return (
        <div className="flex flex-col w-[25rem] drop-shadow-lg">
            <div className="bg-content w-max text-5xl px-5 py-2 rounded-t">
                02<span className="text-secondary">:</span>38
            </div>
            <div className="bg-content rounded-r">
                <div className="h-1 w-[72%] bg-theme-green" />
                <PlayerIndicator username="qpwoeirut" id="qpwoeirut" />

                <div className="bg-content-secondary px-5 py-1.5 border-b border-tertiary">
                    aaa
                </div>
                <div className="grid grid-cols-[4rem_1fr_1fr]">
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

                <PlayerIndicator username="kepler" id="kepler" rating={1337} />
                <div className="h-1 w-[68%] bg-theme-green" />
            </div>
            <div className="bg-content w-max text-5xl px-5 py-2 rounded-b">
                02<span className="text-secondary">:</span>57
            </div>
        </div>
    )
}

function PlayerIndicator(props: {username: string, id: string, rating?: number}) {
    return (
        <div className="px-4 py-2 text-lg flex justify-between">
            <Link
                className="flex-grow hover:text-blue-500"
                href={`/profile/${props.id}`}
            >
                {props.username}
            </Link>
            {props.rating && <span className="text-secondary">{props.rating}</span>}
        </div>
    )
}
