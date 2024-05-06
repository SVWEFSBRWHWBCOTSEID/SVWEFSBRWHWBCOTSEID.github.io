import type { InputHTMLAttributes } from 'react';


export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    const { className, ...inputProps } = props;

    return (
        <input
            className={'rounded px-4 py-2 bg-content-tertiary border border-tertiary focus:outline-none focus:ring-[3px] placeholder:text-secondary/50 placeholder:italic' + (className ? ` ${className}` : '')}
            {...inputProps}
        />
    )
}
