import {ReactNode} from 'react';
import Link from 'next/link';


export default function GameCard(props: {href: string, name: string, src: string, children?: ReactNode}) {
    return (
        <Link href={props.href} className="flex flex-col rounded-lg overflow-clip shadow-lg bg-black/30 border border-tertiary hover:border-secondary transition duration-150">
            <img src={props.src} alt={props.name} className="w-96 aspect-[7/5] object-cover object-center" />
            <div className="px-5 py-3">
                <h3 className="font-medium">
                    {props.name}
                </h3>

                {props.children && <p className="text-sm text-secondary">{props.children}</p>}
            </div>
        </Link>
    )
}
