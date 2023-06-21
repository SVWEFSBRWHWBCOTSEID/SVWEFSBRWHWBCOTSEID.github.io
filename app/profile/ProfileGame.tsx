import {ReactNode} from 'react';
import {GiPotato} from 'react-icons/gi';


export default function ProfileGame() {
    return (
        <div className="table-row text-sm">
            <ProfileGameCell>
                <GiPotato className="text-4xl" />
            </ProfileGameCell>
            <ProfileGameCell>
                <strong className="font-medium">kepler</strong> (1537)
                <br />
                <strong className="font-medium">qpwoeirut</strong> (2768)
            </ProfileGameCell>
            <ProfileGameCell>5+5 | UTTT</ProfileGameCell>
            <ProfileGameCell>1-0</ProfileGameCell>
            <ProfileGameCell className="text-right">Jun 12 2023</ProfileGameCell>
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
