export default function Quickstart() {
  return (
    <div className="px-6 py-8 sm:py-12">
      <h1 className="text-3xl font-semibold text-zinc-100">Quickstart</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Get up and running fast. Create an application, obtain an API key, and make your first request.
      </p>

      <section id="choose-your-client" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">Choose your client</h2>
        <p className="mt-2 max-w-3xl text-zinc-400">
          Pick an official SDK or use raw HTTP. We recommend starting with the SDK for your language.
        </p>
        <div className="mt-4 rounded-xl border border-white/10 bg-zinc-900/40 p-4 text-sm text-zinc-300">
          npm i @protocol/sdk
        </div>
      </section>

      <section id="making-your-first-api-request" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">Making your first API request</h2>
        <p className="mt-2 max-w-3xl text-zinc-400">
          Authenticate with your API key and call the Contacts list endpoint to verify everything works.
        </p>
        <div className="mt-4 rounded-xl border border-white/10 bg-zinc-900/40 p-4">
          <pre className="text-sm text-zinc-300">{`curl -H "Authorization: Bearer $API_KEY" https://api.example.com/v1/contacts`}</pre>
        </div>
      </section>

      <section id="whats-next" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">What’s next?</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6 text-zinc-400">
          <li>Read the Authentication guide</li>
          <li>Explore the SDKs</li>
          <li>Subscribe to Webhooks</li>
        </ul>
      </section>
    </div>
  )
}