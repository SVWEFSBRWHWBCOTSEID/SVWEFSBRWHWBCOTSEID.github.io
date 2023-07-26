'use client'

import {useContext, useState} from 'react';
import {DateTime} from 'luxon';
import ProfileContext, {User} from '../../contexts/ProfileContext';

// Components
import Input from '../../components/Input';
import AutoResizingTextArea from '../../components/AutoResizingTextbox';
import BlueButton from '../../components/BlueButton';

// Icons
import {FaLocationDot, FaUser} from 'react-icons/fa6';
import {BsGearFill} from 'react-icons/bs';
import {ImCheckmark} from 'react-icons/im';


export default function ProfileHeader() {
    const {username, profile, createdAt} = useContext(ProfileContext);

    // TODO: check to see if this is you (ie. if the profile can be edited)
    const [editing, setEditing] = useState(false);

    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [location, setLocation] = useState(profile.location);
    const [bio, setBio] = useState(profile.bio);

    async function updateProfile() {
        // TODO: fetch backend
        // refresh();
        setEditing(false);
    }

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
                <div className="w-16 h-16 rounded-full flex-none bg-background flex items-center justify-center text-secondary/50 text-3xl font-medium">
                    {username[0].toUpperCase()}
                </div>
            )}
            <div className="pt-3 flex flex-grow gap-3">
                <div className="flex-grow flex flex-col">
                    <h1 className="text-4xl flex gap-3 items-center mb-2">
                        {username}
                        <img src="https://lichess1.org/assets/_zkgwWf/images/flags/US.png" alt="US flag" className="h-6" />
                    </h1>

                    {editing ? (
                        <>
                            <p className="flex gap-2 items-center text-secondary mb-1.5">
                                <FaUser className="inline" />
                                <Input
                                    className="flex-grow"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First name"
                                />
                                <Input
                                    className="flex-grow"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last name"
                                />
                            </p>
                            <p className="flex gap-2 items-center text-secondary mb-1.5">
                                <FaLocationDot className="inline" />
                                <Input
                                    className="flex-grow"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location"
                                />
                            </p>
                            <AutoResizingTextArea
                                className="flex-grow ml-6"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                placeholder="Bio (talk about yourself, your interests, games, ...)"
                            />

                            <BlueButton className="mt-4 ml-auto" onClick={updateProfile}>
                                <ImCheckmark className="inline" /> Submit
                            </BlueButton>
                        </>
                    ) : (
                        <>
                            {getName(profile) && (
                                <p className="text-secondary">
                                    <FaUser className="inline" /> {getName(profile)}
                                </p>
                            )}
                            {profile.location && (
                                <p className="text-secondary">
                                    <FaLocationDot className="inline" /> {profile.location}
                                </p>
                            )}
                        </>
                    )}
                </div>

                <button
                    className="text-secondary h-max p-1.5 rounded hover:bg-theme-green hover:text-white transition duration-100"
                    onClick={() => setEditing(!editing)}
                >
                    <BsGearFill />
                </button>

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
