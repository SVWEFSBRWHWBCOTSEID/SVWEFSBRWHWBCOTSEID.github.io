import type {MouseEventHandler} from 'react';
import {Menu} from '@headlessui/react';
import {BiCheck} from 'react-icons/bi';

// Utils
import type {Challenge} from '../contexts/ChallengesContext';
import {keyToIcon} from './profile/ProfileSidebarItem';
import {timeControlToString} from '../util/game';


export default function ChallengeDropdownItem(props: Challenge) {
    const Icon = keyToIcon(props.game.key);

    async function acceptChallenge() {
        await fetch(`${process.env.API_BASE}/challenge/${props.user.username}/true`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    async function declineChallenge() {
        await fetch(`${process.env.API_BASE}/challenge/${props.user.username}/true`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    return (
        <Menu.Item
            as="div"
            className="flex gap-2.5 items-center pl-4 text-primary hover:text-white hover:bg-blue-500/20 group transition duration-100"
        >
            <Icon className="text-4xl" />
            <div>
                <h5 className="font-semibold">
                    {props.user.username} ({props.user.rating}{props.user.provisional && '?'})
                </h5>
                <p className="text-sm">
                    {props.rated ? 'Rated' : 'Casual'} {timeControlToString(props.timeControl)} {props.game.name}
                </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 flex flex-col ml-2.5 transition duration-100">
                <AcceptButton onClick={acceptChallenge} />
                <DeclineButton onClick={declineChallenge} />
            </div>
        </Menu.Item>
    )
}

function DeclineButton(props: {onClick?: MouseEventHandler<HTMLButtonElement>}) {
    return (
        <button
            className="flex-none text-red-600 text-4xl w-16 h-10 flex items-center justify-center hover:border-none hover:text-white hover:bg-red-600 transition duration-150 pb-2"
            onClick={props.onClick}
        >
            ×
        </button>
    )
}

function AcceptButton(props: {onClick?: MouseEventHandler<HTMLButtonElement>}) {
    return (
        <button
            className="flex-none text-theme-green text-4xl w-16 h-10 flex items-center justify-center font-bold hover:border-none hover:text-white hover:bg-theme-green transition duration-150"
            onClick={props.onClick}
        >
            <BiCheck />
        </button>
    )
}
