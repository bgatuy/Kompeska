import type { Program } from '@/types/models'
export default function ProgramGrid({ items }: { items: Program[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((p,i)=> (
        <div key={i} className="rounded-2xl border border-slate-200 p-6 bg-white/60">
          <p className="font-bold">{p.judul}</p>
          <p className="text-sm text-slate-600 mt-1">{p.deskripsi}</p>
        </div>
      ))}
    </div>
  )
}
