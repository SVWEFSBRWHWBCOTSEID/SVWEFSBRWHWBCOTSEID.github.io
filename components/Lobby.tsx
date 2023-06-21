import LobbyRoom, {LobbyCell} from './LobbyRoom';


export default function Lobby() {
    return (
        <div className="table w-full rounded overflow-clip bg-[#262421]/40">
            <div className="px-4 font-light table-header-group bg-[#302e2c]">
                <div className="table-row">
                    <LobbyCell>Player</LobbyCell>
                    <LobbyCell>Rating</LobbyCell>
                    <LobbyCell>Time</LobbyCell>
                    <LobbyCell>Game</LobbyCell>
                </div>
            </div>

            <LobbyRoom />
            <LobbyRoom />
            <LobbyRoom />
            <LobbyRoom />
            <LobbyRoom />
            <LobbyRoom />
            <LobbyRoom />
        </div>
    )
}
