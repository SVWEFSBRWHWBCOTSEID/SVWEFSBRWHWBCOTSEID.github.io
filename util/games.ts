import type {GameKey} from '../contexts/ProfileContext';


type Side = 'RANDOM' | 'FIRST' | 'SECOND';

type CreateGameBody = {
    rated: boolean,
    time?: number, // ms
    increment?: number, // ms
    // days: number,
    side: Side,
    ratingMin: number,
    ratingMax: number,
    username: string
}

export async function createGame(
    username: string,
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
        ratingMax: rating + ratingOffsetMax,
        username
    }

    const res = await fetch(`${process.env.API_BASE}/api/${game}/game/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    });

    return res.json();
}
