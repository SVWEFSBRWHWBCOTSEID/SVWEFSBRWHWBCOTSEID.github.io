'use client'

import {Tab} from '@headlessui/react';
import {GiPotato} from 'react-icons/gi';
import {AiFillCaretRight} from 'react-icons/ai';
import {GamePerf} from '../../contexts/ProfileContext';


export default function ProfileSidebarItem(props: GamePerf & {name: string}) {
    return (
        <Tab className={'group flex gap-3 items-center hover:bg-content-secondary/50 ui-selected:bg-content rounded-l pl-4 pr-8 py-3 transition duration-150 ' + (props.games ? 'text-secondary' : 'text-tertiary')}>
            {/* TODO: icon */}
            <GiPotato className="text-4xl group-hover:text-blue-500" />
            <div>
                <h5 className="uppercase font-light text-left">{props.name}</h5>
                <p className="flex gap-2 text-sm items-center">
                    <strong className="text-lg">{props.rating}{props.prov && '?'}</strong>
                    {props.games} games
                </p>
            </div>
            <AiFillCaretRight className="text-lg text-secondary group-hover:text-blue-500 ml-auto" />
        </Tab>
    )
}
