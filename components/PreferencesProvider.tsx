'use client'

import {ReactNode, useLayoutEffect, useState} from 'react';
import PreferencesContext, {defaultPreferences, Preferences} from '../contexts/PreferencesContext';


export default function PreferencesProvider(props: {children: ReactNode}) {
    const [preferences, setPreferences] = useState(defaultPreferences);

    // Load saved preferences from `localStorage` on mount
    useLayoutEffect(() => {
        const raw = localStorage.getItem('preferences');
        if (!raw) return localStorage.setItem('preferences', JSON.stringify(preferences));

        setPreferences(JSON.parse(raw));
    }, []);

    // Update the user's current preferences by setting the context and writing a backup to `localStorage`.
    function updatePreferences(newPreferences: Preferences) {
        localStorage.setItem('preferences', JSON.stringify(newPreferences));
        setPreferences(newPreferences);
        console.log(newPreferences)
    }

    return (
        <PreferencesContext.Provider value={{preferences, setPreferences: updatePreferences}}>
            {props.children}
        </PreferencesContext.Provider>
    )
}
