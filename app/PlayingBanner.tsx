'use client'

import { useContext } from 'react';
import UserContext from '@/contexts/UserContext';

// Icons
import { FaArrowRight } from 'react-icons/fa6';


export default function PlayingBanner() {
    const { user } = useContext(UserContext);
    if (!user?.playing) return null;

    return (
        <div className="sticky top-0 bg-theme-green/30 backdrop-blur-sm z-20 py-1.5 px-6 text-sm mb-4 text-primary transition duration-100 hover:text-white flex items-center justify-between">
            Currently playing {user.playing}
            <FaArrowRight />
        </div>
    )
}
