export default function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle?: string; children: any }) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold">{title}</h2>
        {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
