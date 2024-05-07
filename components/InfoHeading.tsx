import type { ReactNode } from 'react';
import { FiLink } from 'react-icons/fi';


type InfoHeadingProps = {
    children: ReactNode,
    id: string
}
export default function InfoHeading(props: InfoHeadingProps) {
    return (
        <a href={`#${props.id}`} className="group flex relative border-b border-theme-yellow mb-6 text-white">
            {/* Floating anchor */}
            <span id={props.id} className="absolute -top-16" />

            <h2 className="text-2xl pb-2">{props.children}</h2>
            <FiLink className="hidden group-hover:block text-xl text-secondary pb-0.5 mt-2 stroke-[1.5px] absolute -left-8" />
        </a>
    )
}
