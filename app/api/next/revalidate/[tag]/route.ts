import {revalidateTag} from 'next/cache';
import {NextResponse} from 'next/server';


export async function GET(request: Request, {params}: {params: {tag: string}}) {
    revalidateTag(params.tag);
    console.log(`Revalidated: ${params.tag}`);
    return NextResponse.json({ok: true});
}
