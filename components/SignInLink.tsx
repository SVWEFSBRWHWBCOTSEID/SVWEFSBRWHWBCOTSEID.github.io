'use client'

import Link from 'next/link';


export default function SignInLink() {
    return (
        <Link
            href={`/login?callbackUrl=${encodeURIComponent(window?.location.href)}`}
            className="text-blue-500 uppercase px-3 py-4"
        >
            Sign in
        </Link>
    )
}
