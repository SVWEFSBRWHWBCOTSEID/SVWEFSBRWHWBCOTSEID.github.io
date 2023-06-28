import {MouseEventHandler} from 'react';


type CloseButtonProps = {className?: string, onClick?: MouseEventHandler<HTMLButtonElement>};
export default function CloseButton(props: CloseButtonProps) {
    return (
        <button
            type="button"
            aria-label="Close"
            className={'bg-[#3c3934] rounded-full w-8 h-8 flex items-center justify-center text-secondary text-2xl font-bold pb-[3px] shadow-sm' + (props.className ? ` ${props.className}` : '')}
            onClick={props.onClick}
        >
            <span aria-hidden>×</span>
        </button>
    )
}
