export type Program = { judul: string; deskripsi: string };
export type Pengurus = { jabatan: string; nama: string; foto?: string };
export type Kegiatan = { title: string; date: string; desc?: string; images?: string[] };
export type Tx = { tanggal: string; tipe: 'IN' | 'OUT'; jumlah: number; sumber?: string; catatan?: string };

export type DataModel = {
  meta: { org: string; periode?: string; lastUpdated?: string };
  visi: string[];
  misi: string[];
  program: Program[];
  struktur: Pengurus[];
  kegiatan: Kegiatan[];
  transaksi: Tx[];
};
