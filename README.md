# KOMPESKA — Single Page (React + Tailwind)

## Quick start
```bash
npm i
npm run dev
```

## Struktur data
Ubah konten di `src/data/kompeska.json`. Frontend akan menghitung saldo dari daftar `transaksi` (IN/OUT).

## Supabase (opsional)
Jika ingin tarik data dari Supabase (read-only publik), ganti implementasi `loadData()` di `src/lib/data-source.ts` dan isi ENV:
- `VITE_SUPABASE_URL=`
- `VITE_SUPABASE_ANON_KEY=`
(Sertakan view: saldo_bulanan, transaksi_approved, dll.)

## Build
```bash
npm run build
npm run preview
```
