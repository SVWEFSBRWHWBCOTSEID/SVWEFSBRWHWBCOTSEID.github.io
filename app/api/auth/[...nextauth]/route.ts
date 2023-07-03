import NextAuth, {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import {getUser} from '../../../../util/users';


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
        signIn: '/login',
        error: '/login'
    },
    session: {
        strategy: "jwt",
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
