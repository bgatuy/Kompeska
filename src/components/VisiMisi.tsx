export default function VisiMisi({ visi, misi }: { visi: string[]; misi: string[] }) {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="rounded-2xl border border-slate-200 p-6 bg-white/60">
        <h3 className="font-bold text-xl mb-2">Visi</h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          {visi.map((v,i)=>(<li key={i}>{v}</li>))}
        </ul>
      </div>
      <div className="rounded-2xl border border-slate-200 p-6 bg-white/60">
        <h3 className="font-bold text-xl mb-2">Misi</h3>
        <ul className="list-disc pl-5 space-y-1 text-slate-700">
          {misi.map((m,i)=>(<li key={i}>{m}</li>))}
        </ul>
      </div>
    </div>
  )
}
