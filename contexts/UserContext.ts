import {createContext} from 'react';
import {User} from './ProfileContext';


type UserContext = { user: User | null, setUser: (user: User | null) => void };
const UserContext = createContext<UserContext>({user: null, setUser: () => {}});
export default UserContext;
