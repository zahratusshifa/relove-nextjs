# Relove UNNES — Next.js Frontend

Project marketplace preloved kampus menggunakan Next.js App Router, JavaScript, React, dan CSS.

## Menjalankan project

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

## Menambahkan foto katalog

1. Buka folder project `relove-nextjs` di VS Code.
2. Buka folder `public`, lalu buka folder `images`.
3. Salin foto produk dari komputer ke folder `public/images`.
4. Pastikan nama file sama persis dengan daftar berikut:
   - `CardiganRajutOversizeSageGreen.jpg`
   - `ToteBagCanvasUNNES.jpg`
   - `BukuBumiSeriesTereLiyeSelena.webp`
   - `DiktatKalkulusEdisi9Purcell.webp`
   - `JacketDenimOversizeLightBlue.jpg`
   - `RakSepatuSusunPortableKos.jpg`
   - `CatokanRambutMiniPortable20W.jpg`
   - `SepatuVentelaHighBasic39Ori.webp`
   - `BlouseFloralKoreanVintage.jpg`
   - `BodyLotion.jpg`
5. Simpan, lalu refresh browser. Jika nama file berbeda, sesuaikan properti `image` pada `context/ReloveContext.js`.

Folder `public/images` adalah folder aset lokal project, bukan Library di Figma. Saat deploy ke Vercel, file gambar yang ada di folder ini ikut ter-deploy.

## Upload foto saat memasang barang

Pada halaman Jual, tekan **Pilih Foto Produk**. Pilih sampai 4 foto dari perangkat. Pratinjau akan langsung terlihat. Foto akan diperkecil otomatis dan disimpan bersama data produk di localStorage browser.

## Halaman

- `/` — Beranda
- `/explore` — Explore dan pencarian produk
- `/product/1` — Detail produk
- `/sell` — Form tambah produk
- `/checkout` — Checkout simulasi
- `/account` — Akun
- `/chat` — Chat simulasi

## Catatan

Data demo disimpan di localStorage. Upload foto dari halaman Jual juga disimpan secara lokal di browser perangkat tersebut. Ini masih frontend demo, belum terhubung database, autentikasi, chat real-time, atau payment gateway. Untuk penggunaan sungguhan, foto dan data perlu disimpan di backend/cloud storage.
