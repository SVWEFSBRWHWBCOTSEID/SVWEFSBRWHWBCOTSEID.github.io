import {DateTime} from 'luxon';
import ProfileGame, {ProfileGameInfo} from './ProfileGame';


export default function ProfileGames(props: {games: ProfileGameInfo[]}) {
    return (
        <section>
            <h3 className="text-lg font-semibold px-6 pt-4 pb-2">Games</h3>
            <div className="table w-full pb-2">
                <div className="table-header-group">
                    <div className="table-row bg-background text-sm text-secondary">
                        <div className="table-cell w-10" />
                        <div className="table-cell px-6 py-2">Players</div>
                        <div className="table-cell px-6 py-2">Game</div>
                        <div className="table-cell px-6 py-2">Result</div>
                        <div className="table-cell px-6 py-2 text-right">Date</div>
                    </div>
                </div>

                {props.games.length === 0 && (
                    <div className="px-4 table-row text-secondary relative h-20">
                        <span className="absolute inset-0 m-auto w-max h-max">
                            No games played.
                        </span>
                    </div>
                )}
                {/* TODO: is this datetime sort inefficient? */}
                {props.games.length > 0 && props.games.sort((gameA, gameB) => DateTime.fromSQL(gameB.createdAt).valueOf() - DateTime.fromSQL(gameA.createdAt).valueOf()).map((game) => (
                    <ProfileGame {...game} key={game.createdAt + game.first.username} />
                ))}
            </div>
        </section>
    )
}
