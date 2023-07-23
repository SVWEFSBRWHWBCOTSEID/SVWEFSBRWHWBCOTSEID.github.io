import {startTransition} from 'react';
import {revalidate} from './actions';
import type {GameKey} from '../contexts/ProfileContext';
import type {GameFullEvent, GameInfo} from '../app/game/[id]/page';


export type Side = 'RANDOM' | 'FIRST' | 'SECOND';

type CreateGameBody = {
    rated: boolean,
    time?: number, // ms
    increment?: number, // ms
    // days: number,
    side: Side,
    ratingMin: number,
    ratingMax: number
}

type CreateGameResponse = Omit<GameFullEvent, 'type' | 'chat'> & {id: string} // TODO: remove cross-type reliance?

export async function createGame(
    game: GameKey,
    rating: number,
    minutes: number,
    increment: number,
    rated: boolean = true,
    timed: boolean = true, // TODO: better way of passing this?
    side: Side = 'RANDOM',
    ratingOffsetMin: number = -500,
    ratingOffsetMax: number = 500
) {
    const body: CreateGameBody = {
        rated,
        time: timed ? minutes * 60 * 1000 : undefined,
        increment: timed ? increment * 1000 : undefined,
        side,
        ratingMin: rating + ratingOffsetMin,
        ratingMax: rating + ratingOffsetMax
    }

    const res: CreateGameResponse = await (await fetch(`${process.env.API_BASE}/game/new/${game}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify(body)
    })).json();

    // Revalidate cached game object
    // TODO: proper?
    startTransition(() => void revalidate(`game-${res.id}`));

    return res;
}

export function timeControlToString(times: GameInfo['timeControl']) {
    const minutes = times.initial / 60000;
    const increment = times.initial / 1000;

    return `${minutes}+${increment}`;
}
