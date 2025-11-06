import type { Tx } from '@/types/models'
import { rupiah } from '@/lib/format'
export default function TransaksiTable({ items }: { items: Tx[] }) {
  return (
    <div className="rounded-2xl border p-6 overflow-x-auto">
      <p className="font-semibold mb-3">Contoh Transaksi Terbaru</p>
      <table className="min-w-[640px] text-sm">
        <thead className="text-slate-500">
          <tr>
            <th className="text-left py-2 pr-4">Tanggal</th>
            <th className="text-left pr-4">Tipe</th>
            <th className="text-right pr-4">Jumlah</th>
            <th className="text-left pr-4">Sumber</th>
            <th className="text-left">Catatan</th>
          </tr>
        </thead>
        <tbody>
          {items.map((t,i)=> (
            <tr key={i} className="border-t">
              <td className="py-2 pr-4">{new Date(t.tanggal).toLocaleDateString('id-ID')}</td>
              <td className={t.tipe === 'IN' ? 'text-emerald-600 font-medium pr-4' : 'text-rose-600 font-medium pr-4'}>{t.tipe}</td>
              <td className="text-right pr-4">{rupiah(t.jumlah)}</td>
              <td className="pr-4">{t.sumber || '-'}</td>
              <td>{t.catatan || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
