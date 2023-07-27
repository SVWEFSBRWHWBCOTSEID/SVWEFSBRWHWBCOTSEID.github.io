'use client'

import {useContext, useState} from 'react';
import CloseButton from '../../components/CloseButton';
import {FaRegFlag} from 'react-icons/fa';
import GameContext from '../../contexts/GameContext';


export default function GameControls() {
    const {id} = useContext(GameContext);

    const [confirming, setConfirming] = useState<'' | 'draw' | 'resign'>('');

    async function drawOffer(accept: boolean = true) {
        await fetch(`${process.env.API_BASE}/game/${id}/draw/${accept}`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    async function resign() {
        await fetch(`${process.env.API_BASE}/game/${id}/resign`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    return (
        <div className="px-4 py-1 text-secondary flex justify-center border-b border-tertiary text-2xl">
            <div className={'relative flex items-stretch' + (confirming && confirming !== 'draw' ? ' invisible' : '')}>
                <button
                    className={'px-3.5 py-1.5 ' + (confirming === 'draw' ? 'bg-theme-orange text-white rounded-lg' : 'hover:bg-theme-green hover:text-white')}
                    title="Offer draw"
                    onClick={(e) => confirming ? drawOffer() : setConfirming('draw')}
                >
                    ½
                </button>
                {confirming === 'draw' && (
                    <CloseButton
                        onClick={() => setConfirming('')}
                        className="absolute inset-y-0 my-auto -right-8"
                    />
                )}
            </div>
            <div className={'relative flex items-stretch' + (confirming && confirming !== 'resign' ? ' invisible' : '')}>
                <button
                    className={'px-3.5 py-1.5 ' + (confirming === 'resign' ? 'bg-theme-orange text-white rounded-lg' : 'hover:bg-theme-green hover:text-white')}
                    title="Resign"
                    onClick={(e) => confirming ? resign() : setConfirming('resign')}
                >
                    <FaRegFlag />
                </button>
                {confirming === 'resign' && (
                    <CloseButton
                        onClick={() => setConfirming('')}
                        className="absolute inset-y-0 my-auto -right-8"
                    />
                )}
            </div>
        </div>
    )
}
