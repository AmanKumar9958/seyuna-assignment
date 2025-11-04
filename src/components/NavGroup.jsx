import SectionTitle from './SectionTitle.jsx'

export default function NavGroup({ title, items, active }) {
  return (
    <SectionTitle title={title}>
      <nav className="mt-3 flex flex-col gap-1">
        {items.map((item) => (
          <a
            key={item}
            href="#"
            className={
              "rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/5 " +
              (active === item ? 'bg-white/5 text-emerald-400' : 'text-zinc-300')
            }
          >
            {item}
          </a>
        ))}
      </nav>
    </SectionTitle>
  )
}
