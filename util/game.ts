import {startTransition} from 'react';
import {revalidate} from './actions';
import type {GameKey} from '../contexts/ProfileContext';
import type {GameFullEvent, TimeControl} from '../app/game/[id]/page';


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

type CreateChallengeBody = Omit<CreateGameBody, 'ratingMin' | 'ratingMax'> & {
    gameKey: GameKey
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
        ratingMin: Math.round(rating + ratingOffsetMin),
        ratingMax: Math.round(rating + ratingOffsetMax)
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

export async function createChallenge(
    opponent: string,
    game: GameKey,
    minutes: number,
    increment: number,
    rated: boolean = true,
    timed: boolean = true,
    side: Side = 'RANDOM'
) {
    const body: CreateChallengeBody = {
        gameKey: game,
        rated,
        time: timed ? minutes * 60 * 1000 : undefined,
        increment: timed ? increment * 1000 : undefined,
        side
    }

    const res: CreateGameResponse = await (await fetch(`${process.env.API_BASE}/challenge/${opponent}/true`, {
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

export function timeControlToString(times: TimeControl) {
    const minutes = times.initial / 60000;
    const increment = times.increment / 1000;

    return `${minutes}+${increment}`;
}
