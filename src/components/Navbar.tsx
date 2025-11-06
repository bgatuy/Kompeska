import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-slate-200/50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <img src="/logo.png" alt="KOMPESKA" className="h-10 sm:h-10 md:h-10 lg:h-14 w-auto" />
        </a>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#visi-misi" className="hover:opacity-80">Visi & Misi</a>
          <a href="#program" className="hover:opacity-80">Program</a>
          <a href="#struktur" className="hover:opacity-80">Struktur</a>
          <a href="#keuangan" className="hover:opacity-80">Keuangan</a>
          <a href="#kegiatan" className="hover:opacity-80">Kegiatan</a>
          <a href="/#/admin" className="text-slate-400 hover:text-slate-700">Admin</a>
        </div>
        <button aria-label="Menu" onClick={()=>setOpen(v=>!v)} className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      {open && (
        <div className="md:hidden border-t border-slate-200/60 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-7xl px-4 py-3 grid gap-3 text-sm">
            <a onClick={()=>setOpen(false)} href="#visi-misi" className="py-1">Visi & Misi</a>
            <a onClick={()=>setOpen(false)} href="#program" className="py-1">Program</a>
            <a onClick={()=>setOpen(false)} href="#struktur" className="py-1">Struktur</a>
            <a onClick={()=>setOpen(false)} href="#keuangan" className="py-1">Keuangan</a>
            <a onClick={()=>setOpen(false)} href="#kegiatan" className="py-1">Kegiatan</a>
            <a onClick={()=>setOpen(false)} href="/#/admin" className="py-1 text-slate-500">Admin</a>
          </div>
        </div>
      )}
    </header>
  )
}
