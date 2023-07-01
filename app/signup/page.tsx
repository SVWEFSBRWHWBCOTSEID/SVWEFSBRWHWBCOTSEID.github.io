import {Metadata} from 'next';
import SignupPanel from './SignupPanel';


export const metadata: Metadata = {
    title: 'Register'
}

export default function Login() {
    return (
        <div className="flex-grow flex items-center justify-center pb-20">
            <SignupPanel />
        </div>
    )
}
