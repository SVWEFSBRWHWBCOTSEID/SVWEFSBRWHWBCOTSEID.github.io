import {ButtonHTMLAttributes} from 'react';


export default function BlueButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
    const {className, ...buttonProps} = props;

    return (
        <button
            className={'rounded bg-blue-500 uppercase px-4 py-2.5 font-medium disabled:opacity-50 hover:bg-[#56a3eb] disabled:hover:bg-blue-500 transition duration-100' + (className ? ` ${className}` : '')}
            {...buttonProps}
        />
    )
}
