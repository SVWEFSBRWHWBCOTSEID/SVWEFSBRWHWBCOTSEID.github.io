'use client'

import {useContext} from 'react';
import ProfileContext from '../../contexts/ProfileContext';


export default function ProfileHeader() {
    const {id} = useContext(ProfileContext);

    return (
        <section className="flex gap-6 px-8 py-6 bg-content-secondary">
            <img src="/pfp.png" className="w-16 h-16 rounded-full object-cover object-center" alt={id} />
            <div className="pt-3">
                <h1 className="text-4xl flex gap-3 items-center mb-3">
                    {id}
                    <img src="https://lichess1.org/assets/_zkgwWf/images/flags/US.png" alt="US flag" className="h-6" />
                </h1>
                <p className="text-secondary"><strong>Joined:</strong> 31 August 1984</p>
                <p className="text-secondary"><strong>Followers:</strong> 69</p>
            </div>
        </section>
    )
}
