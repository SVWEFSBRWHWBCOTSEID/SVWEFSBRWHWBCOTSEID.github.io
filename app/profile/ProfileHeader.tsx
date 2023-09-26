'use client'

import {startTransition, useContext, useState} from 'react';
import {Listbox} from '@headlessui/react';
import {DateTime} from 'luxon';
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

// Contexts
import ProfileContext, {Country, User} from '../../contexts/ProfileContext';
import UserContext from '../../contexts/UserContext';


export default function ProfileHeader() {
    const {username, profile, createdAt} = useContext(ProfileContext);
    const {user, setUser} = useContext(UserContext);

    const [editing, setEditing] = useState(false);

    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [location, setLocation] = useState(profile.location);
    const [bio, setBio] = useState(profile.bio);
    const [country, setCountry] = useState(profile.country);

    async function updateProfile() {
        const res = await fetch(`${process.env.API_BASE}/profile/update`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({country, firstName, lastName, location, bio})
        });
        if (!res.ok) return;

        const user: User = await res.json();

        startTransition(() => void revalidate(`user-${username}`));
        setUser(user);
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
            <div className="pt-3 flex flex-grow gap-4 flex-wrap sm:flex-nowrap">
                <div className="w-full flex-grow flex flex-col relative">
                    <h1 className="text-4xl flex gap-3 items-center mb-2">
                        {username}

                        {editing ? (
                            <Listbox as="div" className="relative text-base font-normal" value={country} onChange={setCountry}>
                                <Listbox.Button className="relative text-left w-36 px-3.5 py-1.5 bg-content-tertiary rounded border border-tertiary text-primary">
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
                            {profile.bio && (
                                <div className="bg-content text-secondary border-l-[3px] border-tertiary px-4 py-2 mb-2 -ml-2 rounded-sm whitespace-pre-wrap">
                                    {profile.bio}
                                </div>
                            )}
                            {getName(profile) && (
                                <p className="flex gap-2.5 items-center text-secondary">
                                    <FaUser /> {getName(profile)}
                                </p>
                            )}
                            {profile.location && (
                                <p className="flex gap-2.5 items-center text-secondary mt-0.5">
                                    <FaLocationDot /> {profile.location}
                                </p>
                            )}
                        </>
                    )}

                    {user?.username === username && (
                        <button
                            className="absolute right-0 top-0 text-secondary h-max p-1.5 rounded hover:bg-theme-green hover:text-white transition duration-100"
                            onClick={() => setEditing(!editing)}
                        >
                            <BsGearFill />
                        </button>
                    )}
                </div>

                <div className="flex-none xl:pr-6">
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
    {name: 'Andorra', key: 'AD'},
    {name: 'United Arab Emirates', key: 'AE'},
    {name: 'Afghanistan', key: 'AF'},
    {name: 'Antigua and Barbuda', key: 'AG'},
    {name: 'Anguilla', key: 'AI'},
    {name: 'Albania', key: 'AL'},
    {name: 'Armenia', key: 'AM'},
    {name: 'Netherlands Antilles', key: 'AN'},
    {name: 'Angola', key: 'AO'},
    {name: 'Antarctica', key: 'AQ'},
    {name: 'Argentina', key: 'AR'},
    {name: 'American Samoa', key: 'AS'},
    {name: 'Austria', key: 'AT'},
    {name: 'Australia', key: 'AU'},
    {name: 'Aruba', key: 'AW'},
    {name: 'Aland Islands', key: 'AX'},
    {name: 'Azerbaijan', key: 'AZ'},
    {name: 'Bosnia and Herzegovina', key: 'BA'},
    {name: 'Barbados', key: 'BB'},
    {name: 'Bangladesh', key: 'BD'},
    {name: 'Belgium', key: 'BE'},
    {name: 'Burkina Faso', key: 'BF'},
    {name: 'Bulgaria', key: 'BG'},
    {name: 'Bahrain', key: 'BH'},
    {name: 'Burundi', key: 'BI'},
    {name: 'Benin', key: 'BJ'},
    {name: 'Saint Barthelemy', key: 'BL'},
    {name: 'Bermuda', key: 'BM'},
    {name: 'Brunei', key: 'BN'},
    {name: 'Bolivia', key: 'BO'},
    {name: 'Bonaire', key: 'BQ'},
    {name: 'Brazil', key: 'BR'},
    {name: 'Bahamas', key: 'BS'},
    {name: 'Bhutan', key: 'BT'},
    {name: 'Bouvet Island', key: 'BV'},
    {name: 'Botswana', key: 'BW'},
    {name: 'Belarus', key: 'BY'},
    {name: 'Belize', key: 'BZ'},
    {name: 'Canada', key: 'CA'},
    {name: 'Cocos Islands', key: 'CC'},
    {name: 'Democratic Republic of the Congo', key: 'CD'},
    {name: 'Central African Republic', key: 'CF'},
    {name: 'Republic of the Congo', key: 'CG'},
    {name: 'Switzerland', key: 'CH'},
    {name: 'Cote d\'Ivoire', key: 'CI'},
    {name: 'Cook Islands', key: 'CK'},
    {name: 'Chile', key: 'CL'},
    {name: 'Cameroon', key: 'CM'},
    {name: 'China', key: 'CN'},
    {name: 'Colombia', key: 'CO'},
    {name: 'Costa Rica', key: 'CR'},
    {name: 'Cuba', key: 'CU'},
    {name: 'Cabo Verde', key: 'CV'},
    {name: 'Curacao', key: 'CW'},
    {name: 'Christmas Island', key: 'CX'},
    {name: 'Cyprus', key: 'CY'},
    {name: 'Czechia', key: 'CZ'},
    {name: 'Germany', key: 'DE'},
    {name: 'Djibouti', key: 'DJ'},
    {name: 'Denmark', key: 'DK'},
    {name: 'Dominica', key: 'DM'},
    {name: 'Dominican Republic', key: 'DO'},
    {name: 'Algeria', key: 'DZ'},
    {name: 'United States', key: 'US'},
    {name: 'United Kingdom', key: 'UK'},
    {name: 'Mongolia', key: 'MN'}
]
