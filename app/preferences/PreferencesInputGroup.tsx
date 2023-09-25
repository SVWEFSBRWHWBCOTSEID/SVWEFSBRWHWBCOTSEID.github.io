import {ReactNode} from 'react';


export default function PreferencesInputGroup(props: {label: string, children: ReactNode}) {
    return (
        <div className="mt-12">
            <h2 className="flex items-center gap-4 mb-3 text-lg font-light text-secondary after:block after:h-0.5 after:w-full after:bg-gradient-to-r after:from-theme-orange/50 after:to-transparent">
                <span className="flex-none">{props.label}</span>
            </h2>
            <div className="flex shadow-md rounded-sm overflow-clip">
                {props.children}
            </div>
        </div>
    )
}
