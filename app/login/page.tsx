import type { Metadata } from 'next';
import LoginPanel from './LoginPanel';


export const metadata: Metadata = {
    title: 'Sign in'
}

export default function Login({ searchParams }: { searchParams: { callbackUrl?: string }}) {
    return (
        <div className="flex-grow flex items-center justify-center pb-20">
            <LoginPanel callbackUrl={searchParams.callbackUrl} />
        </div>
    )
}
