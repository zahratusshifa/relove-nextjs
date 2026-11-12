"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useRelove } from "../../context/ReloveContext";
import Icon from "../../components/Icon";

async function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const maxSide = 1100;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function SellPage() {
  const router = useRouter();
  const { addProduct } = useRelove();
  const fileRef = useRef(null);
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Fashion Wanita");
  const [condition, setCondition] = useState("Seperti Baru");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [handover, setHandover] = useState("COD di Sekitar Kampus");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  const choosePhotos = async (event) => {
    const files = Array.from(event.target.files || []).slice(0, 4);
    if (!files.length) return;
    setBusy(true);
    try {
      const converted = await Promise.all(files.map(async (file) => ({ name: file.name, src: await compressImage(file) })));
      setPhotos((current) => [...current, ...converted].slice(0, 4));
      setNotice("");
    } catch {
      setNotice("Foto gagal dibaca. Coba pilih file JPG, PNG, atau WEBP.");
    } finally {
      setBusy(false);
      event.target.value = "";
    }
  };

  const removePhoto = (index) => setPhotos((current) => current.filter((_, i) => i !== index));
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim() || Number(price) <= 0) { setNotice("Isi judul dan harga produk terlebih dahulu."); return; }
    if (!photos.length) { setNotice("Tambahkan minimal satu foto produk agar barang terlihat di katalog."); return; }
    addProduct({ title: title.trim(), price: Number(price), oldPrice: Math.round(Number(price) * 1.5), category, condition, campus: "UNNES Sekaran", distance: "Dekat kampus", seller: "Andini Pratama", image: photos[0].src, images: photos.map((photo) => photo.src), negotiable, description: description || "Barang preloved mahasiswa UNNES.", size: size || "All Size", handover });
    setNotice("Produk berhasil ditambahkan ke katalog!");
    setTimeout(() => router.push("/"), 700);
  };

  return (
    <div className="page-content form-page">
      <div className="back-row"><button type="button" onClick={() => router.back()} aria-label="Kembali">←</button><span>Jual Barang Preloved</span><span className="draft-label">Draf lokal</span></div>
      <div className="form-intro"><span className="eyebrow">UNNES SEKARAN CIRCULAR MARKET</span><h1>Pasang barangmu.</h1><p>Gunakan foto asli dan detail yang jelas agar mudah ditemukan teman kampus.</p></div>
      <form onSubmit={submit}>
        <section className="form-section"><h2>1. Foto Produk</h2><p className="upload-description">Pilih maksimal 4 foto. Foto yang dipilih akan langsung tampil di bawah ini.</p>
          <button className="upload-trigger" type="button" onClick={() => fileRef.current?.click()}><Icon name="upload" size={20} /> Pilih Foto Produk</button>
          <input ref={fileRef} className="visually-hidden" type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={choosePhotos} />
          <div className="upload-preview-grid">{photos.map((photo, index) => <div className="upload-preview" key={`${photo.name}-${index}`}><img src={photo.src} alt={`Pratinjau ${photo.name}`} /><button type="button" onClick={() => removePhoto(index)} aria-label="Hapus foto"><Icon name="close" size={15} /></button>{index === 0 && <span>Foto utama</span>}</div>)}{photos.length < 4 && <button type="button" className="upload-empty" onClick={() => fileRef.current?.click()}><Icon name="plus" size={22} /><small>Tambah foto</small></button>}</div>
          <p className="upload-help">{busy ? "Sedang memproses foto..." : `${photos.length}/4 foto dipilih · Foto akan otomatis diperkecil agar penyimpanan lebih ringan.`}</p>
        </section>
        <section className="form-section"><h2>2. Detail Barang</h2>
          <label className="field-label">Judul Barang<input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={80} placeholder="Contoh: Cardigan Rajut Oversized Pink" required /></label>
          <label className="field-label">Kategori<select value={category} onChange={(e) => setCategory(e.target.value)}><option>Fashion Wanita</option><option>Fashion Pria</option><option>Buku Kuliah</option><option>Elektronik</option><option>Kosan</option><option>Aksesori</option><option>Perawatan Diri</option><option>Lainnya</option></select></label>
          <label className="field-label">Kondisi Barang<select value={condition} onChange={(e) => setCondition(e.target.value)}><option>Seperti Baru</option><option>Baik</option><option>Layak Pakai</option></select></label>
          <label className="field-label">Ukuran / Spesifikasi<input value={size} onChange={(e) => setSize(e.target.value)} placeholder="Contoh: All Size (Fit to L)" /></label>
          <label className="field-label">Deskripsi Barang<textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Ceritakan kondisi, minus, atau detail barang..." /></label>
        </section>
        <section className="form-section"><h2>3. Harga & Negosiasi</h2><label className="field-label">Harga Jual (Rp)<input type="number" min="1000" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="48000" required /></label><label className="toggle-label"><input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} /> Harga masih bisa dinegosiasikan</label></section>
        <section className="form-section"><h2>4. Metode Serah Terima</h2><label className={`radio-card ${handover.includes("COD") ? "chosen" : ""}`}><input type="radio" name="handover" checked={handover === "COD di Sekitar Kampus"} onChange={() => setHandover("COD di Sekitar Kampus")} /><span><b>COD di Sekitar Kampus</b><small>UNNES · pilih titik temu yang ramai</small></span></label><label className={`radio-card ${handover.includes("Kurir") ? "chosen" : ""}`}><input type="radio" name="handover" checked={handover === "Kurir / Ekspedisi"} onChange={() => setHandover("Kurir / Ekspedisi")} /><span><b>Kirim via Ekspedisi / Kurir Instan</b><small>Ongkir ditanggung pembeli</small></span></label></section>
        {notice && <p className="form-notice">{notice}</p>}
        <button className="button button-dark button-full submit-listing" type="submit" disabled={busy}>Publikasikan Barang</button>
      </form>
    </div>
  );
}
