'use client'

import {useContext} from 'react';
import InfoPanel from '../../components/InfoPanel';
import PreferencesInputGroup from './PreferencesInputGroup';
import PreferencesButton from './PreferencesButton';
import PreferencesContext from '../../contexts/PreferencesContext';


export default function GameBehaviorPanel() {
    const {preferences, setPreferences} = useContext(PreferencesContext)

    function updateConfirmResign(value: boolean) {
        const newPreferences = structuredClone(preferences);
        newPreferences.game.confirmResign = value;
        setPreferences(newPreferences);
    }

    function updateBoardScroll(value: boolean) {
        const newPreferences = structuredClone(preferences);
        newPreferences.game.boardScroll = value;
        setPreferences(newPreferences);
    }

    return (
        <InfoPanel>
            <h1 className="text-4xl mb-6 text-theme-orange">Game behavior</h1>
            <p>[...]</p>

            <PreferencesInputGroup label="Confirm resignation and draw offers">
                <PreferencesButton onClick={() => updateConfirmResign(true)} selected={preferences.game.confirmResign}>
                    Always
                </PreferencesButton>
                <PreferencesButton onClick={() => updateConfirmResign(false)} selected={!preferences.game.confirmResign}>
                    Never
                </PreferencesButton>
            </PreferencesInputGroup>

            <PreferencesInputGroup label="Scroll on the board to replay moves">
                <PreferencesButton onClick={() => updateBoardScroll(true)} selected={preferences.game.boardScroll}>
                    Enabled
                </PreferencesButton>
                <PreferencesButton onClick={() => updateBoardScroll(false)} selected={!preferences.game.boardScroll}>
                    Disabled
                </PreferencesButton>
            </PreferencesInputGroup>
        </InfoPanel>
    )
}
