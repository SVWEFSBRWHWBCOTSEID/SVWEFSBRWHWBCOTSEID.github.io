'use client'

import {ReactElement, useEffect, useRef} from 'react';


export default function ScaledBox(props: {children: ReactElement, className?: string, rescale?: unknown[]}) {
    const parentRef = useRef<HTMLDivElement>(null);

    // Scales the child of this wrapper to fit within the wrapper's bounding box, maintaining the child's aspect ratio.
    // https://stackoverflow.com/questions/61533780/how-to-use-css-transform-scale-to-fit-child-div-to-parent-div-responsively-i
    function scaleChildren() {
        if (!parentRef.current) return;
        const child = parentRef.current.children[0] as HTMLElement;

        child.style.transform = `scale(1, 1)`;

        let { width: cw, height: ch } = child.getBoundingClientRect();
        let { width: ww, height: wh } = parentRef.current.getBoundingClientRect();

        // Don't scale up; constrain it below 1
        const scaleFactor = Math.min(ww / cw, wh / ch, 1);

        child.style.transform = `scale(${scaleFactor}, ${scaleFactor})`;
        child.style.transformOrigin = 'center';
    }

    // Allow rescaling-on-demand when given prop(s) changes
    useEffect(scaleChildren, props.rescale);

    useEffect(() => {
        window.addEventListener('resize', scaleChildren);
        return () => window.removeEventListener('resize', scaleChildren);
    }, [])

    return (
        // TODO: hacky
        <div className={'flex-grow min-w-0 min-h-0 flex justify-center items-center' + (props.className ? ` ${props.className}` : '')} ref={parentRef}>
            {props.children}
        </div>
    )
}
