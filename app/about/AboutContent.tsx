'use client'

import {Tab} from '@headlessui/react';
import AboutPanel from './AboutPanel';
import InfoSidebar from './InfoSidebar';
import InfoSidebarItem from './InfoSidebarItem';


export default function AboutContent() {
    return (
        <Tab.Group vertical as="div" className="container flex pt-4 pb-12">
            <InfoSidebar>
                <InfoSidebarItem>About</InfoSidebarItem>
            </InfoSidebar>
            <Tab.Panels className="w-full">
                <AboutPanel />
            </Tab.Panels>
        </Tab.Group>
    )
}
