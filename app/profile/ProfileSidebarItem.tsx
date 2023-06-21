'use client'

import {Tab} from '@headlessui/react';
import {GiPotato} from 'react-icons/gi';
import {AiFillCaretRight} from 'react-icons/ai';


type ProfileSidebarItemProps = {name: string, rating: number, games: number, provisional?: boolean}
export default function ProfileSidebarItem(props: ProfileSidebarItemProps) {
    return (
        <Tab className="group text-secondary flex gap-3 items-center hover:bg-content-secondary/50 ui-selected:bg-content rounded-l pl-4 pr-8 py-3 transition duration-150">
            {/* TODO: icon */}
            <GiPotato className="text-4xl group-hover:text-blue-500" />
            <div>
                <h5 className="uppercase font-light text-left">{props.name}</h5>
                <p className="flex gap-2 text-sm items-center">
                    <strong className="text-lg">{props.rating}{props.provisional && '?'}</strong>
                    {props.games} games
                </p>
            </div>
            <AiFillCaretRight className="text-lg text-secondary group-hover:text-blue-500 ml-auto" />
        </Tab>
    )
}
