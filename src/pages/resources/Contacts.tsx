import PageContainer from '../../components/PageContainer'

export default function Contacts(): JSX.Element {
  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold text-zinc-100">Contacts</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">Endpoints for managing contacts.</p>
      <section className="mt-8 rounded-xl border border-white/10 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold text-zinc-100">List contacts</h2>
        <div className="mt-3 overflow-x-auto rounded-lg border border-white/10 bg-zinc-900/30">
          <div className="px-4 py-4">
            <pre className="font-mono text-sm leading-6 text-zinc-300">{`GET /v1/contacts`}</pre>
          </div>
        </div>
      </section>
    </PageContainer>
  )
}
