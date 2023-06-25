import {createContext} from 'react';


export type User = {id: string} // TODO: stub

const ProfileContext = createContext<User>({id: '...'}); // TODO: hacky?
export default ProfileContext;
