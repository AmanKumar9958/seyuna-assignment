import { useState } from 'react'
import useSectionObserver from '../../hooks/useSectionObserver'
import PageContainer from '../../components/PageContainer'

export default function Quickstart(): JSX.Element {
  useSectionObserver(['choose-your-client', 'making-your-first-api-request', 'whats-next'])
  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold text-zinc-100">Quickstart</h1>
      <p className="mt-3 max-w-4xl text-zinc-300">
        This guide will get you all set up and ready to use the Protocol API. We'll cover how to get started
        using one of our API clients and how to make your first API request. We'll also look at where to go next
        to find all the information you need to take full advantage of our powerful REST API.
      </p>

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

      <section id="choose-your-client" className="mt-10 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">Choose your client</h2>
        <p className="mt-2 max-w-4xl text-zinc-300">
          Before making your first API request, you need to pick which API client you will use. In addition to
          good ol' cURL HTTP requests, Protocol offers clients for JavaScript, Python, and PHP. In the following
          example, you can see how to install each client.
        </p>

        <LanguageInstallTabs />

        <a href="#" className="mt-6 inline-flex items-center gap-2 text-emerald-400">
          Check out our list of first-party SDKs
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M13 5a1 1 0 0 0-1 1v4H6a1 1 0 0 0 0 2h6v4a1 1 0 0 0 1.7.7l6-6a1 1 0 0 0 0-1.4l-6-6A1 1 0 0 0 13 5Z" />
          </svg>
        </a>
      </section>

      <section id="making-your-first-api-request" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-semibold text-zinc-100">Making your first API request</h2>
        <p className="mt-2 max-w-4xl text-zinc-300">
          After picking your preferred client, you are ready to make your first call to the Protocol API. Below, you
          can see how to send a GET request to the Conversations endpoint to get a list of all your conversations. In
          the cURL example, results are limited to ten conversations, the default page length for each client.
        </p>

        <LanguageRequestTabs />

        <a href="#" className="mt-4 inline-flex items-center gap-2 text-emerald-400">
          Read the docs for the Conversations endpoint
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M13 5a1 1 0 0 0-1 1v4H6a1 1 0 0 0 0 2h6v4a1 1 0 0 0 1.7.7l6-6a1 1 0 0 0 0-1.4l-6-6A1 1 0 0 0 13 5Z" />
          </svg>
        </a>
      </section>
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
    </PageContainer>
  )
}

const LANGS = ['cURL', 'JavaScript', 'Python', 'PHP']

interface TabsProps {
  value: string;
  onChange: (lang: string) => void;
}

function Tabs({ value, onChange }: TabsProps) {
  return (
    <div role="tablist" aria-label="Language selector" className="flex items-center gap-6 border-b border-white/5 px-4 py-3 text-sm">
      {LANGS.map(lang => {
        const active = value === lang
        return (
          <button
            key={lang}
            role="tab"
            aria-selected={active}
            className={
              'relative pb-2 transition-colors focus:outline-none ' +
              (active
                ? 'text-emerald-400 after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-emerald-400'
                : 'text-zinc-400 hover:text-zinc-300')
            }
            onClick={() => onChange(lang)}
          >
            {lang}
          </button>
        )
      })}
    </div>
  )
}

function LanguageInstallTabs(): JSX.Element {
  const [active, setActive] = useState<string>('cURL')
  const snippets: Record<string, string> = {
    cURL: `# cURL is most likely already installed on your machine\ncurl --version`,
    JavaScript: `# Install the JavaScript SDK\nnpm install protocol-sdk\n# or\nyarn add protocol-sdk\n# or\npnpm add protocol-sdk`,
    Python: `# Install the Python SDK\npip install protocol_sdk`,
    PHP: `# Install the PHP SDK using Composer\ncomposer require protocol/sdk`
  }
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30">
      <Tabs value={active} onChange={setActive} />
      <div className="px-4 py-5 overflow-x-auto">
        <pre className="font-mono text-sm leading-6 text-zinc-300" aria-label={`${active} install instructions`}>
{snippets[active]}
        </pre>
      </div>
    </div>
  )
}

function LanguageRequestTabs(): JSX.Element {
  const [active, setActive] = useState<string>('cURL')
  const snippets: Record<string, string> = {
    cURL: `curl -G https://api.protocol.chat/v1/conversations \\\n+   -H "Authorization: Bearer {token}" \\\n+  -d limit=10`,
    JavaScript: `import { Protocol } from 'protocol-sdk'\nconst client = new Protocol({ apiKey: process.env.PROTOCOL_API_KEY })\nconst conversations = await client.conversations.list({ limit: 10 })\nconsole.log(conversations)`,
    Python: `from protocol_sdk import Protocol\nclient = Protocol(api_key="YOUR_API_KEY")\nfor convo in client.conversations.list(limit=10):\n    print(convo)`,
    PHP: `<?php\nuse Protocol\\Client;\n$client = new Client('YOUR_API_KEY');\n$convos = $client->conversations()->list(['limit' => 10]);\nprint_r($convos);`
  }
  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/30">
      <Tabs value={active} onChange={setActive} />
      <div className="border-b border-white/5 bg-zinc-900/60 px-4 py-2 font-mono text-sm text-zinc-300">
        <span className="text-emerald-400">GET</span>
        <span className="mx-2 text-zinc-500">·</span>
        <span>/v1/conversations</span>
      </div>
      <div className="px-4 py-5 overflow-x-auto">
        <pre className="font-mono text-sm leading-6 text-zinc-300" aria-label={`${active} conversations list request`}>
{snippets[active]}
        </pre>
      </div>
    </div>
  )
}