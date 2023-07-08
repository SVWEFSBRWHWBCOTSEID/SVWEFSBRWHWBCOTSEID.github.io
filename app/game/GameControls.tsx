'use client'

import {useState} from 'react';
import CloseButton from '../../components/CloseButton';
import {FaRegFlag} from 'react-icons/fa';


export default function GameControls(props: {id: string}) {
    const [confirming, setConfirming] = useState<'' | 'draw' | 'resign'>('');

    async function drawOffer(accept: boolean = true) {
        await fetch(`${process.env.API_BASE}/game/${props.id}/draw/${accept}`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    async function resign() {
        await fetch(`${process.env.API_BASE}/game/${props.id}/resign`, {
            method: 'POST',
            credentials: 'include'
        });
    }

    return (
        <div className="px-4 py-1 text-secondary flex justify-center border-b border-tertiary text-2xl">
            <button
                className={'relative px-3.5 py-1.5 ' + (confirming === 'draw' ? 'bg-theme-orange text-white rounded-lg' : confirming ? 'invisible' : 'hover:bg-theme-green hover:text-white')}
                title="Offer draw"
                onClick={(e) => confirming ? drawOffer() : setConfirming('draw')}
            >
                ½
                {confirming === 'draw' && (
                    <CloseButton
                        onClick={() => setConfirming('')}
                        className="absolute inset-y-0 my-auto -right-8"
                    />
                )}
            </button>
            <button
                className={'relative px-3.5 py-1.5 ' + (confirming === 'resign' ? 'bg-theme-orange text-white rounded-lg' : confirming ? 'invisible' : 'hover:bg-theme-green hover:text-white')}
                title="Resign"
                onClick={(e) => confirming ? resign() : setConfirming('resign')}
            >
                <FaRegFlag />
                {confirming === 'resign' && (
                    <CloseButton
                        onClick={() => setConfirming('')}
                        className="absolute inset-y-0 my-auto -right-8"
                    />
                )}
            </button>
        </div>
    )
}
