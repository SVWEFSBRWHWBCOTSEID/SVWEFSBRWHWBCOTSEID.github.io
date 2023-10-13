'use client'

import {ReactNode, useState} from 'react';
import ChallengesContext, {Challenge} from '../contexts/ChallengesContext';


export default function ChallengesProvider(props: {children: ReactNode}) {
    const [challenges, setChallenges] = useState<Challenge[]>([]);

    return (
        <ChallengesContext.Provider value={{challenges, setChallenges}}>
            {props.children}
        </ChallengesContext.Provider>
    )
}
