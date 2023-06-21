'use client'

import {Tab} from '@headlessui/react';
import ProfileHeader from './ProfileHeader';
import ProfileEloChart from './ProfileEloChart';
import ProfileGames from './ProfileGames';


export default function ProfileUserPanel() {
    return (
        <Tab.Panel>
            <ProfileHeader />
            <ProfileEloChart />
            <ProfileGames />
        </Tab.Panel>
    )
}
