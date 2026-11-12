 "use client";

import Link from "next/link";
import { useRelove } from "../../context/ReloveContext";
import ProductCard from "../../components/ProductCard";
import { rupiah } from "../../components/ProductCard";

export default function AccountPage() {
  const { products, wishlist, orders } = useRelove();
  const saved = products.filter((p) => wishlist.includes(p.id));
  return (
    <div className="page-content account-page">
      <div className="page-topline"><div><span className="eyebrow">REL0VE • UNNES CAMPUS</span><h1>Akun Saya</h1></div><button className="round-icon">⚙</button></div>
      <section className="profile-card"><div className="profile-top"><div className="profile-avatar">A</div><div><span className="verified-pill">✓ Mahasiswa Aktif</span><h2>Andini Pratama</h2><p>✓ Terverifikasi UNNES</p><span className="rating">★ 4.9 <small>(42 ulasan)</small></span></div></div><Link href="/sell" className="button button-outline button-full">Edit Profil</Link></section>
      <section className="impact-card"><span className="eyebrow">JEJAK SIRKULARITAS KAMU</span><div className="impact-row"><div><h2>Eco Champion</h2><p>12 barang terselamatkan dari TPA</p></div><strong>±18.5 <small>kg CO₂ dicegah</small></strong></div><div className="impact-bar"><span /></div></section>
      <div className="stats-grid"><div><b>8</b><small>Barang Terjual</small></div><div><b>14</b><small>Barang Dibeli</small></div><div><b>420k</b><small>Uang Saku Dihasilkan</small></div></div>
      <section className="section-block"><div className="section-heading"><h2>Pesanan Saya</h2><Link href="/checkout" className="text-link">Lihat Semua</Link></div><div className="order-shortcuts"><div>◷<small>Menunggu</small></div><div>▣<small>Bayar</small></div><div>▤<small>Diproses</small></div><div>↔<small>Siap COD</small></div><div>✓<small>Selesai</small></div></div>{orders.length > 0 && <div className="order-list">{orders.map((o) => <div key={o.id}><b>{o.title}</b><small>{o.status} · {rupiah(o.total)}</small></div>)}</div>}</section>
      <section className="section-block"><div className="section-heading"><div><h2>Produk Saya</h2><p>3 aktif · 8 terjual · 1 draf</p></div><Link href="/sell" className="text-link">+ Jual Lagi</Link></div><div className="product-grid">{products.filter((p) => p.seller === "Andini Pratama").slice(0, 2).map((p) => <ProductCard key={p.id} product={p} />)}</div></section>
      <section className="section-block"><div className="section-heading"><h2>{saved.length} barang kamu sukai</h2><Link href="/explore" className="text-link">Explore</Link></div>{saved.length ? <div className="product-grid">{saved.map((p) => <ProductCard key={p.id} product={p} />)}</div> : <div className="empty-inline">♡<p>Barang favoritmu akan muncul di sini.</p></div>}</section>
      <section className="menu-card"><Link href="/chat">Pesan & Negosiasi ↗</Link><Link href="/explore">Titik Temu COD Favorit ↗</Link><Link href="/explore">Ulasan & Reputasi Mahasiswa ↗</Link><Link href="/explore">Pusat Bantuan & Panduan COD Aman ↗</Link></section>
      <button className="button button-outline button-full logout-button" onClick={() => alert("Ini hanya demo frontend.")}>Keluar dari Akun</button>
      <p className="version-note">Relove UNNES v2.4.0 • Sirkularitas Mahasiswa Sekaran</p>
    </div>
  );
}
