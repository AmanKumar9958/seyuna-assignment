import { PrimaryButton, GhostButton } from './Buttons.jsx'
import Card from './Card.jsx'

export default function MainContent() {
  return (
    <main className="flex-1 bg-[#18181B]">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <p className="text-3xl font-semibold text-zinc-100">API Documentation</p>
        <p className="mt-3 max-w-3xl text-zinc-400">
          Use the Protocol API to access contacts, conversations, group messages, and more and seamlessly
          integrate your product into the workflows of dozens of devoted Protocol users.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <PrimaryButton>Quickstart</PrimaryButton>
          <GhostButton>Explore SDKs</GhostButton>
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

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-100">Guides</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Authentication">Learn how to authenticate your API requests securely and manage tokens.</Card>
            <Card title="Pagination">Understand how to work with large data sets efficiently using pagination.</Card>
            <Card title="Errors">Read about the different types of errors and how to handle them gracefully.</Card>
            <Card title="Webhooks">Learn to programmatically subscribe to events and receive real-time updates.</Card>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-semibold text-zinc-100">Resources</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card title="Contacts">Learn how to authenticate your API requests securely and manage tokens.</Card>
            <Card title="Conversations">Understand how to work with large data sets efficiently using pagination.</Card>
            <Card title="Messages">Read about the different types of errors and how to handle them gracefully.</Card>
            <Card title="Groups">Learn to programmatically subscribe to events and receive real-time updates.</Card>
          </div>
        </section>
      </div>
    </main>
  )
}
