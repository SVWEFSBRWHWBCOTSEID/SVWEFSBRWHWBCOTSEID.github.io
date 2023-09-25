'use client'

import {useState} from 'react';
import InfoPanel from '../../components/InfoPanel';
import PreferencesInputGroup from './PreferencesInputGroup';
import PreferencesButton from './PreferencesButton';


export default function ClockPanel() {
    const [showTenthSeconds, setShowTenthSeconds] = useState('CRITICAL');
    const [showProgressBars, setShowProgressBars] = useState(true);
    const [playCriticalSound, setPlayCriticalSound] = useState(true);

    return (
        <InfoPanel>
            <h1 className="text-4xl mb-6 text-theme-orange">Clock</h1>
            <p>[...]</p>

            <PreferencesInputGroup label="Show tenths of seconds">
                <PreferencesButton onClick={() => setShowTenthSeconds('ALWAYS')} selected={showTenthSeconds === 'ALWAYS'}>
                    Always
                </PreferencesButton>
                <PreferencesButton onClick={() => setShowTenthSeconds('CRITICAL')} selected={showTenthSeconds === 'CRITICAL'}>
                    When time remaining {'<'} 10 seconds
                </PreferencesButton>
                <PreferencesButton onClick={() => setShowTenthSeconds('NEVER')} selected={showTenthSeconds === 'NEVER'}>
                    Never
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

type Preferences = {
    clock: {
        showTenthSeconds: 'NEVER' | 'CRITICAL' | 'ALWAYS',
        showProgressBars: boolean,
        playCriticalSound: boolean
    }
}
