import { useEffect, useMemo, useState } from 'react'
import type { DataModel, Tx } from '@/types/models'
import { loadData, saveLocalOverride, clearLocalOverride, hasLocalOverride } from '@/lib/data-source'
import { rupiah } from '@/lib/format'
import AdminNav from './AdminNav'

const today = () => new Date().toISOString().slice(0,10)

export default function KeuanganAdmin() {
  const [data, setData] = useState<DataModel | null>(null)
  const [override, setOverride] = useState(false)
  const [status, setStatus] = useState('')
  const [newTx, setNewTx] = useState<Tx>({ tanggal: today(), tipe: 'IN', jumlah: 0, sumber: '', catatan: '' })
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [editRow, setEditRow] = useState<Tx | null>(null)

  useEffect(() => { loadData().then(setData); setOverride(hasLocalOverride()) }, [])

  const tx = useMemo(()=> data?.transaksi ? [...data.transaksi].sort((a,b)=> a.tanggal < b.tanggal ? 1 : -1) : [], [data])

  const saveData = (nextTx: Tx[], msg='Perubahan disimpan.') => {
    if (!data) return
    const payload: DataModel = { ...data, transaksi: nextTx, meta: { ...data.meta, lastUpdated: today() } }
    saveLocalOverride(payload)
    setData(payload)
    setOverride(true)
    setStatus(msg)
  }

  const addTx = (e: React.FormEvent) => {
    e.preventDefault()
    if (!data) return
    const next = [...data.transaksi, newTx]
    saveData(next, 'Transaksi ditambahkan.')
    setNewTx({ tanggal: today(), tipe: 'IN', jumlah: 0, sumber: '', catatan: '' })
  }

  const startEdit = (i: number, t: Tx) => { setEditIdx(i); setEditRow({ ...t }) }
  const cancelEdit = () => { setEditIdx(null); setEditRow(null) }
  const commitEdit = (orig: Tx) => {
    if (!data || editRow == null) return
    const next = data.transaksi.map(t => t === orig ? editRow : t)
    saveData(next, 'Transaksi diperbarui.')
    cancelEdit()
  }
  const removeTx = (t: Tx) => {
    if (!data) return
    const next = data.transaksi.filter(x => x !== t)
    saveData(next, 'Transaksi dihapus.')
  }

  const clearOverride = async () => {
    clearLocalOverride()
    setOverride(false)
    const fresh = await loadData()
    setData(fresh)
    setStatus('Override lokal dibersihkan. Data kembali ke bawaan.')
  }

  return (
    <div>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <h1 className="text-2xl font-bold">Keuangan</h1>

      {/* Info override dipindah ke badge kecil di AdminNav */}

      {/* Form tambah transaksi */}
      <section className="rounded-2xl border p-5 bg-white/60">
        <p className="font-semibold mb-3">Tambah Transaksi</p>
        <form onSubmit={addTx} className="grid sm:grid-cols-5 gap-3">
          <input className="w-full rounded border px-3 py-2" required value={newTx.tanggal}
            onChange={e=>setNewTx({ ...newTx, tanggal: e.target.value })} placeholder="Tanggal" />
          <select className="rounded border px-3 py-2" value={newTx.tipe}
            onChange={e=>setNewTx({ ...newTx, tipe: e.target.value as Tx['tipe'] })}>
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
          <input className="w-full rounded border px-3 py-2" type="number" min={0} required value={newTx.jumlah}
            onChange={e=>setNewTx({ ...newTx, jumlah: Number(e.target.value) })} placeholder="Jumlah" />
          <input className="w-full rounded border px-3 py-2" value={newTx.sumber || ''}
            onChange={e=>setNewTx({ ...newTx, sumber: e.target.value })} placeholder="Sumber" />
          <input className="w-full rounded border px-3 py-2" value={newTx.catatan || ''}
            onChange={e=>setNewTx({ ...newTx, catatan: e.target.value })} placeholder="Catatan" />
          <div className="sm:col-span-5">
            <button type="submit" className="w-full sm:w-auto rounded-lg px-4 py-2 bg-emerald-600 text-white hover:opacity-90">Tambah</button>
          </div>
        </form>
      </section>

      {/* Tabel transaksi */}
      <section className="rounded-2xl border p-5 bg-white/60 overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <p className="font-semibold">Daftar Transaksi</p>
          <button onClick={clearOverride} className="rounded px-3 py-1.5 border text-sm hover:shadow-sm">Hapus Override</button>
        </div>
        <table className="min-w-[720px] text-sm">
          <thead className="text-slate-600 bg-slate-50">
            <tr>
              <th className="text-left py-2 pr-4">Tanggal</th>
              <th className="text-left pr-4">Tipe</th>
              <th className="text-right pr-4">Jumlah</th>
              <th className="text-left pr-4">Sumber</th>
              <th className="text-left pr-4">Catatan</th>
              <th className="text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="[&>tr:hover]:bg-slate-50/80">
          {tx.map((t,i)=> {
            const isEditing = editIdx === i && editRow
            return (
              <tr key={`${t.tanggal}-${i}`} className="border-t align-top">
                <td className="py-2 pr-4">
                  {isEditing ? (
                    <input className="rounded border px-2 py-1" value={editRow!.tanggal}
                      onChange={e=>setEditRow!({ ...editRow!, tanggal: e.target.value })} />
                  ) : new Date(t.tanggal).toLocaleDateString('id-ID')}
                </td>
                <td className="pr-4">
                  {isEditing ? (
                    <select className="rounded border px-2 py-1" value={editRow!.tipe}
                      onChange={e=>setEditRow!({ ...editRow!, tipe: e.target.value as Tx['tipe'] })}>
                      <option value="IN">IN</option>
                      <option value="OUT">OUT</option>
                    </select>
                  ) : (
                    <span className={t.tipe === 'IN' ? 'text-emerald-600 font-medium' : 'text-rose-600 font-medium'}>{t.tipe}</span>
                  )}
                </td>
                <td className="text-right pr-4">
                  {isEditing ? (
                    <input className="rounded border px-2 py-1 w-28 text-right" type="number" value={editRow!.jumlah}
                      onChange={e=>setEditRow!({ ...editRow!, jumlah: Number(e.target.value) })} />
                  ) : rupiah(t.jumlah)}
                </td>
                <td className="pr-4">
                  {isEditing ? (
                    <input className="rounded border px-2 py-1" value={editRow!.sumber || ''}
                      onChange={e=>setEditRow!({ ...editRow!, sumber: e.target.value })} />
                  ) : (t.sumber || '-')}
                </td>
                <td className="pr-4">
                  {isEditing ? (
                    <input className="rounded border px-2 py-1" value={editRow!.catatan || ''}
                      onChange={e=>setEditRow!({ ...editRow!, catatan: e.target.value })} />
                  ) : (t.catatan || '-')}
                </td>
                <td className="pr-4">
                  <div className="flex flex-wrap gap-2">
                  {isEditing ? (
                    <>
                      <button onClick={()=>commitEdit(t)} className="rounded px-2 py-1 bg-emerald-600 text-white">Simpan</button>
                      <button onClick={cancelEdit} className="rounded px-2 py-1 border">Batal</button>
                    </>
                  ) : (
                    <>
                      <button onClick={()=>startEdit(i, t)} className="rounded px-2 py-1 border">Edit</button>
                      <button onClick={()=>removeTx(t)} className="rounded px-2 py-1 border text-rose-600">Hapus</button>
                    </>
                  )}
                  </div>
                </td>
              </tr>
            )
          })}
          {!tx.length && (
            <tr><td colSpan={6} className="py-6 text-center text-slate-500">Belum ada transaksi.</td></tr>
          )}
          </tbody>
        </table>
      </section>

      {status && <p className="text-sm text-slate-700">{status}</p>}
    </div>
  </div>
  )
}
