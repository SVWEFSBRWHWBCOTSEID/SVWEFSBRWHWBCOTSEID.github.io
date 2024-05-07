'use client'

import { useState } from 'react';
import { Tab } from '@headlessui/react';

// Components
import ProfileSidebar from './ProfileSidebar';
import ProfileUserPanel from './ProfileUserPanel';
import ProfileGamePanel from './ProfileGamePanel';

// Contexts
import ProfileContext, { GameKey, User } from '../../contexts/ProfileContext';


export default function ProfileContent(props: { user: User }) {
    const [tab, setTab] = useState(0);

    return (
        // TODO: vertical tab group on mobile?
        <ProfileContext.Provider value={props.user}>
            <Tab.Group
                selectedIndex={tab}
                onChange={setTab}
                vertical
                as="div"
                className="md:container flex flex-col md:flex-row pt-4 pb-12"
            >
                <ProfileSidebar />
                <Tab.Panels className="md:flex-grow bg-content md:rounded-lg overflow-clip">
                    <ProfileUserPanel />

                    {Object.entries(props.user.perfs).map(([key, value]) => (
                        <ProfileGamePanel
                            game={key as GameKey}
                            setTab={setTab}
                            {...value}
                            key={key}
                        />
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
        default: return 'Unknown game';
    }
}
