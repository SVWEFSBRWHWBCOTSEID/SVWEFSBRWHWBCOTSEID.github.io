'use client'

import {Tab} from '@headlessui/react';
import {keyToName} from './ProfileContent';
import type {GameKey, GamePerf} from '../../contexts/ProfileContext';

// Icons
import {GiPotato} from 'react-icons/gi';
import {MdCatchingPokemon, MdGrid3X3, MdGrid4X4} from 'react-icons/md';
import {PiNumberCircleFourFill} from 'react-icons/pi';
import {AiFillCaretRight} from 'react-icons/ai';


export default function ProfileSidebarItem(props: GamePerf & {game: GameKey}) {
    const Icon = keyToIcon(props.game);

    return (
        <Tab className={'group flex gap-3 items-center hover:bg-content-secondary/50 ui-selected:bg-content rounded-l pl-4 pr-8 py-3 transition duration-150 ' + (props.games ? 'text-secondary' : 'text-tertiary')}>
            <Icon className="text-4xl group-hover:text-blue-500" />
            <div>
                <h5 className="uppercase font-light text-left">{keyToName(props.game)}</h5>
                <p className="flex gap-2 text-sm items-center">
                    <strong className="text-lg">{props.rating}{props.prov && '?'}</strong>
                    {props.games} games
                </p>
            </div>
            <AiFillCaretRight className="text-lg text-secondary group-hover:text-blue-500 ml-auto" />
        </Tab>
    )
}

export function keyToIcon(key: GameKey) {
    switch (key) {
        case 'ttt': return MdGrid3X3;
        case 'uttt': return MdGrid4X4; // TODO
        case 'c4': return PiNumberCircleFourFill;
        case 'pc': return MdCatchingPokemon;
        default: return GiPotato;
    }
}
