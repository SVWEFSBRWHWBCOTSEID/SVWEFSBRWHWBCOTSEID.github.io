'use client'

import {useContext} from 'react';
import {Tab} from '@headlessui/react';
import ProfileSidebarItem from './ProfileSidebarItem';
import {AiFillCaretRight} from 'react-icons/ai';
import ProfileContext, {GameKey} from '../../contexts/ProfileContext';


export default function ProfileSidebar() {
    const {perfs} = useContext(ProfileContext);

    return (
        <Tab.List as="aside" className="flex md:flex-col flex-wrap md:flex-nowrap flex-none pt-1 md:w-32 lg:w-64 xl:w-72 transition-[width] duration-200">
            {/* TODO: styling? */}
            <Tab className="group text-secondary flex gap-3 items-center hover:bg-content-secondary/50 ui-selected:bg-content rounded-t md:rounded-r-none md:rounded-l pl-4 pr-4 md:pr-8 py-2 md:py-3 transition duration-150">
                <h5 className="text-sm md:text-base uppercase font-light text-left">Profile</h5>
                <AiFillCaretRight className="hidden lg:block text-lg text-secondary group-hover:text-theme-blue ml-auto" />
            </Tab>

            <hr className="hidden md:block my-4 mx-6 border-t border-tertiary" />

            {Object.entries(perfs).map(([key, value]) => (
                <ProfileSidebarItem game={key as GameKey} {...value} key={key} />
            ))}
        </Tab.List>
    )
}
