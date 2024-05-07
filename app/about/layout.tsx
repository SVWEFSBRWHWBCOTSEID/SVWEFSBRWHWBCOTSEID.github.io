import type { ReactNode } from 'react';

// Components
import InfoSidebarItem from '@/components/InfoSidebarItem';
import InfoSidebar from '@/components/InfoSidebar';
import InfoPanel from '@/components/InfoPanel';


export default function Layout(props: { children: ReactNode }) {
    return (
        <div className="container flex pt-4 pb-12">
            <InfoSidebar>
                <InfoSidebarItem href="/about">About</InfoSidebarItem>
                <InfoSidebarItem href="/about/source">Source code</InfoSidebarItem>
            </InfoSidebar>
            <InfoPanel>
                {props.children}
            </InfoPanel>
        </div>
    )
}
