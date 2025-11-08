export default function Quickstart() {
  return (
    <div className="px-6 py-8 sm:py-12">
      {/* Title + intro */}
      <h1 className="text-3xl font-semibold text-zinc-100">Quickstart</h1>
      <p className="mt-3 max-w-4xl text-zinc-300">
        This guide will get you all set up and ready to use the Protocol API. We'll cover how to get started
        using one of our API clients and how to make your first API request. We'll also look at where to go next
        to find all the information you need to take full advantage of our powerful REST API.
      </p>

      {/* Info callout */}
      <div className="mt-6 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
              <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2Zm0 4.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM10.75 11h2.5a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1-.75-.75v-5a.75.75 0 0 1 .75-.75Z" />
            </svg>
          </span>
          <p className="text-sm leading-6 text-emerald-200">
            Before you can make requests to the Protocol API, you will need to grab your API key from your
            dashboard. You find it under <span className="font-semibold text-emerald-100">Settings » API</span>.
          </p>
        </div>
      </div>

      {/* Choose your client */}
      <section id="choose-your-client" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">Choose your client</h2>
        <p className="mt-2 max-w-4xl text-zinc-300">
          Before making your first API request, you need to pick which API client you will use. In addition to
          good ol' cURL HTTP requests, Protocol offers clients for JavaScript, Python, and PHP. In the following
          example, you can see how to install each client.
        </p>

        {/* Code block with tabs (static UI, cURL active) */}
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30">
          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-white/5 px-4 py-3 text-sm">
            {['cURL', 'JavaScript', 'Python', 'PHP'].map((t, idx) => (
              <span
                key={t}
                className={
                  'cursor-default pb-2 text-zinc-400 ' +
                  (idx === 0 ? 'text-emerald-400 relative after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-emerald-400' : 'hover:text-zinc-300')
                }
              >
                {t}
              </span>
            ))}
          </div>
          {/* Body */}
          <div className="px-4 py-5">
            <pre className="font-mono text-sm leading-6 text-zinc-300">
{`# cURL is most likely already installed on your machine
curl --version`}
            </pre>
          </div>
        </div>

        <a href="#" className="mt-6 inline-flex items-center gap-2 text-emerald-400">
          Check out our list of first-party SDKs
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M13 5a1 1 0 0 0-1 1v4H6a1 1 0 0 0 0 2h6v4a1 1 0 0 0 1.7.7l6-6a1 1 0 0 0 0-1.4l-6-6A1 1 0 0 0 13 5Z" />
          </svg>
        </a>
      </section>

      {/* Making your first API request */}
      <section id="making-your-first-api-request" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">Making your first API request</h2>
        <p className="mt-2 max-w-4xl text-zinc-300">
          After picking your preferred client, you are ready to make your first call to the Protocol API. Below, you
          can see how to send a GET request to the Conversations endpoint to get a list of all your conversations. In
          the cURL example, results are limited to ten conversations, the default page length for each client.
        </p>

        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30">
          {/* Tabs */}
          <div className="flex items-center gap-6 border-b border-white/5 px-4 py-3 text-sm">
            {['cURL', 'JavaScript', 'Python', 'PHP'].map((t, idx) => (
              <span
                key={t}
                className={
                  'cursor-default pb-2 text-zinc-400 ' +
                  (idx === 0 ? 'text-emerald-400 relative after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-emerald-400' : 'hover:text-zinc-300')
                }
              >
                {t}
              </span>
            ))}
          </div>
          {/* Endpoint header */}
          <div className="border-b border-white/5 bg-zinc-900/60 px-4 py-2 font-mono text-sm text-zinc-300">
            <span className="text-emerald-400">GET</span>
            <span className="mx-2 text-zinc-500">·</span>
            <span>/v1/conversations</span>
          </div>
          {/* Body */}
          <div className="px-4 py-5">
            <pre className="font-mono text-sm leading-6 text-zinc-300">
{`curl -G https://api.protocol.chat/v1/conversations \
  -H "Authorization: Bearer {token}" \
  -d limit=10`}
            </pre>
          </div>
        </div>

        <a href="#" className="mt-4 inline-flex items-center gap-2 text-emerald-400">
          Read the docs for the Conversations endpoint
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M13 5a1 1 0 0 0-1 1v4H6a1 1 0 0 0 0 2h6v4a1 1 0 0 0 1.7.7l6-6a1 1 0 0 0 0-1.4l-6-6A1 1 0 0 0 13 5Z" />
          </svg>
        </a>
      </section>
      {/* What's next */}
      <section id="whats-next" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">What's next?</h2>
        <p className="mt-2 max-w-4xl text-zinc-300">
          Great, you're now set up with an API client and have made your first request to the API. Here are a few
          links that might be handy as you venture further into the Protocol API:
        </p>
        <ul className="mt-4 space-y-3 pl-4 text-emerald-400">
          <li className="list-disc"><a href="#" className="hover:underline">Grab your API key from the Protocol dashboard</a></li>
          <li className="list-disc"><a href="#" className="hover:underline">Check out the Conversations endpoint</a></li>
          <li className="list-disc"><a href="#" className="hover:underline">Learn about the different error messages in Protocol</a></li>
        </ul>
      </section>
    </div>
  )
}