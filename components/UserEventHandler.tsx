'use client'

import {useContext, useEffect} from 'react';
import {useRouter} from 'next/navigation';

// Contexts
import UserContext from '../contexts/UserContext';
import PreferencesContext, {Preferences} from '../contexts/PreferencesContext';
import ConversationContext from '../contexts/ConversationContext';

// Types
import type {GameKey} from '../contexts/ProfileContext';
import type {Conversation} from '../app/inbox/InboxSidebarItem';
import type {Message} from '../app/inbox/InboxMessage';


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

type UserMessageEvent = Message & {
    type: 'USER_MESSAGE',
    otherName: string
}

type UserEvent = UserFullEvent | GameStartEvent | PreferencesUpdateEvent | UserMessageEvent;

export default function UserEventHandler() {
    const {push} = useRouter();

    const {user} = useContext(UserContext);
    const {setPreferences} = useContext(PreferencesContext);
    const {setConversations} = useContext(ConversationContext);

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/events`, {withCredentials: true});
        eventSource.onmessage = (m) => {
            const event: UserEvent = JSON.parse(m.data);
            console.log(event);

            switch (event.type) {
                case 'USER_FULL':
                    setConversations(event.conversations);
                    setPreferences(event.preferences);
                    break;
                case 'GAME_START':
                    push(`/game/${event.id}`); break;
                case 'PREFERENCES_UPDATE':
                    setPreferences(event.preferences); break;
                case 'USER_MESSAGE':
                    // Update the conversation corresponding to the given message
                    setConversations((conversations) => {
                        const otherName = event.username === user!.username ? event.otherName : event.username;

                        // TODO: cleaner?
                        let conversation = conversations.find(c => c.otherName === otherName);
                        if (!conversation) {
                            conversation = {otherName, messages: []};
                            conversations.push(conversation);
                        }

                        conversation.messages = [...conversation.messages, event];
                        return [...conversations];
                    });

                    // TODO: push notif
                    break;
            }
        }

        return () => eventSource.close();
    }, [])

    return null;
}
