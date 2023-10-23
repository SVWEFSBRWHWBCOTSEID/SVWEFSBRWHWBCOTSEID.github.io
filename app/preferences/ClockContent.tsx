'use client'

import {useContext} from 'react';
import PreferencesInputGroup from './PreferencesInputGroup';
import PreferencesButton from './PreferencesButton';
import PreferencesContext from '../../contexts/PreferencesContext';


export default function ClockContent() {
    const {preferences, setPreferences} = useContext(PreferencesContext);

    function updateShowTenthSeconds(value: 'ALWAYS' | 'CRITICAL' | 'NEVER') {
        const newPreferences = structuredClone(preferences); // TODO: structured clone necessary?
        newPreferences.clock.showTenthSeconds = value;
        setPreferences(newPreferences);
    }

    function updateShowProgressBars(value: boolean) {
        const newPreferences = structuredClone(preferences);
        newPreferences.clock.showProgressBars = value;
        setPreferences(newPreferences);
    }

    function updatePlayCriticalSound(value: boolean) {
        const newPreferences = structuredClone(preferences);
        newPreferences.clock.playCriticalSound = value;
        setPreferences(newPreferences);
    }

    return (
        <>
            <h1 className="text-4xl mb-6 text-theme-orange">Clock</h1>
            <p>[...]</p>

            <PreferencesInputGroup label="Show tenths of seconds">
                <PreferencesButton onClick={() => updateShowTenthSeconds('ALWAYS')} selected={preferences.clock.showTenthSeconds === 'ALWAYS'}>
                    Always
                </PreferencesButton>
                <PreferencesButton onClick={() => updateShowTenthSeconds('CRITICAL')} selected={preferences.clock.showTenthSeconds === 'CRITICAL'}>
                    When time remaining {'<'} 10 seconds
                </PreferencesButton>
                <PreferencesButton onClick={() => updateShowTenthSeconds('NEVER')} selected={preferences.clock.showTenthSeconds === 'NEVER'}>
                    Never
                </PreferencesButton>
            </PreferencesInputGroup>

            <PreferencesInputGroup label="Show green progress bars">
                <PreferencesButton onClick={() => updateShowProgressBars(true)} selected={preferences.clock.showProgressBars}>
                    Always
                </PreferencesButton>
                <PreferencesButton onClick={() => updateShowProgressBars(false)} selected={!preferences.clock.showProgressBars}>
                    Never
                </PreferencesButton>
            </PreferencesInputGroup>

            <PreferencesInputGroup label="Play a sound when time gets critical">
                <PreferencesButton onClick={() => updatePlayCriticalSound(true)} selected={preferences.clock.playCriticalSound}>
                    Always
                </PreferencesButton>
                <PreferencesButton onClick={() => updatePlayCriticalSound(false)} selected={!preferences.clock.playCriticalSound}>
                    Never
                </PreferencesButton>
            </PreferencesInputGroup>
        </>
    )
}
