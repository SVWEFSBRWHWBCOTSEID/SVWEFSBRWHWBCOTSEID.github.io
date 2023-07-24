'use server'

import type {User} from '../contexts/ProfileContext';


export async function getUser(username: string): Promise<User | null> {
    const res = await fetch(`${process.env.API_BASE}/user/${username}`, {next: {tags: [`user-${username}`]}});
    return res.json();
}
