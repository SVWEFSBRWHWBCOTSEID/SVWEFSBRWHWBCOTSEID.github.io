import {ReactNode} from 'react';

export default function LobbyRoom() {
    return (
        <div className="px-4 table-row text-secondary">
            <LobbyCell>Gunstable</LobbyCell>
            <LobbyCell>1537</LobbyCell>
            <LobbyCell>5+5</LobbyCell>
            <LobbyCell>UTTT</LobbyCell>
        </div>
    )
}

export function LobbyCell(props: {children: ReactNode}) {
    return (
        <span className="table-cell border-t border-tertiary px-4 py-1">
            {props.children}
        </span>
    )
}
