import {createContext} from 'react';
import {DateTime} from 'luxon';
import type {ProfileGameInfo} from '../app/profile/ProfileGame';


export type User = {
    username: string,
    perfs: { [P in GameKey]: GamePerf },
    createdAt: string, // SQL datetime
    profile: {
        country: Country,
        location: string,
        bio: string,
        firstName: string,
        lastName: string
    },
    url: string,
    playing?: string,
    games: ProfileGameInfo[]
    // TODO: following stuff
}

export type GameKey = 'ttt' | 'uttt' | 'c4' | 'pc'
export type GamePerf = {
    games: number,
    rating: number,
    rd: number, // rating deviation
    prog: number, // rating progression over last 12 rated games
    prov: boolean // provisional or not
}

export type Country = 'EMPTY'
    | 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AN' | 'AO' | 'AQ' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ'
    | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BV' | 'BW' | 'BY' | 'BZ'
    | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ'
    | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ'
    | 'EC' | 'EE' | 'EG' | 'ER' | 'ES' | 'ET'
    | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR'
    | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GU' | 'GW' | 'GY'
    | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU'
    | 'IC' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT'
    | 'US' | 'MN'

// TODO: needed?
const defaultGamePerf: GamePerf = {
    games: 0,
    rating: 1500,
    rd: 110,
    prog: 0,
    prov: true
}
export const defaultGamePerfs = {
    ttt: defaultGamePerf,
    uttt: defaultGamePerf,
    c4: defaultGamePerf,
    pc: defaultGamePerf
}
export const defaultUser: User = {
    username: '...',
    perfs: defaultGamePerfs,
    createdAt: DateTime.now().toSQLDate()!,
    profile: {
        country: 'US',
        location: '',
        bio: '',
        firstName: '',
        lastName: ''
    },
    url: '...',
    games: []
}

const ProfileContext = createContext(defaultUser);
export default ProfileContext;
