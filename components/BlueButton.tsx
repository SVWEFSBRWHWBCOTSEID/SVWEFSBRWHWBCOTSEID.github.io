import { ButtonHTMLAttributes } from 'react';


export default function BlueButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const { className, ...buttonProps } = props;

    return (
        <button
            className={'rounded bg-theme-blue uppercase px-4 py-2.5 font-medium disabled:opacity-50 hover:bg-[#56a3eb] disabled:hover:bg-theme-blue transition duration-100' + (className ? ` ${className}` : '')}
            {...buttonProps}
        />
    )
}
