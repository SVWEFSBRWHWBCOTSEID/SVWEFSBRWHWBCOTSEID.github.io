import {Duration} from 'luxon';


type GameTimeIndicatorProps = {time: Duration, top?: boolean}
export default function GameTimeIndicator(props: GameTimeIndicatorProps) {
    const emergency = props.time.toMillis() < 21000;

    return (
        <div className={'w-max text-5xl px-5 py-2 ' + (props.top ? 'rounded-t ' : 'rounded-b ') + (emergency ? 'bg-[#502826]' : 'bg-content')}>
            {padNumber(props.time.minutes)}<span className="text-secondary">:</span>{padNumber(props.time.seconds)}
            {emergency && (
                // Display tenths-of-seconds when total time < 20s
                <span className="text-4xl">
                    <span className="text-secondary">.</span>{Math.floor(props.time.milliseconds / 100)}
                </span>
            )}
        </div>
    )
}

function padNumber(num: number) {
    if (num < 10) return '0' + num;
    return num.toString();
}
