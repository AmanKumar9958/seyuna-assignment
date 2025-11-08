import useSectionObserver from '../../hooks/useSectionObserver.js'

export default function Introduction() {
  useSectionObserver(['guides', 'resources'])

  return (
    <div className="px-6 py-8 sm:py-12">
      <h1 className="text-3xl font-semibold text-zinc-100">API Documentation</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Use the Protocol API to access contacts, conversations, group messages, and more and seamlessly
        integrate your product into the workflows of dozens of devoted Protocol users.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2.5 text-sm font-medium text-emerald-950 shadow hover:bg-emerald-400">
          Quickstart
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M13 5a1 1 0 0 0-1 1v4H6a1 1 0 0 0 0 2h6v4a1 1 0 0 0 1.7.7l6-6a1 1 0 0 0 0-1.4l-6-6A1 1 0 0 0 13 5Z" />
          </svg>
        </button>
        <button className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/5">
          Explore SDKs
        </button>
      </div>

      <section className="mt-12 rounded-xl border border-white/10 bg-zinc-900/40 p-6">
        <h2 className="text-lg font-semibold text-zinc-100">Getting started</h2>
        <p className="mt-2 max-w-3xl text-zinc-400">
          To get started, create a new application in your{' '}
          <a className="text-emerald-400 hover:underline" href="#">developer settings</a>, then read about how to make
          requests for the resources you need to access using our HTTP APIs or dedicated client SDKs. When your
          integration is ready to go live, publish it to our{' '}
          <a className="text-emerald-400 hover:underline" href="#">integrations directory</a> to reach the Protocol
          community.
        </p>
        <a className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-400 hover:underline" href="#">
          Get your API key
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
            <path d="M13 5a1 1 0 0 0-1 1v4H6a1 1 0 0 0 0 2h6v4a1 1 0 0 0 1.7.7l6-6a1 1 0 0 0 0-1.4l-6-6A1 1 0 0 0 13 5Z" />
          </svg>
        </a>
      </section>

      <section id="guides" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">Guides</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ArticleCard title="Authentication">Learn how to authenticate your API requests securely and manage tokens.</ArticleCard>
          <ArticleCard title="Pagination">Understand how to work with large data sets efficiently using pagination.</ArticleCard>
          <ArticleCard title="Errors">Read about the different types of errors and how to handle them gracefully.</ArticleCard>
          <ArticleCard title="Webhooks">Learn to programmatically subscribe to events and receive real-time updates.</ArticleCard>
        </div>
      </section>

      <section id="resources" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">Resources</h2>
        <div className="mt-4 grid gap-6 lg:grid-cols-4">
          <ResourceCard title="Contacts">Learn about the contact model and how to create, retrieve, update, delete, and list contacts.</ResourceCard>
          <ResourceCard title="Conversations">Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.</ResourceCard>
          <ResourceCard title="Messages">Learn about the message model and how to create, retrieve, update, delete, and list messages.</ResourceCard>
          <ResourceCard title="Groups">Learn about the group model and how to create, retrieve, update, delete, and list groups.</ResourceCard>
        </div>
      </section>
    </div>
  )
}

function ArticleCard({ title, children }) {
    return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 hover:border-white/20">
      <h3 className="mb-2 font-medium text-zinc-100">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{children}</p>
      <a className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-400" href="#">
        Read more
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
          <path d="M13 5a1 1 0 0 0-1 1v4H6a1 1 0 0 0 0 2h6v4a1 1 0 0 0 1.7.7l6-6a1 1 0 0 0 0-1.4l-6-6A1 1 0 0 0 13 5Z" />
        </svg>
      </a>
    </div>
  )
}

function ResourceCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-900/20 p-6">
      <h3 className="mb-2 font-medium text-zinc-100">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{children}</p>
    </div>
  )
}