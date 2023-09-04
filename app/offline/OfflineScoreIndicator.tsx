// Displays a score indicator for offline games. Scores are represented as a tuple of [number, number] for
// [x wins, o wins].
export type Scores = [first: number, second: number];
export default function OfflineScoreIndicator(props: {scores: Scores, firstColor: string, secondColor: string}) {
    return (
        <section className="flex gap-3 items-center text-3xl font-medium">
            <div className={'h-6 w-6 rounded-full ' + props.firstColor} />
            <span className="pb-0.5">{props.scores.join(' - ')}</span>
            <div className={'h-6 w-6 rounded-full ' + props.secondColor} />
        </section>
    )
}
