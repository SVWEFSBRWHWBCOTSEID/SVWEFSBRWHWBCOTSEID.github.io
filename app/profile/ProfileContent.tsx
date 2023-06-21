'use client'

import {Tab} from '@headlessui/react';
import ProfileSidebar from './ProfileSidebar';
import ProfileUserPanel from './ProfileUserPanel';
import ProfileGamePanel from './ProfileGamePanel';


// TODO: I wish that `use-client` didn't force this semi-hacky component wrapping, but alas
export default function ProfileContent() {
    return (
        <Tab.Group vertical as="div" className="container flex pt-4">
            <ProfileSidebar />
            <Tab.Panels className="flex-grow bg-content rounded-t-lg overflow-clip">
                <ProfileUserPanel />
                <ProfileGamePanel />
                <ProfileGamePanel />
                <ProfileGamePanel />
            </Tab.Panels>
        </Tab.Group>
    )
}
