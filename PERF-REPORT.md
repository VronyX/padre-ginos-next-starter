# Performance Investigation Report — Day 4

Nama: ______________________   Tag awal: `d4-start`

Cara mengukur (selalu sama):

- `npm run build && npm run start` (bukan `dev`)
- Chrome DevTools → Performance → CPU **4× slowdown**
- Ulangi 3 kali, catat median

| # | Keluhan | Alat ukur | Metrik | Sebelum | Hipotesis | Perbaikan | Sesudah |
|---|---|---|---|---|---|---|---|
| A | Filter analitik terasa lambat saat mengetik | Performance Panel (INP) | | | banyak component yang ikut dirender ulang | | |
| B | Dashboard makin berat kalau dibiarkan terbuka | Performance & Profiler | | Performance = 227ms | FormatPrice di taruh di live sehingga saat live update maka akan merender semua ulang | Hapus formatPrice dari live dan gunakan formatPrice yg ada di lib | Performance = 7.86ms |
| C | Overview lambat di laptop staf | | | | | | |
| D | Detail order lama terbuka | | | | | | |

## Catatan

- Apa yang paling mengejutkan dari hasil pengukuran?
- Perbaikan mana yang TIDAK memberi hasil, dan kenapa?
