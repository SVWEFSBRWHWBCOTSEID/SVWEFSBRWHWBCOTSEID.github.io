import {createContext} from 'react';


export type Preferences = {
    clock: {
        showTenthSeconds: 'NEVER' | 'CRITICAL' | 'ALWAYS',
        showProgressBars: boolean,
        playCriticalSound: boolean
    },
    game: {
        confirmResign: boolean,
        boardScroll: boolean
    }
}

export const defaultPreferences: Preferences = {
    clock: {
        showTenthSeconds: 'CRITICAL',
        showProgressBars: true,
        playCriticalSound: true
    },
    game: {
        confirmResign: true,
        boardScroll: true
    }
}

type PreferencesContext = {
    preferences: Preferences,
    setPreferences: (p: Preferences) => void,
    setLocalPreferences: (p: Preferences) => void
}
const PreferencesContext = createContext<PreferencesContext>({
    preferences: defaultPreferences,
    setPreferences: () => {},
    setLocalPreferences: () => {}
});
export default PreferencesContext;
