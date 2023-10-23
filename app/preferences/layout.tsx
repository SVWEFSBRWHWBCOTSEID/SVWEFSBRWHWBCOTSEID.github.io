import type {ReactNode} from 'react';
import InfoSidebarItem from '../../components/InfoSidebarItem';
import InfoSidebar from '../../components/InfoSidebar';
import InfoPanel from '../../components/InfoPanel';


export default function Layout(props:{children: ReactNode}) {
    return (
        <div className="container flex pt-4 pb-12 w-full">
            <InfoSidebar>
                <InfoSidebarItem href="/preferences">Clock</InfoSidebarItem>
                <InfoSidebarItem href="/preferences/game-behavior">Game behavior</InfoSidebarItem>
            </InfoSidebar>
            <InfoPanel>
                {props.children}
            </InfoPanel>
        </div>
    )
}
