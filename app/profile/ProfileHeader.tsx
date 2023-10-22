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
                            <Listbox as="div" className="relative text-base font-normal" value={country} onChange={setCountry}>
                                <Listbox.Button className="relative text-left w-36 px-3.5 py-1.5 bg-content-tertiary rounded border border-tertiary text-primary">
                                    {country}
                                    <MdOutlineKeyboardArrowDown className="absolute right-2.5 inset-y-0 my-auto text-xl" />
                                </Listbox.Button>
                                <AnimatedListbox className="absolute top-[calc(100%_+_6px)] w-max min-w-[12rem] overflow-y-auto max-h-[28rem] flex flex-col py-1.5 bg-content-tertiary rounded shadow-lg z-10 text-secondary text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-white/25 scrollbar-thumb:bg-secondary scrollbar:w-1">
                                    <Listbox.Option key="EMPTY" value="EMPTY" className="flex gap-4 items-center cursor-pointer px-4 py-1 hover:!bg-blue-500 hover:text-white ui-open:ui-selected:bg-background">
                                        {/* Empty spacer to align "no flag" row with other flags */}
                                        <span className="w-[1.25rem]" />
                                        No flag
                                    </Listbox.Option>

                                    {flags.sort((a, b) => a.name.localeCompare(b.name)).map(({name, key}) => (
                                        // https://github.com/tailwindlabs/headlessui/discussions/2366
                                        <Listbox.Option key={key} value={key} className="flex gap-4 items-center cursor-pointer px-4 py-1 hover:!bg-blue-500 hover:text-white ui-open:ui-selected:bg-background">
                                            <img src={`/flags/${key}.png`} alt={`${name} flag`} className="max-w-[1.25rem]"/>
                                            {name}
                                        </Listbox.Option>
                                    ))}
                                </AnimatedListbox>
                            </Listbox>
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

const flags: {name: string, key: Country}[] = [
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
    {name: 'Ecuador', key: 'EC'},
    {name: 'Estonia', key: 'EE'},
    {name: 'Egypt', key: 'EG'},
    {name: 'Eritrea', key: 'ER'},
    {name: 'Spain', key: 'ES'},
    {name: 'Ethiopia', key: 'ET'},
    {name: 'Finland', key: 'FI'},
    {name: 'Fiji', key: 'FJ'},
    {name: 'Falkland Islands', key: 'FK'},
    {name: 'Micronesia', key: 'FM'},
    {name: 'Faroe Islands', key: 'FO'},
    {name: 'France', key: 'FR'},
    {name: 'Gabon', key: 'GA'},
    {name: 'United Kingdom', key: 'GB'},
    {name: 'Grenada', key: 'GD'},
    {name: 'Georgia', key: 'GE'},
    {name: 'French Guiana', key: 'GF'},
    {name: 'Guernsey', key: 'GG'},
    {name: 'Ghana', key: 'GH'},
    {name: 'Gibraltar', key: 'GI'},
    {name: 'Greenland', key: 'GL'},
    {name: 'The Gambia', key: 'GM'},
    {name: 'Guinea', key: 'GN'},
    {name: 'Equatorial Guinea', key: 'GQ'},
    {name: 'Greece', key: 'GR'},
    {name: 'South Georgia and the South Sandwich Islands', key: 'GS'},
    {name: 'Guatemala', key: 'GT'},
    {name: 'Guam', key: 'GU'},
    {name: 'Guinea-Bissau', key: 'GW'},
    {name: 'Guyana', key: 'GY'},
    {name: 'Hong Kong', key: 'HK'},
    {name: 'Heard and McDonald Islands', key: 'HM'},
    {name: 'Honduras', key: 'HN'},
    {name: 'Croatia', key: 'HR'},
    {name: 'Haiti', key: 'HT'},
    {name: 'Hungary', key: 'HU'},
    {name: 'Canary Islands', key: 'IC'},
    {name: 'Indonesia', key: 'ID'},
    {name: 'Ireland', key: 'IE'},
    {name: 'Israel', key: 'IL'},
    {name: 'Isle of Man', key: 'IM'},
    {name: 'India', key: 'IN'},
    {name: 'British Indian Ocean Territory', key: 'IO'},
    {name: 'Iraq', key: 'IQ'},
    {name: 'Iran', key: 'IR'},
    {name: 'Iceland', key: 'IS'},
    {name: 'Italy', key: 'IT'},
    {name: 'United States', key: 'US'},
    {name: 'Mongolia', key: 'MN'}
]
