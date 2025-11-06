import { rupiah } from '@/lib/format'
export default function SaldoCard({ saldo, updated }: { saldo: number; updated: string }) {
  return (
    <div className="rounded-2xl border p-6">
      <p className="text-sm text-slate-500">Saldo</p>
      <p className="text-3xl font-black">{rupiah(saldo)}</p>
      <p className="text-xs text-slate-500 mt-1">Terakhir diperbarui: {updated}</p>
    </div>
  )
}
