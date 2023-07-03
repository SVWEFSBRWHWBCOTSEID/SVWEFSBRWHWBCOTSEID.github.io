import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type {User} from '../../../../contexts/ProfileContext';


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const res = await fetch(`${process.env.API_BASE}/api/login`, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name: credentials.username, password: credentials.password})
                });
                if (!res.ok) return null;

                const user: User = await res.json();
                return {id: user.username, name: user.username};
            }
        })
    ],
    pages: {
        signIn: '/login',
        error: '/login'
    },
    session: {
        strategy: 'jwt',
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
