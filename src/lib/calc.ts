import type { DataModel, Tx } from '@/types/models'
import { ym } from './format'

export function ringkas(dm: DataModel) {
  const tx = dm.transaksi.map(t => ({ ...t, ym: ym(t.tanggal) }))
  const saldo = tx.reduce((a, t) => a + (t.tipe === 'IN' ? t.jumlah : -t.jumlah), 0)
  const nowYM = ym(new Date().toISOString())
  const bulanIni = tx.filter(t => t.ym === nowYM)
  const masuk = bulanIni.filter(t => t.tipe === 'IN').reduce((a,b)=>a+b.jumlah,0)
  const keluar = bulanIni.filter(t => t.tipe === 'OUT').reduce((a,b)=>a+b.jumlah,0)
  const byMonth = new Map<string, number>()
  tx.forEach(t => byMonth.set(t.ym, (byMonth.get(t.ym) || 0) + (t.tipe === 'IN' ? t.jumlah : -t.jumlah)))
  const series = [...byMonth.entries()].sort(([a],[b])=>a.localeCompare(b)).map(([period, balance])=>({ period, balance }))
  const latest = [...tx].sort((a,b)=> a.tanggal < b.tanggal ? 1 : -1).slice(0, 12)
  return { saldo, masuk, keluar, series, latest }
}
