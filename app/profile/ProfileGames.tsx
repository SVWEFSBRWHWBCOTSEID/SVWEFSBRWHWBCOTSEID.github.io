import ProfileGame from './ProfileGame';


export default function ProfileGames() {
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

                <ProfileGame />
                <ProfileGame />
                <ProfileGame />
                <ProfileGame />
                <ProfileGame />
                <ProfileGame />
                <ProfileGame />
            </div>
        </section>
    )
}
