'use client'

import { useContext, useEffect, useRef } from 'react';
import { Duration } from 'luxon';
import PreferencesContext from '../../contexts/PreferencesContext';


type GameTimeIndicatorProps = { time: Duration, top?: boolean, playAlert: boolean }
export default function GameTimeIndicator(props: GameTimeIndicatorProps) {
    const emergency = props.time.toMillis() < 21000;

    const { preferences } = useContext(PreferencesContext);
    const played = useRef(false);

    // Play low time alert when first low on time
    useEffect(() => {
        if (!preferences.clock.playCriticalSound || !props.playAlert || !emergency || played.current) return;
        void new Audio('/sound/LowTime.mp3').play();
        played.current = true;
    }, [emergency])

    return (
        <div className={'w-max text-5xl px-5 py-2 select-none ' + (props.top ? 'rounded-t ' : 'rounded-b ') + (emergency ? 'bg-[#502826]' : 'bg-content')}>
            {padNumber(props.time.minutes)}<span className="text-secondary">:</span>{padNumber(props.time.seconds)}

            {(preferences.clock.showTenthSeconds === 'ALWAYS' || (preferences.clock.showTenthSeconds === 'CRITICAL' && emergency)) && (
                // Display tenths-of-seconds when set to always display or when total time < 20s
                <span className="text-4xl">
                    <span className="text-secondary">.</span>{Math.floor(props.time.milliseconds / 100)}
                </span>
            )}
        </div>
    )
}

function padNumber(num: number) {
    if (num < 10) return '0' + num;
    return num.toString();
}
