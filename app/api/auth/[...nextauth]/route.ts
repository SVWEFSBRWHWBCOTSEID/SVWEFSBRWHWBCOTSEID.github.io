import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {getUser} from '../../../../util/users';
import type {User} from '../../../../contexts/ProfileContext';


declare module 'next-auth' {
    interface Session {
        data: User
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                username: {label: 'Username', type: 'text'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials) {
                if (!credentials) return null;

                const user = await getUser(credentials.username);
                if (!user) return null;

                return {id: user.username, name: user.username};
            }
        })
    ],
    pages: {
        //signIn: '/login',
        //error: '/login'
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async session({session}) {
            // TODO: better?
            session.data = (await getUser(session.user?.name!))!;
            return session
        }
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
