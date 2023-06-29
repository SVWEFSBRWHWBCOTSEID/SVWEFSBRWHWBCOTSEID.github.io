'use client'

import {Tab} from '@headlessui/react';

// Components
import ProfileSidebar from './ProfileSidebar';
import ProfileUserPanel from './ProfileUserPanel';
import ProfileGamePanel from './ProfileGamePanel';

// Util
import ProfileContext, {User} from '../../contexts/ProfileContext';


export default function ProfileContent(props: User) {
    return (
        <ProfileContext.Provider value={props}>
            <Tab.Group vertical as="div" className="container flex pt-4 pb-12">
                <ProfileSidebar />
                <Tab.Panels className="flex-grow bg-content rounded-lg overflow-clip">
                    <ProfileUserPanel />

                    {Object.entries(ratings).map(([key, value]) => (
                        <ProfileGamePanel name={keyToName(key)} {...value} key={key} />
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </ProfileContext.Provider>
    )
}

export const ratings = {
    ttt: {rating: 1500, games: 0, provisional: true},
    uttt: {rating: 1537, games: 177, provisional: false},
    c4: {rating: 1224, games: 12, provisional: true},
    pc: {rating: 1537, games: 177, provisional: false}
}

export function keyToName(key: string) {
    switch (key) {
        case 'ttt': return 'Tic-Tac-Toe';
        case 'uttt': return 'Ultimate Tic-Tac-Toe';
        case 'c4': return 'Connect 4';
        case 'pc': return 'Pokemon Chess';
    }
    return 'Unknown game';
}
