import type { Kegiatan } from '@/types/models'
export default function KegiatanGallery({ items }: { items: Kegiatan[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((k,i)=> (
        <div key={i} className="rounded-2xl border border-slate-200 overflow-hidden bg-white/60">
          {k.images && k.images.length > 0 && (
            <div className="aspect-video bg-slate-100">
              <img src={k.images[0]} alt={k.title} className="h-full w-full object-cover" loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
          )}
          <div className="p-4">
            <p className="text-sm text-slate-500">{new Date(k.date).toLocaleDateString('id-ID')}</p>
            <p className="font-semibold">{k.title}</p>
            {k.desc && <p className="text-sm text-slate-600 mt-1">{k.desc}</p>}
            {k.images && k.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {k.images.slice(1).map((src, j) => (
                  <img key={j} src={src} alt={`${k.title} ${j+2}`} className="h-16 w-24 object-cover rounded" loading="lazy" />
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
