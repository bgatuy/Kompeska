export const rupiah = (n: number) =>
  n.toLocaleString('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 });

export const ym = (iso: string) => iso.slice(0, 7);
