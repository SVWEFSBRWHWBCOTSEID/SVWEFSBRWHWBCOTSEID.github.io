'use client'

import {signOut} from 'next-auth/react';


// TODO
export default function SignOutButton() {
    return (
        <button onClick={() => signOut()}>
            Sign out
        </button>
    )
}
