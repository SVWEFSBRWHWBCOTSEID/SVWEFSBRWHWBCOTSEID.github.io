'use client'

import { ReactNode, useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import CurrentTimeContext from '@/contexts/CurrentTimeContext';


export default function CurrentTimeProvider(props: { children: ReactNode }) {
    const [time, setTime] = useState(DateTime.now());

    useEffect(() => {
        const timerID = setInterval(() => setTime(DateTime.now()), 100);
        return () => clearInterval(timerID);
    }, []);

    return (
        <CurrentTimeContext.Provider value={time}>
            {props.children}
        </CurrentTimeContext.Provider>
    )
}
