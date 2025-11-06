import { useEffect, useState } from 'react'

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function AdminNav() {
  const [open, setOpen] = useState(false)
  const [hash, setHash] = useState<string>(typeof window !== 'undefined' ? window.location.hash : '')
  useEffect(() => {
    const onHash = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // Normalized route without leading '#', no trailing slash
  const route = (() => {
    const v = (hash || '#/').replace(/^#/, '')
    return v !== '/' && v.endsWith('/') ? v.slice(0, -1) : v
  })()

  const isActive = (href: string) => {
    const target = href.replace('/#', '') // e.g. '/admin', '/admin/edit'
    if (target === '/admin') return route === '/admin' // exact match only for Export/Import
    return route.startsWith(target)
  }

  const link = (href: string, label: string) => (
    <a
      href={href}
      className={cx(
        'px-2 py-1 rounded hover:bg-slate-100',
        isActive(href) && 'font-semibold text-emerald-700 bg-emerald-50'
      )}
      onClick={() => setOpen(false)}
    >
      {label}
    </a>
  )

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/#/" className="flex items-center gap-3">
          <img src="/logo.png" alt="KOMPESKA" className="h-10 sm:h-10 md:h-10 lg:h-15 w-auto" />
          <span className="text-sm font-semibold text-slate-700">Admin</span>
        </a>
        <nav className="hidden md:flex items-center gap-2 text-sm">
          {link('/#/admin', 'Export/Import')}
          {link('/#/admin/edit', 'Editor')}
          {link('/#/admin/keuangan', 'Keuangan')}
          <a href="/#/" className="ml-2 px-2 py-1 rounded text-slate-600 hover:bg-slate-100">Lihat Situs</a>
        </nav>
        <button
          aria-label="Menu Admin"
          onClick={()=>setOpen(v=>!v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border"
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-slate-200/60 bg-white/95">
          <div className="mx-auto max-w-7xl px-4 py-3 grid gap-1 text-sm">
            {link('/#/admin', 'Export/Import')}
            {link('/#/admin/edit', 'Editor')}
            {link('/#/admin/keuangan', 'Keuangan')}
            <a href="/#/" className="px-2 py-1 rounded text-slate-600 hover:bg-slate-100">Lihat Situs</a>
          </div>
        </div>
      )}
    </header>
  )
}
