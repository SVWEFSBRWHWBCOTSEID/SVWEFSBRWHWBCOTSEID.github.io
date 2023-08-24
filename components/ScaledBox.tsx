'use client'

import {ReactNode, useEffect, useRef} from 'react';


export default function ScaledBox(props: {children: ReactNode}) {
    const parentRef = useRef<HTMLDivElement>(null);

    // Scales the child of this wrapper to fit within the wrapper's bounding box, maintaining the child's aspect ratio.
    function scaleChildren() {
        if (!parentRef.current) return;
        const child = parentRef.current.children[0] as HTMLElement;

        child.style.transform = `scale(1, 1)`;

        let { width: cw, height: ch } = child.getBoundingClientRect();
        let { width: ww, height: wh } = parentRef.current.getBoundingClientRect();

        const scaleFactor = Math.min(ww / cw, wh / ch);

        child.style.transform = `scale(${scaleFactor}, ${scaleFactor})`;
        child.style.transformOrigin = 'center';
    }

    useEffect(() => {
        scaleChildren();
        window.addEventListener('resize', scaleChildren);
        return () => window.removeEventListener('resize', scaleChildren);
    }, [])

    return (
        // TODO: hacky
        <div className="flex-grow min-w-0 flex justify-center" ref={parentRef}>
            {props.children}
        </div>
    )
}
