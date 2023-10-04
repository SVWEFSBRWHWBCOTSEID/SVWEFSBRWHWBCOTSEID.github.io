'use client'

import {useContext, useEffect} from 'react';
import {useRouter} from 'next/navigation';

// Types
import type {GameKey} from '../contexts/ProfileContext';
import type {Conversation} from '../app/inbox/InboxSidebarItem';

// Contexts
import PreferencesContext, {Preferences} from '../contexts/PreferencesContext';
import ConversationContext from '../contexts/ConversationContext';


type UserFullEvent = {
    type: 'USER_FULL',
    conversations: Conversation[],
    preferences: Preferences
}

type GameStartEvent = {
    type: 'GAME_START',
    game: GameKey,
    id: string,
}

type PreferencesUpdateEvent = {
    type: 'PREFERENCES_UPDATE',
    preferences: Preferences
}

type UserEvent = UserFullEvent | GameStartEvent | PreferencesUpdateEvent;

export default function UserEventHandler() {
    const {push} = useRouter();
    const {setPreferences} = useContext(PreferencesContext);
    const {setConversations} = useContext(ConversationContext);

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/events`, {withCredentials: true});
        eventSource.onmessage = (m) => {
            const event: UserEvent = JSON.parse(m.data);
            console.log(event);

            switch (event.type) {
                case "USER_FULL":
                    setConversations(event.conversations);
                    setPreferences(event.preferences);
                    break;
                case 'GAME_START':
                    push(`/game/${event.id}`); break;
                case 'PREFERENCES_UPDATE':
                    setPreferences(event.preferences); break;
            }
        }
    }, [])

    return null;
}
