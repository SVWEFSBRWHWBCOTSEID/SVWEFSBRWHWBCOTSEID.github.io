'use client'

import {useContext} from 'react';
import {DateTime} from 'luxon';
import ProfileContext, {User} from '../../contexts/ProfileContext';
import {FaLocationDot, FaUser} from 'react-icons/fa6';


export default function ProfileHeader() {
    const {username, profile, createdAt} = useContext(ProfileContext);

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
            <div className="pt-3 flex flex-grow justify-between">
                <div>
                    <h1 className="text-4xl flex gap-3 items-center mb-2">
                        {username}
                        <img src="https://lichess1.org/assets/_zkgwWf/images/flags/US.png" alt="US flag" className="h-6" />
                    </h1>

                    {getName(profile) && (
                        <p className="text-secondary">
                            <FaUser className="inline" /> {getName(profile)}
                        </p>
                    )}
                    {profile.location && (
                        <p className="text-secondary">
                            <FaLocationDot className="inline" /> Your mother's house
                        </p>
                    )}
                </div>

                <div className="pr-6">
                    <p className="text-secondary">
                        <strong>Joined:</strong> {DateTime.fromSQL(createdAt).toLocaleString()}
                    </p>
                    <p className="text-secondary">
                        <strong>Friends:</strong> 0 {/* TODO: followers */}
                    </p>
                </div>
            </div>
        </section>
    )
}

function getName(profile: User['profile']) {
    if (profile.firstName && profile.lastName) return `${profile.firstName} ${profile.lastName}`
    return profile.firstName || profile.lastName;
}
