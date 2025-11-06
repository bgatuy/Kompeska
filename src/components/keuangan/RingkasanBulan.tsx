import { rupiah } from '@/lib/format'
export default function RingkasanBulan({ masuk, keluar }: { masuk: number; keluar: number }) {
  return (
    <div className="rounded-2xl border p-6 grid sm:grid-cols-2 gap-4 sm:divide-x">
      <div>
        <p className="text-sm text-slate-500">Masuk (bulan ini)</p>
        <h4 className="text-xl font-bold text-emerald-600">{rupiah(masuk)}</h4>
      </div>
      <div className="sm:pl-4">
        <p className="text-sm text-slate-500">Keluar (bulan ini)</p>
        <h4 className="text-xl font-bold text-rose-600">{rupiah(keluar)}</h4>
      </div>
    </div>
  )
}
