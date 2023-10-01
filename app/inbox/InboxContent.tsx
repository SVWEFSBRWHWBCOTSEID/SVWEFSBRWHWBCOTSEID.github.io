'use client'


import InboxSidebarItem from './InboxSidebarItem';
import Input from '../../components/Input';
import InboxMessage from './InboxMessage';


export default function InboxContent(props: {username?: string}) {
    return (
        // TODO: hacky?
        <div className="container flex pt-4 pb-12 max-h-[calc(100%_-_56px)]">
            <aside className="border-r border-content-secondary bg-content-tertiary rounded-l overflow-clip flex-none">
                <div className="flex items-center bg-content-secondary py-1 px-4 h-14">
                    <Input />
                </div>
                <div className="divide-y divide-content-secondary">
                    <InboxSidebarItem />
                    <InboxSidebarItem green />
                    <InboxSidebarItem />
                    <InboxSidebarItem />
                    <InboxSidebarItem />
                </div>
            </aside>
            <div className="bg-content flex-grow rounded-r overflow-clip flex flex-col">
                <div className="flex items-center bg-content-secondary py-3 px-4 text-lg h-14 flex-none">
                    qpwoeirut
                </div>
                <div className="overflow-y-auto scrollbar:w-1 scrollbar-thumb:bg-secondary py-2">
                    <InboxMessage />
                    <InboxMessage />
                    <InboxMessage />
                    <InboxMessage />
                    <InboxMessage />
                    <InboxMessage />
                    <InboxMessage />
                    <InboxMessage />
                    <InboxMessage />
                    <InboxMessage />
                </div>
            </div>
        </div>
    )
}
