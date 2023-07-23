import {ReactNode} from 'react';
import {DateTime} from 'luxon';
import type {GameInfo} from '../game/[id]/page';

// Util
import {keyToIcon} from './ProfileSidebarItem';
import {timeControlToString} from '../../util/game';


export default function ProfileGame(props: GameInfo) {
    const Icon = keyToIcon(props.game.key);

    return (
        <div className="table-row text-sm">
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
            <ProfileGameCell>1-0</ProfileGameCell> {/* TODO */}
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
