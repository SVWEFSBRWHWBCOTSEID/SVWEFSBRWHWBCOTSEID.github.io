'use client'

import {TextareaHTMLAttributes, useRef} from 'react';


export default function AutoResizingTextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const {onChange, className, ...textAreaProps} = props;

    return (
        <textarea
            ref={textAreaRef}
            className={'rounded px-4 py-2 bg-content-tertiary border border-tertiary focus:outline-none focus:ring-[3px] placeholder:text-secondary/50 placeholder:italic' + (className ? ` ${className}` : '')}
            onChange={(e) => {
                onChange?.(e);

                // <textarea> auto-resizing
                // https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
                const textArea = textAreaRef.current;
                if (!textArea) return;
                textArea.style.height = 'auto';
                textArea.style.height = textArea.scrollHeight + 8 + 'px';
            }}
            {...textAreaProps}
        />
    )
}
