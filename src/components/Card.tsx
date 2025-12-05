import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-5 hover:border-white/20">
      <h3 className="mb-2 font-medium text-zinc-100">{title}</h3>
      <p className="text-sm leading-relaxed text-zinc-400">{children}</p>
    </div>
  )
}