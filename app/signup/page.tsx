import {Metadata} from 'next';
import SignupPanel from './SignupPanel';


export const metadata: Metadata = {
    title: 'Register'
}

export default function Login() {
    // TODO: redirect logged-in users to home instead? Lichess doesn't do this, but maybe we can?
    // Or, using middleware: https://nextjs.org/docs/app/api-reference/components/link#middleware

    return (
        <div className="flex-grow flex items-center justify-center pb-20">
            <SignupPanel />
        </div>
    )
}
