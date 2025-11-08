export default function Authentication() {
  return (
    <div className="px-6 py-8 sm:py-12">
      <h1 className="text-3xl font-semibold text-zinc-100">Authentication</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Learn how to authenticate requests using API keys and recommended security practices.
      </p>
      <section className="mt-8 rounded-xl border border-white/10 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold text-zinc-100">API keys</h2>
        <p className="mt-2 text-zinc-400">Send your key in the Authorization header using the Bearer scheme.</p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-white/10 bg-zinc-900/30">
          <div className="px-4 py-4">
            <pre className="font-mono text-sm leading-6 text-zinc-300">{`Authorization: Bearer {token}`}</pre>
          </div>
        </div>
      </section>
    </div>
  )
}
