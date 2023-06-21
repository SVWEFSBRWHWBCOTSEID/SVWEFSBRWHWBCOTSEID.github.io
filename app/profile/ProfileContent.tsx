'use client'

import {Tab} from '@headlessui/react';
import ProfileSidebar from './ProfileSidebar';
import ProfileUserPanel from './ProfileUserPanel';
import ProfileGamePanel from './ProfileGamePanel';


// TODO: I wish that `use-client` didn't force this semi-hacky component wrapping, but alas
export default function ProfileContent() {
    return (
        <Tab.Group vertical as="div" className="container flex pt-4 pb-12">
            <ProfileSidebar />
            <Tab.Panels className="flex-grow bg-content rounded-lg overflow-clip">
                <ProfileUserPanel />

                {Object.entries(ratings).map(([key, value]) => (
                    <ProfileGamePanel name={keyToName(key)} {...value} key={key} />
                ))}
            </Tab.Panels>
        </Tab.Group>
    )
}

export const ratings = {
    ttt: {rating: 1500, games: 0, provisional: true},
    uttt: {rating: 1537, games: 177, provisional: false},
    connectFour: {rating: 1224, games: 12, provisional: true},
    pokemonChess: {rating: 1537, games: 177, provisional: false}
}

export function keyToName(key: string) {
    switch (key) {
        case 'ttt': return 'Tic-Tac-Toe';
        case 'uttt': return 'Ultimate Tic-Tac-Toe';
        case 'connectFour': return 'Connect 4';
        case 'pokemonChess': return 'Pokemon Chess';
    }
    return 'Unknown game';
}
