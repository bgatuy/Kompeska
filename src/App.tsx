import { useEffect, useState } from 'react'
import HomePage from './pages/Home'
import ExportImport from './pages/AdminLocal/ExportImport'
import Editor from './pages/AdminLocal/Editor'
import KeuanganAdmin from './pages/AdminLocal/Keuangan'

export default function App() {
  const [hash, setHash] = useState<string>(window.location.hash || '#/')

  useEffect(() => {
    const onHash = () => setHash(window.location.hash || '#/')
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const isAdmin = hash.startsWith('#/admin')
  if (!isAdmin) return <HomePage />
  if (hash.startsWith('#/admin/keuangan')) return <KeuanganAdmin />
  if (hash.startsWith('#/admin/edit')) return <Editor />
  return <ExportImport />
}
