'use client'

import {ChangeEvent, startTransition, useContext, useState} from 'react';
import Link from 'next/link';
import {Listbox} from '@headlessui/react';
import {DateTime} from 'luxon';
import {revalidate} from '../../util/actions';

// Components
import Input from '../../components/Input';
import AutoResizingTextArea from '../../components/AutoResizingTextbox';
import BlueButton from '../../components/BlueButton';
import AnimatedListbox from '../../components/AnimatedListbox';
import ProfilePicture from '../../components/ProfilePicture';

// Icons
import {FaLocationDot, FaUser} from 'react-icons/fa6';
import {BsGearFill} from 'react-icons/bs';
import {ImCheckmark} from 'react-icons/im';
import {MdOutlineKeyboardArrowDown} from 'react-icons/md';
import {RiSwordFill} from 'react-icons/ri';
import {BiMessageRounded} from 'react-icons/bi';

// Contexts
import ProfileContext, {Country, User} from '../../contexts/ProfileContext';
import UserContext from '../../contexts/UserContext';
import FlagSelector from './FlagSelector';


export default function ProfileHeader() {
    const profileUser = useContext(ProfileContext);
    const {user, setUser} = useContext(UserContext);

    const [editing, setEditing] = useState(false);

    const [firstName, setFirstName] = useState(profileUser.profile.firstName);
    const [lastName, setLastName] = useState(profileUser.profile.lastName);
    const [location, setLocation] = useState(profileUser.profile.location);
    const [bio, setBio] = useState(profileUser.profile.bio);
    const [country, setCountry] = useState(profileUser.profile.country);

    const [imageUrl, setImageUrl] = useState(profileUser.profile.imageUrl);
    const [file, setFile] = useState<File | undefined>(undefined);

    // Handle a user file upload by setting the file to be uploaded in the backend request
    // and displaying the preview image URI.
    function handleFileSubmission(e: ChangeEvent<HTMLInputElement>) {
        setFile(e.target.files?.[0]);

        if (!e.target.files?.[0]) return;
        const fileReader = new FileReader();
        fileReader.addEventListener('load', ev => setImageUrl(ev.target?.result as string | null ?? undefined));
        fileReader.readAsDataURL(e.target.files[0]);
    }

    async function updateProfile() {
        const formData = new FormData();

        formData.append('country', country);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('location', location);
        formData.append('bio', bio);
        if (file) formData.append('pfp', file);

        const res = await fetch(`${process.env.API_BASE}/profile/update`, {
            method: 'POST',
            credentials: 'include',
            body: formData
        });
        if (!res.ok) return;

        const user: User = await res.json();

        startTransition(() => void revalidate(`user-${user.username}`));
        setUser(user);
        setEditing(false);
    }

    return (
        <section className="flex gap-6 px-8 py-6 bg-content-secondary">
            {editing ? (
                <div className="w-20 h-20 group flex-none rounded-full overflow-clip relative hover:ring-4 hover:ring-content/60">
                    {imageUrl ? (
                        // TODO: abstract with <ProfilePicture />?
                        <img
                            src={imageUrl}
                            alt={profileUser.username}
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-background flex items-center justify-center text-4xl text-secondary/50 font-medium">
                            {profileUser.username[0].toUpperCase()}
                        </div>
                    )}
                    <label htmlFor="image" className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 text-xs flex items-center text-center cursor-pointer">
                        Choose an image
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileSubmission}
                    />
                </div>
            ) : (
                <ProfilePicture
                    user={profileUser}
                    className="w-20 h-20 text-4xl"
                />
            )}

            <div className="pt-3 flex flex-grow gap-x-5 gap-y-4 flex-wrap sm:flex-nowrap">
                <div className="w-full flex-grow flex flex-col relative">
                    <h1 className="text-4xl flex gap-3 items-center mb-2">
                        {profileUser.username}

                        {editing ? (
                            <FlagSelector
                                country={country}
                                setCountry={setCountry}
                            />
                        ) : profileUser.profile.country !== 'EMPTY' && (
                            <img
                                src={`/flags/${profileUser.profile.country}.png`}
                                alt={`${profileUser.profile.country} flag`}
                                className="h-6"
                            />
                        )}
                    </h1>

                    {editing ? (
                        <>
                            <p className="flex gap-2 items-center text-secondary mb-1.5">
                                <FaUser className="inline" />
                                <Input
                                    className="flex-grow w-[50%] text-primary"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First name"
                                />
                                <Input
                                    className="flex-grow w-[50%] text-primary"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last name"
                                />
                            </p>
                            <p className="flex gap-2 items-center text-secondary mb-1.5">
                                <FaLocationDot className="inline" />
                                <Input
                                    className="flex-grow text-primary"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="Location"
                                />
                            </p>
                            <AutoResizingTextArea
                                className="flex-grow ml-6 text-primary"
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
                            {profileUser.profile.bio && (
                                <div className="text-sm bg-content text-secondary border-l-[3px] border-tertiary px-4 py-2 mb-2 -ml-2 rounded-sm whitespace-pre-wrap">
                                    {profileUser.profile.bio}
                                </div>
                            )}
                            {getName(profileUser.profile) && (
                                <p className="text-sm flex gap-2.5 items-center text-secondary">
                                    <FaUser /> {getName(profileUser.profile)}
                                </p>
                            )}
                            {profileUser.profile.location && (
                                <p className="text-sm flex gap-2.5 items-center text-secondary mt-0.5">
                                    <FaLocationDot /> {profileUser.profile.location}
                                </p>
                            )}
                        </>
                    )}

                    {user?.username === profileUser.username && (
                        <button
                            className="absolute right-0 top-0 text-secondary h-max p-1.5 rounded hover:bg-theme-green hover:text-white transition duration-100"
                            onClick={() => setEditing(!editing)}
                        >
                            <BsGearFill />
                        </button>
                    )}
                </div>

                <div className="flex-none xl:pr-6 text-sm">
                    <p className="text-secondary">
                        <strong>Joined:</strong> {DateTime.fromSQL(profileUser.createdAt).toLocaleString()}
                    </p>
                    <p className="text-secondary">
                        <strong>Friends:</strong> 0 {/* TODO: followers */}
                    </p>

                    <div className="w-max rounded-sm overflow-clip flex divide-x divide-tertiary border border-tertiary mt-2 text-[#bababa]">
                        <Link href={`/?challenge=${profileUser.username}`} className="flex">
                            <button className="px-2 py-1 bg-gradient-to-b from-[hsl(37,_7%,_22%)] to-[hsl(37,_5%,_19%)] hover:from-[hsl(37,_7%,_25%)] hover:to-[hsl(37,_5%,_22%)]">
                                <RiSwordFill className="text-lg" />
                            </button>
                        </Link>
                        <Link href={`/inbox/${profileUser.username}`} className="flex">
                            <button className="px-2 py-1 bg-gradient-to-b from-[hsl(37,_7%,_22%)] to-[hsl(37,_5%,_19%)] hover:from-[hsl(37,_7%,_25%)] hover:to-[hsl(37,_5%,_22%)]">
                                <BiMessageRounded className="text-lg" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

function getName(profile: User['profile']) {
    if (profile.firstName && profile.lastName) return `${profile.firstName} ${profile.lastName}`
    return profile.firstName || profile.lastName;
}
