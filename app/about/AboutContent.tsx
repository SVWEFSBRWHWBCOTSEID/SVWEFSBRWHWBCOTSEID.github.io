'use client'

import {Tab} from '@headlessui/react';
import InfoSidebar from './InfoSidebar';
import InfoSidebarItem from './InfoSidebarItem';
import AboutPanel from './AboutPanel';
import SourceCodePanel from './SourceCodePanel';


export default function AboutContent() {
    return (
        <Tab.Group vertical as="div" className="container flex pt-4 pb-12">
            <InfoSidebar>
                <InfoSidebarItem>About</InfoSidebarItem>
                <InfoSidebarItem>Source code</InfoSidebarItem>
            </InfoSidebar>
            <Tab.Panels className="w-full">
                <AboutPanel />
                <SourceCodePanel />
            </Tab.Panels>
        </Tab.Group>
    )
}
