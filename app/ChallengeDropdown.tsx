'use client'

import {useContext} from 'react';
import {Menu} from '@headlessui/react';

// Contexts
import UserContext from '../contexts/UserContext';
import ChallengesContext, {Challenge} from '../contexts/ChallengesContext';

// Icons
import {RiSwordFill} from 'react-icons/ri';
import {BsInfoCircleFill} from 'react-icons/bs';
import {keyToIcon} from './profile/ProfileSidebarItem';
import {timeControlToString} from '../util/game';


export default function ChallengeDropdown() {
    const {user} = useContext(UserContext);
    const {challenges} = useContext(ChallengesContext);

    async function signOut() {
        await fetch(`${process.env.API_BASE}/logout`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    return (
        <Menu as="div" className="h-full">
            <Menu.Button className="px-2 py-4 ui-open:bg-[#3c3934] hover:text-primary h-full">
                <RiSwordFill className="text-lg" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 bg-[#3c3934] py-1 rounded-l text-sm w-72 shadow-xl z-10">
                {challenges.length === 0 ? (
                    <div className="py-7 text-sm flex justify-center items-center gap-2">
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

function ChallengeDropdownItem(props: Challenge) {
    const Icon = keyToIcon(props.game.key);

    return (
        <Menu.Item
            as="div"
            className="flex gap-2.5 items-center px-4 py-1.5 cursor-pointer text-primary hover:text-white hover:bg-blue-500/20 group"
        >
            <Icon className="text-4xl" />
            <div>
                <h5>{props.user.username} ({props.user.rating}{props.user.provisional && '?'})</h5>
                <p>{props.rated ? 'Rated' : 'Casual'} {timeControlToString(props.timeControl)}</p>
            </div>
        </Menu.Item>
    )
}
