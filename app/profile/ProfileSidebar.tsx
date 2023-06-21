'use client'

import {Tab} from '@headlessui/react';
import ProfileSidebarItem from './ProfileSidebarItem';
import {AiFillCaretRight} from 'react-icons/ai';


export default function ProfileSidebar() {
    return (
        <Tab.List as="aside" className="flex flex-col">
            {/* TODO: styling? */}
            <Tab className="group text-secondary flex gap-3 items-center hover:bg-content-secondary/50 ui-selected:bg-content rounded-l pl-4 pr-8 py-3 transition duration-150">
                <h5 className="uppercase font-light text-left">Profile</h5>
                <AiFillCaretRight className="text-lg text-secondary group-hover:text-blue-500 ml-auto" />
            </Tab>

            <hr className="my-4 mx-6 border-t border-tertiary" />

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
