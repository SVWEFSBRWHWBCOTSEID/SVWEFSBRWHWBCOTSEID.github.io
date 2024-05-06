'use client'

import {ReactNode, useContext} from 'react';
import Link from 'next/link';
import {DateTime} from 'luxon';
import {BiSolidPlusSquare, BiSolidMinusSquare} from 'react-icons/bi';
import type {EndType, GameInfo, Status} from '../game/[id]/page';

// Util
import {keyToIcon} from './ProfileSidebarItem';
import {timeControlToString} from '../../util/game';
import ProfileContext from '../../contexts/ProfileContext';


export type ProfileGameInfo = GameInfo & {
    status: Status,
    endType: EndType
}
export default function ProfileGame(props: ProfileGameInfo) {
    const Icon = keyToIcon(props.game.key);
    const {username} = useContext(ProfileContext);

    const href = `/game/${props.id}`;

    return (
        <div className="table-row text-sm text-primary cursor-pointer hover:bg-blue-500/20">
            <ProfileGameCell href={href}>
                <Icon className="text-4xl" />
            </ProfileGameCell>
            <ProfileGameCell href={href}>
                <strong className="font-medium">{props.first.username}</strong> ({props.first.rating})
                <br />
                <strong className="font-medium">{props.second.username}</strong> ({props.second.rating})
            </ProfileGameCell>
            <ProfileGameCell href={href}>
                {timeControlToString(props.timeControl)} | {props.game.key.toUpperCase()}
            </ProfileGameCell>
            <ProfileGameCell href={href}>
                {props.status === 'DRAW' ? (
                    <><BiSolidMinusSquare className="inline text-primary text-lg mr-1.5" /> 0.5-0.5</>
                ) : (props.status === 'FIRST_WON' && username === props.first.username) || (props.status === 'SECOND_WON' && username === props.second.username) ? (
                    <><BiSolidPlusSquare className="inline text-theme-green text-lg mr-1.5" /> 1-0</>
                ) : (
                    <><BiSolidMinusSquare className="inline text-theme-red text-lg mr-1.5" /> 0-1</>
                )}
            </ProfileGameCell>
            <ProfileGameCell href={href} className="text-right">
                {DateTime.fromSQL(props.createdAt).toLocaleString()}
            </ProfileGameCell>
        </div>
    )
}

function ProfileGameCell(props: {children: ReactNode, href: string, className?: string}) {
    return (
        <Link
            href={props.href}
            className={'table-cell px-6 py-3 border-t border-tertiary align-middle' + (props.className ? ` ${props.className}` : '')}
        >
            {props.children}
        </Link>
    )
}
