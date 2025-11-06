export default function Sparkline({ points, width=360, height=80, strokeWidth=2 }: { points: {period: string; balance: number}[]; width?: number; height?: number; strokeWidth?: number; }) {
  if (!points.length) return null;
  const ys = points.map(p => p.balance);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const pad = 6;
  const scaleX = (i: number) => pad + i * ((width - pad*2) / Math.max(1, points.length-1));
  const scaleY = (v: number) => {
    if (maxY === minY) return height/2;
    const t = (v - minY) / (maxY - minY);
    return height - pad - t * (height - pad*2);
  };
  const d = points.map((p,i)=> `${i===0? 'M':'L'} ${scaleX(i).toFixed(2)} ${scaleY(p.balance).toFixed(2)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20">
      <path d={d} fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity={0.85} />
    </svg>
  );
}
