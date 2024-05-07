'use client'

import { useContext } from 'react';
import { Tab } from '@headlessui/react';
import { DateTime } from 'luxon';

// Components
import ProfileHeader from './ProfileHeader';
import ProfileEloChart from './ProfileEloChart';
import ProfileGames from './ProfileGames';

// Contexts
import ProfileContext from '../../contexts/ProfileContext';


export default function ProfileUserPanel() {
    const { games } = useContext(ProfileContext);
    const sorted = games.sort((gameA, gameB) => DateTime.fromSQL(gameA.createdAt).valueOf() - DateTime.fromSQL(gameB.createdAt).valueOf());

    return (
        <Tab.Panel>
            <ProfileHeader />
            {!!games.length && (
                <ProfileEloChart games={sorted} />
            )}
            <ProfileGames games={games} />
        </Tab.Panel>
    )
}
