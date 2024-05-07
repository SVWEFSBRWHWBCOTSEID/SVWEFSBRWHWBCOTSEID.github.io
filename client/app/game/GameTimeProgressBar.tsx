import { Duration } from 'luxon';


type GameTimeProgressBarProps = {
    time: Duration,
    initial: number
}
export default function GameTimeProgressBar(props: GameTimeProgressBarProps) {
    const percent = (props.time.toMillis() / props.initial) * 100;
    return <div className="h-1 bg-theme-green transition-[width] duration-100" style={{ width: `${percent}%` }} />
}
