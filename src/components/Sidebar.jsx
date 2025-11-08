import NavGroup from './NavGroup.jsx'

export default function Sidebar() {
    return (
        <aside className="hidden lg:block w-72 shrink-0 sticky top-20 max-h-[calc(100dvh-5rem)] overflow-y-auto border-r border-white/5 bg-[#18181B] p-4">
            <NavGroup
                title="Guides"
                items={['Introduction', 'Quickstart', 'SDKs', 'Authentication', 'Pagination', 'Errors', 'Webhooks']}
                subMap={{ Introduction: ['Guides', 'Resources'], Quickstart: ['Choose your client', 'Making your first API request', 'What’s next?'], SDKs: ['Official libraries'] }}
                anchorParent="/introduction"
                anchorMap={{ Guides: 'guides', Resources: 'resources' }}
            />

            <NavGroup
                title="Resources"
                items={['Contacts', 'Conversations', 'Messages', 'Groups', 'Attachments']}
                prefix="resources"
            />
        </aside>
    )
}