'use client'

import {useContext} from 'react';
import {DateTime} from 'luxon';
import ProfileContext from '../../contexts/ProfileContext';


export default function ProfileHeader() {
    const {username, createdAt} = useContext(ProfileContext);

    return (
        <section className="flex gap-6 px-8 py-6 bg-content-secondary">
            {false ? (
                // TODO
                <img
                    src="/pfp.png"
                    className="w-16 h-16 rounded-full object-cover object-center"
                    alt={username}
                />
            ) : (
                <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center text-secondary/50 text-3xl font-medium">
                    {username[0].toUpperCase()}
                </div>
            )}
            <div className="pt-3">
                <h1 className="text-4xl flex gap-3 items-center mb-3">
                    {username}
                    <img src="https://lichess1.org/assets/_zkgwWf/images/flags/US.png" alt="US flag" className="h-6" />
                </h1>
                <p className="text-secondary"><strong>Joined:</strong> {DateTime.fromSQL(createdAt).toLocaleString()}</p>
                <p className="text-secondary"><strong>Friends:</strong> 0</p>{/* TODO: followers */}
            </div>
        </section>
    )
}
