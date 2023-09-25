'use client'

import {useState} from 'react';
import InfoPanel from '../../components/InfoPanel';
import PreferencesInputGroup from './PreferencesInputGroup';
import PreferencesButton from './PreferencesButton';


export default function GameBehaviorPanel() {
    const [confirmResign, setConfirmResign] = useState(true);

    return (
        <InfoPanel>
            <h1 className="text-4xl mb-6 text-theme-orange">Game behavior</h1>
            <p>[...]</p>

            <PreferencesInputGroup label="Confirm resignation and draw offers">
                <PreferencesButton onClick={() => setConfirmResign(true)} selected={confirmResign}>
                    Always
                </PreferencesButton>
                <PreferencesButton onClick={() => setConfirmResign(false)} selected={!confirmResign}>
                    Never
                </PreferencesButton>
            </PreferencesInputGroup>
        </InfoPanel>
    )
}
