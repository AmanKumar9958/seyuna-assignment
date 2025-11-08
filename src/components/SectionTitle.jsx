export default function SectionTitle({ title, children }) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">{title}</h2>
      {children}
    </div>
  )
}