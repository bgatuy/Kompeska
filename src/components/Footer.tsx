export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-slate-200/60 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm">&copy; {year} KOMPESKA. All rights reserved.</p>
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <a href="#home" className="hover:opacity-80">Home</a>
          <span>&middot;</span>
          <a href="#program" className="hover:opacity-80">Program</a>
          <span>&middot;</span>
          <a href="#keuangan" className="hover:opacity-80">Keuangan</a>
          <span>&middot;</span>
          <a href="#kegiatan" className="hover:opacity-80">Kegiatan</a>
          <span>&middot;</span>
          <a href="/#/admin" className="hover:opacity-80">Admin</a>
        </div>
      </div>
    </footer>
  )
}

