'use client'

import { useLayoutEffect, useState } from 'react';
import Link from 'next/link';


export default function SignInLink() {
    const [url, setUrl] = useState('');
    useLayoutEffect(() => {
        setUrl(window.location.href)
    }, [])

    return (
        <Link
            href={`/login?callbackUrl=${encodeURIComponent(url)}`}
            className="text-theme-blue uppercase pl-3 pr-8 py-4"
        >
            Sign in
        </Link>
    )
}
