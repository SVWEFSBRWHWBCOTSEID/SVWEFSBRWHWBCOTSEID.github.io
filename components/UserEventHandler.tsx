'use client'

import {useContext, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import PreferencesContext, {Preferences} from '../contexts/PreferencesContext';
import type {GameKey} from '../contexts/ProfileContext';


type GameStartEvent = {
    type: 'GAME_START',
    game: GameKey,
    id: string,
}

type PreferencesUpdateEvent = {
    type: 'PREFERENCES_UPDATE',
    preferences: Preferences
}

type UserEvent = GameStartEvent | PreferencesUpdateEvent;

export default function UserEventHandler() {
    const {push} = useRouter();
    const {setPreferences} = useContext(PreferencesContext);

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/events`, {withCredentials: true});
        eventSource.onmessage = (m) => {
            const event: UserEvent = JSON.parse(m.data);

            switch (event.type) {
                case 'GAME_START':
                    push(`/game/${event.id}`); break;
                case 'PREFERENCES_UPDATE':
                    setPreferences(event.preferences); break;
            }
        }
    }, [])

    return null;
}
