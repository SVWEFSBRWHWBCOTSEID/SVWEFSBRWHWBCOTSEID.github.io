import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {DateTime} from 'luxon';
import ProfileContent from '../ProfileContent';
import {getUser} from '../../../util/user';


export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const user = await getUser(params.id)
    if (!user) return {
        title: 'User not found'
    }

    const joinedAtDate = DateTime.fromSQL(user.createdAt);
    const games = Object.values(user.perfs).reduce((sum, perf) => sum + perf.games, 0);

    // Display rating for the game type of the user's last rated game.
    // TODO: see TODO in `ProfileGames.tsx`
    const ratedGames = user.games
        .filter((g) => g.rated)
        .sort((gameA, gameB) => DateTime.fromSQL(gameA.createdAt).valueOf() - DateTime.fromSQL(gameB.createdAt).valueOf());
    const lastRatedGameInfo = ratedGames[ratedGames.length - 1].game;
    const rating = Math.floor(user.perfs[lastRatedGameInfo.key].rating);

    return {
        title: `${params.id} (${rating})`,
        description: `${params.id} joined on ${joinedAtDate.toLocaleString()} and has played ${games} games. Current ${lastRatedGameInfo.name} rating: ${rating}.`
    }
}

export default async function Profile({ params }: { params: { id: string } }) {
    const user = await getUser(params.id);

    if (!user) notFound();
    return <ProfileContent user={user} />
}
