'use client'

import {ReactNode} from 'react';
import {useRouter} from 'next/navigation';
import {DateTime} from 'luxon';
import {BiSolidPlusSquare, BiSolidMinusSquare} from 'react-icons/bi';
import type {GameInfo} from '../game/[id]/page';

// Util
import {keyToIcon} from './ProfileSidebarItem';
import {timeControlToString} from '../../util/game';


export default function ProfileGame(props: GameInfo) {
    const Icon = keyToIcon(props.game.key);

    // TODO: not valid as table row, but somehow use `<a>` or `<Link>`?
    const {push} = useRouter();

    return (
        <div
            className="table-row text-sm text-primary cursor-pointer hover:bg-blue-500/20"
            onClick={() => push(`/game/${props.id}`)}
        >
            <ProfileGameCell>
                <Icon className="text-4xl" />
            </ProfileGameCell>
            <ProfileGameCell>
                <strong className="font-medium">{props.first.username}</strong> ({props.first.rating})
                <br />
                <strong className="font-medium">{props.second.username}</strong> ({props.second.rating})
            </ProfileGameCell>
            <ProfileGameCell>
                {timeControlToString(props.timeControl)} | {props.game.key.toUpperCase()}
            </ProfileGameCell>
            <ProfileGameCell>
                {/* TODO */}
                <BiSolidPlusSquare className="inline text-theme-green text-lg mr-1.5" />
                1-0
            </ProfileGameCell>
            <ProfileGameCell className="text-right">
                {DateTime.fromSQL(props.createdAt).toLocaleString()}
            </ProfileGameCell>
        </div>
    )
}

function ProfileGameCell(props: {children: ReactNode, className?: string}) {
    return (
        <div className={'table-cell px-6 py-3 border-t border-tertiary align-middle' + (props.className ? ` ${props.className}` : '')}>
            {props.children}
        </div>
    )
}
