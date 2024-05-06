'use client'

import { useContext } from 'react';
import { Menu } from '@headlessui/react';

// Components
import ChallengeDropdownItem from './ChallengeDropdownItem';

// Contexts
import ChallengesContext from '../contexts/ChallengesContext';

// Icons
import { RiSwordFill } from 'react-icons/ri';
import { BsInfoCircleFill } from 'react-icons/bs';


export default function ChallengeDropdown() {
    const { challenges } = useContext(ChallengesContext);

    return (
        <Menu as="div" className="h-full">
            {/* Challenges alert */}
            <div className="relative">
                {challenges.length > 0 && (
                    <span className="text-xs font-semibold text-white bg-theme-orange rounded-full px-1.5 py-0.5 absolute top-1 -right-1">
                        {challenges.length}
                    </span>
                )}
            </div>

            <Menu.Button className="px-2 py-4 ui-open:bg-[#3c3934] hover:text-primary h-full">
                <RiSwordFill className="text-lg" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 bg-[#3c3934] rounded-l text-sm w-72 shadow-xl z-10 overflow-clip">
                {challenges.length === 0 ? (
                    <div className="py-8 text-sm flex justify-center items-center gap-2">
                        <BsInfoCircleFill className="text-base" /> No challenges.
                    </div>
                ) : (
                    <div className="flex flex-col">
                        {challenges.map((challenge) => (
                            <ChallengeDropdownItem
                                {...challenge}
                                key={challenge.id}
                            />
                        ))}
                    </div>
                )}
            </Menu.Items>
        </Menu>
    )
}
