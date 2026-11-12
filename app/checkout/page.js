 "use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRelove } from "../../context/ReloveContext";
import { rupiah } from "../../components/ProductCard";
import ProductImage from "../../components/ProductImage";

export default function CheckoutPage() {
  const router = useRouter();
  const { products, cart, addOrder } = useRelove();
  const product = products.find((p) => p.id === cart) || products[0];
  const [handover, setHandover] = useState("COD di Kampus UNNES");
  const [payment, setPayment] = useState("QRIS Mahasiswa Instan");
  const [note, setNote] = useState("");
  const shipping = handover.includes("COD") ? 0 : 8000;
  const total = product.price + shipping + 1000;

  const pay = () => {
    addOrder({ id: Date.now(), title: product.title, total, status: "Menunggu konfirmasi", date: new Date().toLocaleDateString("id-ID") });
    alert("Pesanan demo berhasil dibuat. Belum ada pembayaran sungguhan.");
    router.push("/account");
  };

  return (
    <div className="page-content checkout-page">
      <div className="back-row"><button onClick={() => router.back()}>←</button><span>Checkout</span><span className="secure-mini">Transaksi demo</span></div>
      <div className="security-banner"><div className="security-icon">✓</div><div><b>Rekber Relove Terlindungi</b><p>Dana kamu aman bersama Rekber Relove. Uang baru diteruskan ke penjual setelah barang kamu terima dan cocok di tangan.</p></div></div>
      <section className="checkout-card product-summary"><h2>Ringkasan Produk</h2><div className="summary-product"><ProductImage product={product} className="mini-art" /><div><b>{product.title}</b><small>Penjual: {product.seller}</small><strong>{rupiah(product.price)}</strong></div></div></section>
      <section className="checkout-card"><h2>Metode Serah Terima</h2><label className={`radio-card ${handover.includes("COD") ? "chosen" : ""}`}><input type="radio" name="handover" checked={handover === "COD di Kampus UNNES"} onChange={() => setHandover("COD di Kampus UNNES")} /><span><b>COD di Kampus UNNES</b><small>Gratis ongkir · titik kumpul aman kampus</small></span><strong>Gratis</strong></label><label className={`radio-card ${handover.includes("Kurir") ? "chosen" : ""}`}><input type="radio" name="handover" checked={handover === "Kirim Kurir Lokal / Ekspedisi"} onChange={() => setHandover("Kirim Kurir Lokal / Ekspedisi")} /><span><b>Kirim Kurir Lokal / Ekspedisi</b><small>Estimasi ongkir Rp8.000</small></span><strong>Rp8.000</strong></label><div className="meeting-detail"><b>Titik Kumpul Aman Kampus</b><p>Gazebo FMIPA / Depan Perpus Utama UNNES</p><small>Besok · 13:30 (Rehat Siang) — jadwal demo</small></div><label className="field-label">Catatan untuk Penjual<textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} maxLength={120} placeholder="Bantu penjual mengenali kamu saat bertemu..." /></label></section>
      <section className="checkout-card"><h2>Metode Pembayaran</h2>{["QRIS Mahasiswa Instan", "Virtual Account (Bank Jateng / BNI)", "Bayar Tunai Pas Ketemu (COD)"].map((p) => <label className={`radio-card ${payment === p ? "chosen" : ""}`} key={p}><input type="radio" name="payment" checked={payment === p} onChange={() => setPayment(p)} /><span><b>{p}</b><small>{p.startsWith("QRIS") ? "GoPay, ShopeePay, BCA, Mandiri, Dana" : p.startsWith("Virtual") ? "Pembayaran melalui rekening bank" : "Konfirmasi dua arah setelah cek fisik"}</small></span></label>)}</section>
      <section className="checkout-card"><h2>Rincian Pembayaran</h2><div className="price-line"><span>Harga Produk</span><b>{rupiah(product.price)}</b></div><div className="price-line"><span>Ongkos Kirim</span><b>{shipping ? rupiah(shipping) : "Gratis (Rp0)"}</b></div><div className="price-line"><span>Biaya Layanan Rekber</span><b>Rp1.000</b></div><div className="price-line total-line"><b>Total Pembayaran</b><strong>{rupiah(total)}</strong></div><small className="muted">Termasuk garansi proteksi komunitas kampus.</small></section>
      <div className="sticky-actions checkout-sticky"><div><small>Total Tagihan</small><b>{rupiah(total)}</b></div><button className="button button-dark" onClick={pay}>Bayar Sekarang ↗</button></div>
    </div>
  );
}
