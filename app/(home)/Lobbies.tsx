import LobbyRoom, {LobbyCell} from './LobbyRoom';
import type {GameNameInfo, Player, TimeControl} from '../game/[id]/page';


export type Lobby = {
    id: string,
    user: Player,
    game: GameNameInfo,
    rated: boolean,
    timeControl: TimeControl
}

export default async function Lobbies() {
    const games: Lobby[] = await (await fetch(`${process.env.API_BASE}/lobbies`)).json()

    return (
        <div className="table w-full rounded overflow-clip bg-content/40">
            <div className="px-4 font-light table-header-group bg-content-secondary">
                <div className="table-row">
                    <LobbyCell>Player</LobbyCell>
                    <LobbyCell>Rating</LobbyCell>
                    <LobbyCell>Time</LobbyCell>
                    <LobbyCell>Game</LobbyCell>
                </div>
            </div>

            {games.length === 0 && (
                <div className="px-4 table-row text-secondary relative h-20">
                    <span className="absolute inset-0 m-auto w-max h-max">
                        No games were found.
                    </span>
                </div>
            )}
            {games.length > 0 && games.map((game) => (
                <LobbyRoom {...game} />
            ))}
        </div>
    )
}
