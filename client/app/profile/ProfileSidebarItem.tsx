'use client'

import {Tab} from '@headlessui/react';
import {keyToName} from './ProfileContent';
import type {GameKey, GamePerf} from '../../contexts/ProfileContext';

// Icons
import {GiPotato} from 'react-icons/gi';
import {MdCatchingPokemon, MdGrid3X3, MdGrid4X4} from 'react-icons/md';
import {PiNumberCircleFourFill} from 'react-icons/pi';
import {AiFillCaretRight} from 'react-icons/ai';
import {ImArrowDownRight, ImArrowUpRight} from 'react-icons/im';


export default function ProfileSidebarItem(props: GamePerf & {game: GameKey}) {
    const Icon = keyToIcon(props.game);

    return (
        <Tab className={'group flex gap-1.5 md:gap-3 items-center hover:bg-content-secondary/50 ui-selected:bg-content rounded-t md:rounded-r-none md:rounded-l pl-2.5 lg:pl-4 pr-4 lg:pr-8 py-2 md:py-3 transition duration-150 ' + (props.games ? 'text-secondary' : 'text-tertiary')}>
            <Icon className="text-2xl md:text-4xl group-hover:text-blue-500 flex-none" />
            <div>
                <h5 className="hidden lg:block uppercase font-light text-left">
                    {keyToName(props.game)}
                </h5>
                <p className="flex flex-wrap gap-x-1.5 text-sm items-center">
                    <strong className="md:text-lg">{Math.floor(props.rating)}{props.prov && '?'}</strong>
                    {props.prog > 0 ? (
                        <span className="text-theme-green hidden lg:block">
                            <ImArrowUpRight className="inline" /> {props.prog.toFixed()}
                        </span>
                    ) : props.prog < 0 ? (
                        <span className="text-theme-red hidden lg:block">
                            <ImArrowDownRight className="inline" /> {Math.abs(props.prog).toFixed()}
                        </span>
                    ) : null}
                    <span className="hidden lg:block">
                        {props.games} game{props.games === 1 ? '' : 's'}
                    </span>
                </p>
            </div>
            <AiFillCaretRight className="hidden lg:block text-lg text-secondary group-hover:text-blue-500 ml-auto flex-none" />
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
