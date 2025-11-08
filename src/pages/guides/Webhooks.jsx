export default function Webhooks() {
  return (
    <div className="px-6 py-8 sm:py-12">
      <h1 className="text-3xl font-semibold text-zinc-100">Webhooks</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Subscribe to events and receive real-time updates from the Protocol platform using webhooks.
      </p>
      <section className="mt-8 rounded-xl border border-white/10 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold text-zinc-100">Delivery</h2>
        <p className="mt-2 text-sm text-zinc-400">Events are sent via HTTPS POST with a JSON body describing the change.</p>
      </section>
    </div>
  )
}
