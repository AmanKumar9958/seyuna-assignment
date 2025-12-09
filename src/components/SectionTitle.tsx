import { ReactNode } from 'react';

interface SectionTitleProps {
  title: string;
  children: ReactNode;
}

export default function SectionTitle({ title, children }: SectionTitleProps) {
  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{title}</h2>
      {children}
    </div>
  )
}