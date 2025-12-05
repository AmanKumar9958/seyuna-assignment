import PageContainer from '../../components/PageContainer'

export default function Errors(): JSX.Element {
  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold text-zinc-100">Errors</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Understand common error responses and how to handle them gracefully in your integration.
      </p>
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-5">
          <h2 className="text-lg font-semibold text-zinc-100">HTTP status codes</h2>
          <p className="mt-2 text-sm text-zinc-400">We use standard HTTP status codes to indicate success or failure.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-zinc-900/40 p-5">
          <h2 className="text-lg font-semibold text-zinc-100">Error payload</h2>
          <p className="mt-2 text-sm text-zinc-400">Errors include a code, message, and optional details to help debugging.</p>
        </div>
      </section>
    </PageContainer>
  )
}
