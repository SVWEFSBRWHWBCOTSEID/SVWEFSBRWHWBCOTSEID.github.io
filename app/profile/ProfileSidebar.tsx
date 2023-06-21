'use client'

import {Tab} from '@headlessui/react';
import ProfileSidebarItem from './ProfileSidebarItem';


export default function ProfileSidebar() {
    return (
        <Tab.List as="aside" className="flex flex-col">
            <ProfileSidebarItem name="Tic-tac-toe" rating={1881} games={117} />
            <ProfileSidebarItem name="Ultimate tic-tac-toe" rating={1537} games={177} />
            <ProfileSidebarItem name="Connect 4" rating={1224} games={12} provisional />
            <ProfileSidebarItem name="Pokemon chess" rating={2335} games={467} />
            {/*
            <ProfileSidebarItem />
            <ProfileSidebarItem />
            <ProfileSidebarItem />
            <ProfileSidebarItem />
            */}
        </Tab.List>
    )
}
