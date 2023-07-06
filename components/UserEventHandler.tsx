'use client'

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import type {GameKey} from '../contexts/ProfileContext';


type GameStartEvent = {
    type: 'gameStart',
    game: GameKey,
    id: string,
}

type UserEvent = GameStartEvent;

export default function UserEventHandler() {
    const {push} = useRouter();

    useEffect(() => {
        const eventSource = new EventSource(`${process.env.API_BASE}/events`, {withCredentials: true});
        eventSource.onmessage = (m) => {
            const message: UserEvent = JSON.parse(m.data);

            switch (message.type) {
                case 'gameStart': push(`/${message.game}/${message.id}`)
            }
        }
    }, [])

    return null;
}
