import {createContext} from 'react';
import {DateTime} from 'luxon';
import type {GameInfo} from '../app/game/[id]/page';


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
    games: GameInfo[]
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

export type Country = 'EMPTY' | 'US' | 'UK' | 'MN'

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

const ProfileContext = createContext<User>(defaultUser);
export default ProfileContext;
