'use client'

import {Tab} from '@headlessui/react';
import InfoSidebar from '../../components/InfoSidebar';
import InfoSidebarItem from '../../components/InfoSidebarItem';
import ClockPanel from './ClockPanel';


export default function PreferencesContent() {
    return (
        <Tab.Group vertical as="div" className="container flex pt-4 pb-12">
            <InfoSidebar>
                <InfoSidebarItem>Clock</InfoSidebarItem>
            </InfoSidebar>
            <Tab.Panels className="w-full">
                <ClockPanel />
            </Tab.Panels>
        </Tab.Group>
    )
}
