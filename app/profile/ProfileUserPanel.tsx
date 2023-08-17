'use client'

import {useContext} from 'react';
import {Tab} from '@headlessui/react';
import ProfileContext from '../../contexts/ProfileContext';

// Components
import ProfileHeader from './ProfileHeader';
import ProfileEloChart from './ProfileEloChart';
import ProfileGames from './ProfileGames';


export default function ProfileUserPanel() {
    const {username, games} = useContext(ProfileContext);

    return (
        <Tab.Panel>
            <ProfileHeader />
            {games.length && (
                <ProfileEloChart username={username} games={games} />
            )}
            <ProfileGames games={games} />
        </Tab.Panel>
    )
}
