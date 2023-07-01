import {createContext} from 'react';


export type User = {
    username: string,
    perfs: { [P in GameKeys]: GamePerf },
    createdAt: number,
    profile: {
        country: Country,
        location: string,
        bio: string,
        firstName: string,
        lastName: string
    },
    url: string,
    playing?: string,
    // TODO: following stuff
}

type GameKeys = 'ttt' | 'uttt' | 'c4' | 'pc'
export type GamePerf = {
    games: number,
    rating: number,
    rd: number, // rating deviation
    prog: number, // rating progression over last 12 rated games
    prov: boolean // provisional or not
}

type Country = 'US' | 'MN' | 'UK'

// TODO: needed?
const defaultGamePerf: GamePerf = {
    games: 0,
    rating: 1500,
    rd: 110,
    prog: 0,
    prov: true
}
export const defaultUser: User = {
    username: '...',
    perfs: {
        ttt: defaultGamePerf,
        uttt: defaultGamePerf,
        c4: defaultGamePerf,
        pc: defaultGamePerf
    },
    createdAt: 0,
    profile: {
        country: 'US',
        location: '',
        bio: '',
        firstName: '',
        lastName: ''
    },
    url: '...'
}

const ProfileContext = createContext<User>(defaultUser);
export default ProfileContext;
