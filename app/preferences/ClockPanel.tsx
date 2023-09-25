'use client'

import {MouseEventHandler, ReactNode, useState} from 'react';
import InfoPanel from '../../components/InfoPanel';


export default function ClockPanel() {
    const [showTenthSeconds, setShowTenthSeconds] = useState('CRITICAL');
    const [showProgressBars, setShowProgressBars] = useState(true);
    const [playCriticalSound, setPlayCriticalSound] = useState(true);

    return (
        <InfoPanel>
            <h1 className="text-4xl mb-6 text-theme-orange">Clock</h1>
            <p>[...]</p>

            <PreferencesInputGroup label="Show tenths of seconds">
                <PreferencesButton onClick={() => setShowTenthSeconds('NEVER')} selected={showTenthSeconds === 'NEVER'}>
                    Never
                </PreferencesButton>
                <PreferencesButton onClick={() => setShowTenthSeconds('CRITICAL')} selected={showTenthSeconds === 'CRITICAL'}>
                    When time remaining {'<'} 10 seconds
                </PreferencesButton>
                <PreferencesButton onClick={() => setShowTenthSeconds('ALWAYS')} selected={showTenthSeconds === 'ALWAYS'}>
                    Always
                </PreferencesButton>
            </PreferencesInputGroup>

            <PreferencesInputGroup label="Show green progress bars">
                <PreferencesButton onClick={() => setShowProgressBars(true)} selected={showProgressBars}>
                    Always
                </PreferencesButton>
                <PreferencesButton onClick={() => setShowProgressBars(false)} selected={!showProgressBars}>
                    Never
                </PreferencesButton>
            </PreferencesInputGroup>

            <PreferencesInputGroup label="Play a sound when time gets critical">
                <PreferencesButton onClick={() => setPlayCriticalSound(true)} selected={playCriticalSound}>
                    Always
                </PreferencesButton>
                <PreferencesButton onClick={() => setPlayCriticalSound(false)} selected={!playCriticalSound}>
                    Never
                </PreferencesButton>
            </PreferencesInputGroup>
        </InfoPanel>
    )
}

function PreferencesInputGroup(props: {label: string, children: ReactNode}) {
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

function PreferencesButton(props: {onClick: MouseEventHandler<HTMLButtonElement>, selected: boolean, children: ReactNode}) {
    return (
        <button
            onClick={props.onClick}
            className={'py-3 flex-grow text-sm transition duration-100 ' + (props.selected ? 'bg-[#4d4d4d] font-semibold' : 'bg-[#302e2c] hover:bg-[hsl(37,_7%,_25%)]')}
        >
            {props.children}
        </button>
    )
}

type Preferences = {
    clock: {
        showTenthSeconds: 'NEVER' | 'CRITICAL' | 'ALWAYS',
        showProgressBars: boolean,
        playCriticalSound: boolean
    }
}
