import { useEffect, useState } from 'react'
import type { DataModel } from '@/types/models'
import { loadData, saveLocalOverride, clearLocalOverride, hasLocalOverride } from '@/lib/data-source'
import AdminNav from './AdminNav'

function validate(d: any): d is DataModel {
  return d && typeof d === 'object' && d.meta && Array.isArray(d.visi) && Array.isArray(d.misi)
    && Array.isArray(d.program) && Array.isArray(d.struktur) && Array.isArray(d.kegiatan) && Array.isArray(d.transaksi)
}

export default function ExportImport() {
  const [data, setData] = useState<DataModel | null>(null)
  const [status, setStatus] = useState<string>('')
  const [override, setOverride] = useState<boolean>(false)

  useEffect(() => { loadData().then(setData); setOverride(hasLocalOverride()) }, [])

  const onExport = async () => {
    const d = data || await loadData()
    const blob = new Blob([JSON.stringify(d, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'kompeska.json'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const onImport: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const text = await file.text()
    try {
      const obj = JSON.parse(text)
      if (!validate(obj)) throw new Error('Struktur tidak sesuai')
      saveLocalOverride(obj)
      setStatus('Data impor tersimpan secara lokal (localStorage).')
      loadData().then(setData)
      setOverride(true)
    } catch (err: any) {
      setStatus('Gagal impor: ' + (err?.message || 'format tidak valid'))
    }
  }

  const onClear = () => {
    clearLocalOverride()
    loadData().then(setData)
    setOverride(false)
    setStatus('Override lokal dihapus. Data kembali ke bawaan.')
  }

  return (
    <div>
      <AdminNav />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-1">Export/Import Data</h1>
      <p className="text-sm text-slate-600 mb-6">Kelola data JSON secara lokal (tanpa server). Override disimpan di browser.</p>

      {/* Info override dipindah ke badge kecil di AdminNav */}

        <div className="grid sm:grid-cols-2 gap-6 items-stretch">
          <div className="rounded-2xl border p-5 bg-white/70 h-full flex flex-col gap-3">
            <p className="font-semibold mb-2">Export</p>
            <p className="text-sm text-slate-600 mb-3">Unduh snapshot data saat ini dalam format JSON.</p>
            <button onClick={onExport} className="mt-auto w-full sm:w-auto rounded-lg px-4 py-2 bg-emerald-600 text-white hover:opacity-90">Download JSON</button>
          </div>
          <div className="rounded-2xl border p-5 bg-white/70 h-full flex flex-col gap-3">
            <p className="font-semibold mb-2">Import</p>
            <p className="text-sm text-slate-600 mb-3">Muat file JSON untuk menimpa data secara lokal.</p>
            <input type="file" accept="application/json" onChange={onImport} className="block w-full text-sm" />
            <button onClick={onClear} className="mt-auto w-full sm:w-auto rounded-lg px-4 py-2 border hover:shadow-sm">Hapus Override</button>
          </div>
        </div>

      {data && (
        <div className="mt-6 rounded-2xl border bg-white/60">
          <p className="font-semibold p-5">Pratinjau Data (JSON)</p>
          <pre className="text-xs bg-slate-100/70 p-5 overflow-x-auto">
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      )}
      </div>
    </div>
  )
}
    
