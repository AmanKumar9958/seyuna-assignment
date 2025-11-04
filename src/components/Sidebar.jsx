import NavGroup from './NavGroup.jsx'

export default function Sidebar() {
    return (
        <aside className="hidden w-72 shrink-0 border-r border-white/5 bg-[#18181B] p-6 lg:block">
            <NavGroup
                title="Guides"
                items={[
                'Introduction',
                'Guides',
                'Resources',
                'Quickstart',
                'SDKs',
                'Authentication',
                'Pagination',
                'Errors',
                'Webhooks',
                ]}
                active="Introduction"
            />

            <NavGroup
                title="Resources"
                items={['Contacts', 'Conversations', 'Messages', 'Groups', 'Attachments']}
                active=""
            />
        </aside>
    )
}
