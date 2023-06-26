import {ReactNode} from 'react';
import Link from 'next/link';


export default function LobbyRoom() {
    return (
        <Link className="px-4 table-row text-secondary group" href="/ttt/123">
            <LobbyCell>Gunstable</LobbyCell>
            <LobbyCell>1537</LobbyCell>
            <LobbyCell>5+5</LobbyCell>
            <LobbyCell>UTTT</LobbyCell>
        </Link>
    )
}

export function LobbyCell(props: {children: ReactNode}) {
    return (
        <span className="table-cell border-t border-tertiary px-4 py-1 group-hover:text-white group-hover:bg-[rgb(214_79_0_/_0.5)]">
            {props.children}
        </span>
    )
}
