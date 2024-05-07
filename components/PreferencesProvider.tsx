'use client'

import { ReactNode, useContext, useLayoutEffect, useState } from 'react';

// Contexts
import PreferencesContext, { defaultPreferences, Preferences } from '@/contexts/PreferencesContext';
import UserContext from '@/contexts/UserContext';


export default function PreferencesProvider(props: { children: ReactNode }) {
    const { user } = useContext(UserContext);
    const [preferences, setPreferences] = useState(defaultPreferences);

    // Load saved preferences from `localStorage` on mount
    useLayoutEffect(() => {
        const raw = localStorage.getItem('preferences');
        if (!raw) return localStorage.setItem('preferences', JSON.stringify(preferences));

        // TODO: eventually need deepmerge here
        const merged = { ...defaultPreferences, ...JSON.parse(raw) };
        setPreferences(merged);
        localStorage.setItem('preferences', JSON.stringify(merged));
    }, []);

    // Update the user's preferences by fetching the backend with the new data (if signed in). If successful, the
    // backend will dispatch an event that updates the local preferences on all devices. If the user is not signed in,
    // this is equivalent to calling `setLocalPreferences`.
    async function updatePreferences(newPreferences: Preferences) {
        if (!user) return setLocalPreferences(newPreferences);
        await fetch(`${process.env.API_BASE}/preferences/update`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(newPreferences)
        })
    }

    // Update the user's local preferences by setting the context and writing a backup to `localStorage`.
    function setLocalPreferences(newPreferences: Preferences) {
        localStorage.setItem('preferences', JSON.stringify(newPreferences));
        setPreferences(newPreferences);
        console.log(newPreferences)
    }

    return (
        <PreferencesContext.Provider value={{ preferences, setPreferences: updatePreferences, setLocalPreferences }}>
            {props.children}
        </PreferencesContext.Provider>
    )
}
