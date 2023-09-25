'use client'

import {Tab} from '@headlessui/react';
import InfoSidebar from '../../components/InfoSidebar';
import InfoSidebarItem from '../../components/InfoSidebarItem';
import ClockPanel from './ClockPanel';
import GameBehaviorPanel from './GameBehaviorPanel';


export default function PreferencesContent() {
    return (
        <Tab.Group vertical as="div" className="container flex pt-4 pb-12">
            <InfoSidebar>
                <InfoSidebarItem>Clock</InfoSidebarItem>
                <InfoSidebarItem>Game behavior</InfoSidebarItem>
            </InfoSidebar>
            <Tab.Panels className="w-full">
                <ClockPanel />
                <GameBehaviorPanel />
            </Tab.Panels>
        </Tab.Group>
    )
}
