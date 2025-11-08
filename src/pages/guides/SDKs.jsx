export default function SDKs() {
  return (
    <div className="px-6 py-8 sm:py-12">
      <h1 className="text-3xl font-semibold text-zinc-100">SDKs</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Explore official and community SDKs to integrate with the Protocol API using your favorite language.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['JavaScript','Python','PHP','Ruby','Go','Java'].map((sdk) => (
          <div key={sdk} className="rounded-xl border border-white/10 bg-zinc-900/40 p-5">
            <h3 className="font-medium text-zinc-100">{sdk}</h3>
            <p className="mt-1 text-sm text-zinc-400">Official client with full typed API.</p>
            <a href="#" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-400">
              View docs
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13 5a1 1 0 0 0-1 1v4H6a1 1 0 0 0 0 2h6v4a1 1 0 0 0 1.7.7l6-6a1 1 0 0 0 0-1.4l-6-6A1 1 0 0 0 13 5Z" /></svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
