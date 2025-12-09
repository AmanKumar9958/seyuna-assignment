import Brand from './Brand'
import NavGroup from './NavGroup'

export default function Sidebar(): JSX.Element {
    return (
        <aside className="hidden lg:flex flex-col w-72 fixed inset-y-0 left-0 z-40 border-r border-[#303032] bg-[#18181B]">
            <div className="flex h-16 shrink-0 items-center px-6 border-b border-[#303032]">
                <Brand />
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar px-6 py-8">
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
            </div>
        </aside>
    )
}