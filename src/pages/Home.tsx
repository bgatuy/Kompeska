import Section from '@/components/Section'
import Hero from '@/components/Hero'
import VisiMisi from '@/components/VisiMisi'
import ProgramGrid from '@/components/ProgramGrid'
import StrukturGrid from '@/components/StrukturGrid'
import SaldoCard from '@/components/keuangan/SaldoCard'
import RingkasanBulan from '@/components/keuangan/RingkasanBulan'
import Sparkline from '@/components/keuangan/Sparkline'
import TransaksiTable from '@/components/keuangan/TransaksiTable'
import KegiatanGallery from '@/components/KegiatanGallery'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { loadData } from '@/lib/data-source'
import { useEffect, useState, useMemo } from 'react'
import type { DataModel } from '@/types/models'
import { ringkas } from '@/lib/calc'

export default function HomePage() {
  const [data, setData] = useState<DataModel | null>(null)

  useEffect(()=>{ loadData().then(setData) }, [])

  const sum = useMemo(()=> data ? ringkas(data) : null, [data])

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero org={data?.meta.org || 'KOMPESKA'} slides={['/kegiatan/1.jpg','/kegiatan/2.jpg','/kegiatan/3.jpg']} />

      <Section id="visi-misi" title="Visi & Misi" subtitle="Arah gerak yang disepakati bersama.">
        {data && <VisiMisi visi={data.visi} misi={data.misi} />}
      </Section>

      <Section id="program" title="Program & Manfaat" subtitle="Ringkas, berdampak, dan terus berjalan.">
        {data && <ProgramGrid items={data.program} />}
      </Section>

      <Section id="struktur" title="Struktur Organisasi" subtitle="Periode kepengurusan & peran pengurus.">
        {data && <StrukturGrid items={data.struktur} periode={data.meta.periode} />}
      </Section>

      <Section id="keuangan" title="Contoh Transparansi Keuangan" subtitle="Saldo, ringkasan, dan histori singkat.">
        {sum && data && (
          <div className="grid gap-6">
            <div className="grid md:grid-cols-3 gap-6">
              <SaldoCard saldo={sum.saldo} updated={data.meta.lastUpdated || new Date().toISOString().slice(0,10)} />
              <RingkasanBulan masuk={sum.masuk} keluar={sum.keluar} />
              <div className="rounded-2xl border p-6">
                <p className="font-semibold mb-2">Pergerakan 12 Bulan</p>
                <Sparkline points={sum.series} />
              </div>
            </div>
            <TransaksiTable items={sum.latest} />
          </div>
        )}
      </Section>

      <Section id="kegiatan" title="Kegiatan Organisasi" subtitle="Cuplikan aktivitas dan kebersamaan.">
        {data && <KegiatanGallery items={data.kegiatan} />}
      </Section>

      <Footer />
    </div>
  )
}
