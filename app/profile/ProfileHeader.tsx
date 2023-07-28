'use client'

import {startTransition, useContext, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Listbox} from '@headlessui/react';
import {DateTime} from 'luxon';
import ProfileContext, {Country, User} from '../../contexts/ProfileContext';
import {revalidate} from '../../util/actions';

// Components
import Input from '../../components/Input';
import AutoResizingTextArea from '../../components/AutoResizingTextbox';
import BlueButton from '../../components/BlueButton';
import AnimatedListbox from '../../components/AnimatedListbox';

// Icons
import {FaLocationDot, FaUser} from 'react-icons/fa6';
import {BsGearFill} from 'react-icons/bs';
import {ImCheckmark} from 'react-icons/im';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';


export default function ProfileHeader() {
    const {username, profile, createdAt} = useContext(ProfileContext);

    // TODO: check to see if this is you (ie. if the profile can be edited)
    const [editing, setEditing] = useState(false);

    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [location, setLocation] = useState(profile.location);
    const [bio, setBio] = useState(profile.bio);
    const [country, setCountry] = useState(profile.country);

    const {refresh} = useRouter();

    async function updateProfile() {
        const res = await fetch(`${process.env.API_BASE}/profile/update`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({country, firstName, lastName, location, bio})
        });
        if (!res.ok) return;

        startTransition(() => void revalidate(`user-${username}`));
        refresh();
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

                        {editing ? (
                            <Listbox as="div" className="relative text-base font-normal" value={country} onChange={setCountry}>
                                <Listbox.Button className="relative text-left w-36 px-3.5 py-1.5 bg-content-tertiary rounded border border-tertiary">
                                    {country}
                                    <MdOutlineKeyboardArrowDown className="absolute right-2.5 inset-y-0 my-auto text-xl" />
                                </Listbox.Button>
                                <AnimatedListbox className="absolute top-[calc(100%_+_6px)] w-48 flex flex-col py-1.5 bg-content-tertiary rounded shadow-lg z-10 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/25">
                                    {flags.map(({name, key}) => (
                                        // https://github.com/tailwindlabs/headlessui/discussions/2366
                                        <Listbox.Option key={key} value={key} className="cursor-pointer px-4 py-1 hover:!bg-blue-500 hover:text-white ui-open:ui-selected:bg-background">
                                            {name}
                                        </Listbox.Option>
                                    ))}
                                </AnimatedListbox>
                            </Listbox>
                        ) : profile.country !== 'EMPTY' && (
                            <img
                                src={`/flags/${profile.country}.png`}
                                alt={`${profile.country} flag`}
                                className="h-6"
                            />
                        )}
                    </h1>

                    {editing ? (
                        <>
                            <p className="flex gap-2 items-center text-secondary mb-1.5">
                                <FaUser className="inline" />
                                <Input
                                    className="flex-grow w-[50%]"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First name"
                                />
                                <Input
                                    className="flex-grow w-[50%]"
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
                                className="flex-grow ml-6 text-secondary"
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

                <div className="xl:pr-6">
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

const flags: {name: string, key: Country}[] = [
    {name: 'No flag', key: 'EMPTY'},
    {name: 'United States', key: 'US'},
    {name: 'United Kingdom', key: 'UK'},
    {name: 'Mongolia', key: 'MN'}
]
