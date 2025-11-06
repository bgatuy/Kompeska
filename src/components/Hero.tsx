import { useEffect, useState } from 'react'

export default function Hero({ org, slides }: { org: string; slides?: string[] }) {
  const images = (slides && slides.length ? slides : ['/hero.jpg'])
  const [i, setI] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => setI((v) => (v + 1) % images.length), 4000)
    return () => clearInterval(id)
  }, [images.length])
  return (
    <section className="relative overflow-hidden" id="home">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 mb-3">Paguyuban</p>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight">
              {org} <span className="text-emerald-700">Kebersamaan &middot; Manfaat</span>
            </h1>
            <p className="mt-4 text-slate-600 max-w-prose">
            perkumpulan atau organisasi sosial yang anggotanya terikat oleh hubungan batin yang bersifat kekeluargaan, persaudaraan, dan kesamaan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#keuangan" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold bg-emerald-600 text-white hover:opacity-90">Lihat Saldo</a>
              <a href="#program" className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold border border-emerald-200 hover:shadow-sm">Program & Manfaat</a>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-3xl border border-slate-200 p-2 shadow-[0_10px_40px_-5px_rgba(0,0,0,0.2)]">
              <div className="relative aspect-video rounded-2xl overflow-hidden">
                {images.map((src, idx) => (
                  <img
                    key={src}
                    src={src}
                    alt={`Kegiatan ${idx + 1}`}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                  />
                ))}

                {images.length > 1 && (
                  <>
                    <button
                      aria-label="Sebelumnya"
                      onClick={() => setI((v) => (v - 1 + images.length) % images.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 sm:p-2 shadow hover:bg-white"
                    >
                      
                    </button>
                    <button
                      aria-label="Berikutnya"
                      onClick={() => setI((v) => (v + 1) % images.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-3 sm:p-2 shadow hover:bg-white"
                    >
                      </button>
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1">
                      {images.map((_, idx) => (
                        <span
                          key={idx}
                          onClick={() => setI(idx)}
                          className={`h-1.5 w-4 rounded-full ${i === idx ? 'bg-white' : 'bg-white/50'} cursor-pointer`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


