import PageContainer from '../../components/PageContainer'

export default function Pagination(): JSX.Element {
  return (
    <PageContainer>
      <h1 className="text-3xl font-semibold text-zinc-100">Pagination</h1>
      <p className="mt-3 max-w-3xl text-zinc-400">
        Work with large datasets efficiently using pagination parameters and cursors.
      </p>
      <section className="mt-8 rounded-xl border border-white/10 bg-zinc-900/40 p-5">
        <h2 className="text-lg font-semibold text-zinc-100">Parameters</h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-400">
          <li><span className="font-medium text-zinc-300">limit</span> — number of items per page</li>
          <li><span className="font-medium text-zinc-300">cursor</span> — opaque token pointing to next page</li>
        </ul>
      </section>
    </PageContainer>
  )
}
