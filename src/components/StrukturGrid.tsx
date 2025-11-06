import type { Pengurus } from '@/types/models'
export default function StrukturGrid({ items, periode }: { items: Pengurus[]; periode?: string }) {
  return (
    <div className="space-y-4">
      {periode && <p className="text-sm text-slate-500">Periode: {periode}</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((p,i)=> (
          <div key={i} className="rounded-2xl border border-slate-200 p-6 text-center bg-white/60">
            {p.foto ? (
              <img
                src={p.foto}
                alt={p.nama}
                className="w-20 h-20 mx-auto rounded-full object-cover mb-3"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ) : (
              <div className="w-20 h-20 mx-auto rounded-full bg-slate-200 mb-3" />
            )}
            <p className="text-xs uppercase tracking-wide text-slate-500">{p.jabatan}</p>
            <p className="font-semibold">{p.nama}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
