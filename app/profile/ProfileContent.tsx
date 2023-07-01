'use client'

import {Tab} from '@headlessui/react';

// Components
import ProfileSidebar from './ProfileSidebar';
import ProfileUserPanel from './ProfileUserPanel';
import ProfileGamePanel from './ProfileGamePanel';

// Util
import ProfileContext, {defaultUser, User} from '../../contexts/ProfileContext';


export default function ProfileContent(props: {user?: User}) {
    return (
        // TODO: hacky defaultUser implementation here due to profile page shenanigans; eventually make props non-nullable
        <ProfileContext.Provider value={props.user ?? defaultUser}>
            <Tab.Group vertical as="div" className="container flex pt-4 pb-12">
                <ProfileSidebar />
                <Tab.Panels className="flex-grow bg-content rounded-lg overflow-clip">
                    <ProfileUserPanel />

                    {Object.entries((props.user ?? defaultUser).perfs).map(([key, value]) => (
                        <ProfileGamePanel name={keyToName(key)} {...value} key={key} />
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </ProfileContext.Provider>
    )
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
