'use client'

import {Tab} from '@headlessui/react';
import ProfileSidebarItem from './ProfileSidebarItem';
import {AiFillCaretRight} from 'react-icons/ai';
import {ratings, keyToName} from './ProfileContent';


export default function ProfileSidebar() {
    return (
        <Tab.List as="aside" className="flex flex-col">
            {/* TODO: styling? */}
            <Tab className="group text-secondary flex gap-3 items-center hover:bg-content-secondary/50 ui-selected:bg-content rounded-l pl-4 pr-8 py-3 transition duration-150">
                <h5 className="uppercase font-light text-left">Profile</h5>
                <AiFillCaretRight className="text-lg text-secondary group-hover:text-blue-500 ml-auto" />
            </Tab>

            <hr className="my-4 mx-6 border-t border-tertiary" />

            {Object.entries(ratings).map(([key, value]) => (
                <ProfileSidebarItem name={keyToName(key)} {...value} key={key} />
            ))}
        </Tab.List>
    )
}
