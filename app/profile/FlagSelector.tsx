'use client'

import { useState } from 'react';
import { Combobox } from '@headlessui/react';
import type { Country } from '../../contexts/ProfileContext';

// Components
import AnimatedCombobox from '../../components/AnimatedCombobox';

// Icons
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';


type FlagSelectorProps = {
    country: Country,
    setCountry: (c: Country) => void
}
export default function FlagSelector(props: FlagSelectorProps) {
    const { country, setCountry } = props;
    const [query, setQuery] = useState('');

    const filtered = flags
        .filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => a.name.localeCompare(b.name))

    return (
        <Combobox as="div" className="relative text-base font-normal" value={country} onChange={setCountry}>
            <div className="relative">
                <img
                    src={`/flags/${country}.png`}
                    alt={`${country} flag`}
                    className="absolute left-2.5 inset-y-0 my-auto max-w-[1.5rem]"
                />
                {/* TODO: display country flag name */}
                <Combobox.Input
                    onChange={(e) => setQuery(e.target.value)}
                    className="text-left w-40 pl-10 pr-3.5 py-1.5 bg-content-tertiary rounded border border-tertiary text-primary"
                />
                <Combobox.Button className="absolute right-2.5 inset-y-0 my-auto text-xl">
                    <MdOutlineKeyboardArrowDown />
                </Combobox.Button>
            </div>

            <AnimatedCombobox className="absolute top-[calc(100%_+_6px)] w-max min-w-[12rem] overflow-y-auto max-h-[28rem] flex flex-col py-1.5 bg-content-tertiary rounded shadow-lg z-10 text-secondary text-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-white/25 scrollbar-thumb:bg-secondary scrollbar:w-1">
                <Combobox.Option
                    className="flex gap-4 items-center cursor-pointer px-4 py-1 hover:!bg-theme-blue hover:text-white ui-open:ui-selected:bg-background"
                    value="EMPTY"
                    key="EMPTY"
                >
                    {/* Empty spacer to align "no flag" row with other flags */}
                    <span className="w-[1.25rem]" />
                    No flag
                </Combobox.Option>

                {filtered.map(({ name, key }) => (
                    // https://github.com/tailwindlabs/headlessui/discussions/2366
                    <Combobox.Option
                        className="flex gap-4 items-center cursor-pointer px-4 py-1 hover:!bg-theme-blue hover:text-white ui-open:ui-selected:bg-background"
                        value={key}
                        key={key}
                    >
                        <img
                            src={`/flags/${key}.png`}
                            alt={`${name} flag`}
                            className="max-w-[1.25rem]"
                        />
                        {name}
                    </Combobox.Option>
                ))}
            </AnimatedCombobox>
        </Combobox>
    )
}

const flags: { name: string, key: Country }[] = [
    { name: 'Andorra', key: 'AD' },
    { name: 'United Arab Emirates', key: 'AE' },
    { name: 'Afghanistan', key: 'AF' },
    { name: 'Antigua and Barbuda', key: 'AG' },
    { name: 'Anguilla', key: 'AI' },
    { name: 'Albania', key: 'AL' },
    { name: 'Armenia', key: 'AM' },
    { name: 'Netherlands Antilles', key: 'AN' },
    { name: 'Angola', key: 'AO' },
    { name: 'Antarctica', key: 'AQ' },
    { name: 'Argentina', key: 'AR' },
    { name: 'American Samoa', key: 'AS' },
    { name: 'Austria', key: 'AT' },
    { name: 'Australia', key: 'AU' },
    { name: 'Aruba', key: 'AW' },
    { name: 'Aland Islands', key: 'AX' },
    { name: 'Azerbaijan', key: 'AZ' },
    { name: 'Bosnia and Herzegovina', key: 'BA' },
    { name: 'Barbados', key: 'BB' },
    { name: 'Bangladesh', key: 'BD' },
    { name: 'Belgium', key: 'BE' },
    { name: 'Burkina Faso', key: 'BF' },
    { name: 'Bulgaria', key: 'BG' },
    { name: 'Bahrain', key: 'BH' },
    { name: 'Burundi', key: 'BI' },
    { name: 'Benin', key: 'BJ' },
    { name: 'Saint Barthelemy', key: 'BL' },
    { name: 'Bermuda', key: 'BM' },
    { name: 'Brunei', key: 'BN' },
    { name: 'Bolivia', key: 'BO' },
    { name: 'Bonaire', key: 'BQ' },
    { name: 'Brazil', key: 'BR' },
    { name: 'Bahamas', key: 'BS' },
    { name: 'Bhutan', key: 'BT' },
    { name: 'Bouvet Island', key: 'BV' },
    { name: 'Botswana', key: 'BW' },
    { name: 'Belarus', key: 'BY' },
    { name: 'Belize', key: 'BZ' },
    { name: 'Canada', key: 'CA' },
    { name: 'Cocos Islands', key: 'CC' },
    { name: 'Democratic Republic of the Congo', key: 'CD' },
    { name: 'Central African Republic', key: 'CF' },
    { name: 'Republic of the Congo', key: 'CG' },
    { name: 'Switzerland', key: 'CH' },
    { name: 'Cote d\'Ivoire', key: 'CI' },
    { name: 'Cook Islands', key: 'CK' },
    { name: 'Chile', key: 'CL' },
    { name: 'Cameroon', key: 'CM' },
    { name: 'China', key: 'CN' },
    { name: 'Colombia', key: 'CO' },
    { name: 'Costa Rica', key: 'CR' },
    { name: 'Cuba', key: 'CU' },
    { name: 'Cabo Verde', key: 'CV' },
    { name: 'Curacao', key: 'CW' },
    { name: 'Christmas Island', key: 'CX' },
    { name: 'Cyprus', key: 'CY' },
    { name: 'Czechia', key: 'CZ' },
    { name: 'Germany', key: 'DE' },
    { name: 'Djibouti', key: 'DJ' },
    { name: 'Denmark', key: 'DK' },
    { name: 'Dominica', key: 'DM' },
    { name: 'Dominican Republic', key: 'DO' },
    { name: 'Algeria', key: 'DZ' },
    { name: 'Ecuador', key: 'EC' },
    { name: 'Estonia', key: 'EE' },
    { name: 'Egypt', key: 'EG' },
    { name: 'Eritrea', key: 'ER' },
    { name: 'Spain', key: 'ES' },
    { name: 'Ethiopia', key: 'ET' },
    { name: 'Finland', key: 'FI' },
    { name: 'Fiji', key: 'FJ' },
    { name: 'Falkland Islands', key: 'FK' },
    { name: 'Micronesia', key: 'FM' },
    { name: 'Faroe Islands', key: 'FO' },
    { name: 'France', key: 'FR' },
    { name: 'Gabon', key: 'GA' },
    { name: 'United Kingdom', key: 'GB' },
    { name: 'Grenada', key: 'GD' },
    { name: 'Georgia', key: 'GE' },
    { name: 'French Guiana', key: 'GF' },
    { name: 'Guernsey', key: 'GG' },
    { name: 'Ghana', key: 'GH' },
    { name: 'Gibraltar', key: 'GI' },
    { name: 'Greenland', key: 'GL' },
    { name: 'The Gambia', key: 'GM' },
    { name: 'Guinea', key: 'GN' },
    { name: 'Equatorial Guinea', key: 'GQ' },
    { name: 'Greece', key: 'GR' },
    { name: 'South Georgia and the South Sandwich Islands', key: 'GS' },
    { name: 'Guatemala', key: 'GT' },
    { name: 'Guam', key: 'GU' },
    { name: 'Guinea-Bissau', key: 'GW' },
    { name: 'Guyana', key: 'GY' },
    { name: 'Hong Kong', key: 'HK' },
    { name: 'Heard and McDonald Islands', key: 'HM' },
    { name: 'Honduras', key: 'HN' },
    { name: 'Croatia', key: 'HR' },
    { name: 'Haiti', key: 'HT' },
    { name: 'Hungary', key: 'HU' },
    { name: 'Canary Islands', key: 'IC' },
    { name: 'Indonesia', key: 'ID' },
    { name: 'Ireland', key: 'IE' },
    { name: 'Israel', key: 'IL' },
    { name: 'Isle of Man', key: 'IM' },
    { name: 'India', key: 'IN' },
    { name: 'British Indian Ocean Territory', key: 'IO' },
    { name: 'Iraq', key: 'IQ' },
    { name: 'Iran', key: 'IR' },
    { name: 'Iceland', key: 'IS' },
    { name: 'Italy', key: 'IT' },
    { name: 'United States', key: 'US' },
    { name: 'Mongolia', key: 'MN' }
]
