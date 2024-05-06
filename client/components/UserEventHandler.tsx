'use client'

import { ReactElement, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Components
import MessageNotification from './MessageNotification';

// Contexts
import UserContext from '../contexts/UserContext';
import PreferencesContext, { Preferences } from '../contexts/PreferencesContext';
import ConversationContext from '../contexts/ConversationContext';
import ChallengesContext, { Challenge } from '../contexts/ChallengesContext';

// Types
import type { GameKey } from '../contexts/ProfileContext';
import type { Conversation } from '../app/inbox/InboxSidebarItem';
import type { Message } from '../app/inbox/InboxMessage';


type UserFullEvent = {
    type: 'USER_FULL',
    conversations: Conversation[],
    challenges: Challenge[],
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

type ChallengeEvent = {
    type: 'CHALLENGE',
    challenge: Challenge
}

type UserEvent = UserFullEvent | GameStartEvent | PreferencesUpdateEvent | UserMessageEvent | ChallengeEvent;

export default function UserEventHandler() {
    const router = useRouter();

    const { user } = useContext(UserContext);
    const { setLocalPreferences } = useContext(PreferencesContext);
    const { setConversations } = useContext(ConversationContext);
    const { setChallenges } = useContext(ChallengesContext);

    // Notifications
    const [notifications, setNotifications] = useState<ReactElement[]>([]);

    function pushNotification(e: ReactElement) {
        setNotifications((notifications) => [...notifications, e]);
        setTimeout(() => setNotifications((notifications) => {
            notifications.shift();
            return [...notifications];
        }), 5000);
    }

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/events`, { withCredentials: true });
        eventSource.onmessage = (m) => {
            const event: UserEvent = JSON.parse(m.data);
            console.log(event);

            switch (event.type) {
                case 'USER_FULL':
                    setConversations(event.conversations);
                    setChallenges(event.challenges);
                    setLocalPreferences(event.preferences);
                    break;
                case 'GAME_START':
                    router.push(`/game/${event.id}`);
                    break;
                case 'PREFERENCES_UPDATE':
                    setLocalPreferences(event.preferences);
                    break;
                case 'USER_MESSAGE':
                    // Update the conversation corresponding to the given message
                    setConversations((conversations) => {
                        const otherName = event.username === user!.username ? event.otherName : event.username;

                        // TODO: cleaner?
                        let conversation = conversations.find(c => c.otherName === otherName);
                        if (!conversation) {
                            conversation = { otherName, messages: [] };
                            conversations.push(conversation);
                        }

                        conversation.messages = [...conversation.messages, event];
                        return [...conversations];
                    });

                    if (event.username !== user!.username)
                        pushNotification(<MessageNotification {...event} />)
                    break;
                case 'CHALLENGE':
                    setChallenges((challenges) => challenges.concat(event.challenge));
                    pushNotification(<p>bruv</p>)
                    break;
            }
        }

        return () => eventSource.close();
    }, [])

    return (
        <div className="fixed right-0 bottom-0 flex flex-col p-2 gap-2">
            {notifications}
        </div>
    );
}
