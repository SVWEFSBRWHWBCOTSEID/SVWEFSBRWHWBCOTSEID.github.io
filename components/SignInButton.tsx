'use client'

import {signIn} from 'next-auth/react';


export default function SignInButton() {
    return (
        <button className="text-blue-500 uppercase px-2" onClick={() => signIn()}>
            Sign in
        </button>
    )
}
