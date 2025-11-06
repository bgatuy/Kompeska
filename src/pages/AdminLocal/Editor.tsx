import { useEffect, useState } from 'react'
import type { DataModel, Program, Pengurus, Kegiatan, Tx } from '@/types/models'
import { loadData, saveLocalOverride, clearLocalOverride, hasLocalOverride } from '@/lib/data-source'
import AdminNav from './AdminNav'

export default function Editor() {
  const [data, setData] = useState<DataModel | null>(null)
  const [status, setStatus] = useState<string>('')
  const [override, setOverride] = useState<boolean>(false)

  useEffect(() => { loadData().then(setData); setOverride(hasLocalOverride()) }, [])

  const save = () => {
    if (!data) return
    const payload: DataModel = {
      ...data,
      meta: { ...data.meta, lastUpdated: new Date().toISOString().slice(0,10) }
    }
    saveLocalOverride(payload)
    setOverride(true)
    setStatus('Perubahan disimpan ke browser (localStorage).')
    setData(payload)
  }

  const reset = async () => {
    clearLocalOverride()
    setOverride(false)
    const fresh = await loadData()
    setData(fresh)
    setStatus('Override dihapus. Kembali ke data bawaan.')
  }

  if (!data) return (<>
    <AdminNav />
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">Memuat data…</div>
  </>)

  return (<>
    <AdminNav />
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <h1 className="text-2xl font-bold">Editor Data</h1>

      {/* Info override dipindah ke badge kecil di AdminNav */}

      {/* Meta */}
      <section className="rounded-2xl border p-5 bg-white/60">
        <p className="font-semibold mb-3">Meta</p>
        <div className="grid sm:grid-cols-3 gap-4">
          <label className="text-sm">
            <span className="block text-slate-600 mb-1">Organisasi</span>
            <input className="w-full rounded border px-3 py-2" value={data.meta.org}
              onChange={e=>setData({ ...data, meta: { ...data.meta, org: e.target.value } })} />
          </label>
          <label className="text-sm">
            <span className="block text-slate-600 mb-1">Periode</span>
            <input className="w-full rounded border px-3 py-2" value={data.meta.periode || ''}
              onChange={e=>setData({ ...data, meta: { ...data.meta, periode: e.target.value } })} />
          </label>
          <label className="text-sm">
            <span className="block text-slate-600 mb-1">Last Updated</span>
            <input className="w-full rounded border px-3 py-2" value={data.meta.lastUpdated || ''}
              onChange={e=>setData({ ...data, meta: { ...data.meta, lastUpdated: e.target.value } })} />
          </label>
        </div>
      </section>

      {/* Program */}
      <EditableList
        title="Program" items={data.program}
        render={(p, setP)=> (
          <div className="grid sm:grid-cols-2 gap-3">
            <input className="w-full rounded border px-3 py-2" placeholder="Judul" value={p.judul}
              onChange={e=>setP({ ...p, judul: e.target.value })} />
            <input className="w-full rounded border px-3 py-2" placeholder="Deskripsi" value={p.deskripsi}
              onChange={e=>setP({ ...p, deskripsi: e.target.value })} />
          </div>
        )}
        onChange={list=>setData({ ...data, program: list })}
        createItem={() => ({ judul: '', deskripsi: '' } as Program)}
      />

      {/* Struktur */}
      <EditableList
        title="Struktur" items={data.struktur}
        render={(p, setP)=> (
          <div className="grid sm:grid-cols-3 gap-3">
            <input className="w-full rounded border px-3 py-2" placeholder="Jabatan" value={p.jabatan}
              onChange={e=>setP({ ...p, jabatan: e.target.value })} />
            <input className="w-full rounded border px-3 py-2" placeholder="Nama" value={p.nama}
              onChange={e=>setP({ ...p, nama: e.target.value })} />
            <input className="w-full rounded border px-3 py-2" placeholder="/struktur/ketua.jpg" value={p.foto || ''}
              onChange={e=>setP({ ...p, foto: e.target.value })} />
          </div>
        )}
        onChange={list=>setData({ ...data, struktur: list })}
        createItem={() => ({ jabatan: '', nama: '', foto: '' } as Pengurus)}
      />

      {/* Kegiatan */}
      <EditableList
        title="Kegiatan" items={data.kegiatan}
        render={(k, setK)=> (
          <div className="grid sm:grid-cols-4 gap-3">
            <input className="w-full rounded border px-3 py-2" placeholder="Judul" value={k.title}
              onChange={e=>setK({ ...k, title: e.target.value })} />
            <input className="w-full rounded border px-3 py-2" placeholder="Tanggal (YYYY-MM-DD)" value={k.date}
              onChange={e=>setK({ ...k, date: e.target.value })} />
            <input className="w-full rounded border px-3 py-2 sm:col-span-2" placeholder="Deskripsi" value={k.desc || ''}
              onChange={e=>setK({ ...k, desc: e.target.value })} />
            <input className="w-full rounded border px-3 py-2 sm:col-span-4" placeholder="Daftar gambar, pisah koma: /kegiatan/1.jpg,/kegiatan/2.jpg" value={(k.images || []).join(',')}
              onChange={e=>setK({ ...k, images: e.target.value.split(',').map(s=>s.trim()).filter(Boolean) })} />
          </div>
        )}
        onChange={list=>setData({ ...data, kegiatan: list })}
        createItem={() => ({ title: '', date: new Date().toISOString().slice(0,10), desc: '', images: [] } as Kegiatan)}
      />

      {/* Transaksi */}
      <EditableList
        title="Transaksi" items={data.transaksi}
        render={(t, setT)=> (
          <div className="grid sm:grid-cols-5 gap-3">
            <input className="w-full rounded border px-3 py-2" placeholder="Tanggal" value={t.tanggal}
              onChange={e=>setT({ ...t, tanggal: e.target.value })} />
            <select className="rounded border px-3 py-2" value={t.tipe}
              onChange={e=>setT({ ...t, tipe: e.target.value as Tx['tipe'] })}>
              <option value="IN">IN</option>
              <option value="OUT">OUT</option>
            </select>
            <input className="w-full rounded border px-3 py-2" placeholder="Jumlah" type="number" value={t.jumlah}
              onChange={e=>setT({ ...t, jumlah: Number(e.target.value) })} />
            <input className="w-full rounded border px-3 py-2" placeholder="Sumber" value={t.sumber || ''}
              onChange={e=>setT({ ...t, sumber: e.target.value })} />
            <input className="w-full rounded border px-3 py-2" placeholder="Catatan" value={t.catatan || ''}
              onChange={e=>setT({ ...t, catatan: e.target.value })} />
          </div>
        )}
        onChange={list=>setData({ ...data, transaksi: list })}
        createItem={() => ({ tanggal: new Date().toISOString().slice(0,10), tipe: 'IN', jumlah: 0, sumber: '', catatan: '' } as Tx)}
      />

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <button onClick={save} className="w-full sm:w-auto rounded-lg px-4 py-2 bg-emerald-600 text-white hover:opacity-90">Simpan</button>
        <button onClick={reset} className="w-full sm:w-auto rounded-lg px-4 py-2 border hover:shadow-sm">Hapus Override</button>
        {status && <span className="text-sm text-slate-600">{status}</span>}
      </div>
    </div>
  </>)
}

function EditableList<T>({ title, items, render, onChange, createItem }: {
  title: string;
  items: T[];
  render: (item: T, setItem: (v: T)=>void) => React.ReactNode;
  onChange: (items: T[]) => void;
  createItem: () => T;
}){
  const update = (idx: number, next: T) => {
    const arr = items.slice(); arr[idx] = next; onChange(arr)
  }
  const remove = (idx: number) => {
    const arr = items.slice(); arr.splice(idx,1); onChange(arr)
  }
  const add = () => onChange([ ...items, createItem() ])
  return (
    <section className="rounded-2xl border p-5 bg-white/60">
      <div className="flex items-center justify-between mb-3">
        <p className="font-semibold">{title}</p>
        <button onClick={add} className="rounded px-3 py-1.5 border text-sm hover:shadow-sm">Tambah</button>
      </div>
      <div className="space-y-4">
        {items.map((it, idx)=> (
          <div key={idx} className="rounded-xl border p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-slate-500">Item #{idx+1}</p>
              <button onClick={()=>remove(idx)} className="rounded px-2 py-1 border text-xs hover:shadow-sm">Hapus</button>
            </div>
            {render(it, (v)=>update(idx, v))}
          </div>
        ))}
        {!items.length && <p className="text-sm text-slate-500">Belum ada data.</p>}
      </div>
    </section>
  )
}
