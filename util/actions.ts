'use server'

import { revalidateTag } from 'next/cache';

export async function revalidate(tag: string) {
    console.log(`Revalidated: ${tag}`);
    revalidateTag(tag);
}
