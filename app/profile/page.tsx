import {Metadata} from 'next';
import ProfileSidebar from './ProfileSidebar';
import ProfileHeader from './ProfileHeader';
import ProfileEloChart from './ProfileEloChart';
import ProfileGames from './ProfileGames';


export const metadata: Metadata = {
    title: 'kepler'
}

export default function Profile() {
    return (
        <div className="container flex pt-4">
            <ProfileSidebar />
            <main className="flex-grow bg-content rounded-t-lg overflow-clip">
                <ProfileHeader />
                <ProfileEloChart />
                <ProfileGames />
            </main>
        </div>
    )
}
