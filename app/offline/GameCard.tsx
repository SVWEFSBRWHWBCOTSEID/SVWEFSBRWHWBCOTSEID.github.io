import {ReactNode} from 'react';
import Link from 'next/link';


export default function GameCard(props: {href: string, name: string, src: string, children?: ReactNode}) {
    return (
        <Link href={props.href} className="flex flex-col rounded-lg overflow-clip shadow-lg bg-black/30 border border-zinc-700 hover:border-secondary transition duration-150">
            <div className="px-5 pt-4 pb-2.5">
                <h3 className="font-medium">
                    {props.name}
                </h3>

                {props.children && <p>{props.children}</p>}
            </div>
            <img src={props.src} alt={props.name} className="w-96 aspect-[4/3] object-cover object-center" />
        </Link>
    )
}
