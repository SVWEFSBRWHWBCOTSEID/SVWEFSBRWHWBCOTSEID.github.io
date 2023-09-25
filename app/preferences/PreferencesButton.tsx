'use client'

import {MouseEventHandler, ReactNode} from 'react';


export default function PreferencesButton(props: {onClick: MouseEventHandler<HTMLButtonElement>, selected: boolean, children: ReactNode}) {
    return (
        <button
            onClick={props.onClick}
            className={'py-3 flex-grow text-sm transition duration-100 ' + (props.selected ? 'bg-[#4d4d4d] font-semibold' : 'bg-[#302e2c] hover:bg-[hsl(37,_7%,_25%)]')}
        >
            {props.children}
        </button>
    )
}
