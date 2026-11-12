
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useRelove } from "../../../context/ReloveContext";
import { rupiah } from "../../../components/ProductCard";
import ProductImage from "../../../components/ProductImage";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const {
    products,
    wishlist,
    toggleWishlist,
    setCart
  } = useRelove();

  const product =
    products.find((item) => item.id === String(id)) ||
    products[0];

  const liked = wishlist.includes(product.id);

  const buy = () => {
    setCart(product.id);
    router.push("/checkout");
  };

  const chat = () => {
    router.push(
      `/chat?with=${encodeURIComponent(product.seller)}`
    );
  };

  return (
    <div className="page-content detail-page">
      <div className="back-row">
        <button onClick={() => router.back()}>
          ←
        </button>

        <span>Detail Produk</span>

        <button onClick={() => toggleWishlist(product.id)}>
          {liked ? "♥" : "♡"}
        </button>
      </div>

      <div className="detail-art">
        <ProductImage product={product} />

        <span className="image-count">
          {product.images?.length || 1} foto
        </span>

        <span className="condition-tag">
          {product.condition}
        </span>
      </div>

      <div className="detail-tags">
        <span>{product.category}</span>
        <span>Outerwear</span>
        <span>{product.likes || 12} suka</span>
      </div>

      <h1 className="detail-title">
        {product.title}
      </h1>

      <div className="detail-price-row">
        <strong>{rupiah(product.price)}</strong>

        <del>
          {rupiah(product.oldPrice || product.price * 2)}
        </del>

        <span className="discount-tag">Hemat</span>
      </div>

      <div className="spec-grid">
        <div>
          <small>Ukuran / spesifikasi</small>
          <b>{product.size}</b>
        </div>

        <div>
          <small>Kondisi</small>
          <b>{product.condition}</b>
        </div>

        <div>
          <small>Lokasi penjual</small>
          <b>{product.campus}</b>
        </div>

        <div>
          <small>Negosiasi</small>
          <b>
            {product.negotiable ? "Bisa nego" : "Harga pas"}
          </b>
        </div>
      </div>

      <section className="detail-section">
        <h2>Metode Serah Terima</h2>

        <div className="handover-card">
          <b>Titik Temu COD Kampus</b>
          <p>
            Gazebo FMIPA / Depan Perpus Utama UNNES (Sekaran)
          </p>
          <small>Fleksibel setelah jam kuliah</small>
        </div>

        <div className="handover-card">
          <b>Pengiriman Reguler</b>
          <p>Estimasi ongkir mulai Rp8.000</p>
        </div>
      </section>

      <section className="detail-section">
        <h2>Deskripsi Barang</h2>

        <p className="body-copy">
          {product.description}
        </p>

        <button
          className="text-link"
          onClick={(event) =>
            event.currentTarget.previousSibling.classList.toggle(
              "expanded"
            )
          }
        >
          Baca Selengkapnya
        </button>
      </section>

      <section className="seller-card">
        <div className="seller-avatar">
          {product.seller?.charAt(0).toUpperCase()}
        </div>

        <div>
          <b>{product.seller}</b>
          <small>✓ Terverifikasi Mahasiswa UNNES</small>
          <span>★ 4.9 · 42 ulasan</span>
        </div>

        <button
          className="button button-outline"
          onClick={chat}
        >
          Chat
        </button>
      </section>

      <section className="detail-section">
        <h2>Ulasan Pembeli UNNES</h2>

        <div className="review-card">
          <b>★★★★★ <span>5.0</span></b>
          <p>
            Barang sesuai deskripsi, penjual ramah dan titik COD
            gampang ditemukan.
          </p>
          <small>Mahasiswa UNNES · 1 minggu lalu</small>
        </div>
      </section>

      <div className="sticky-actions">
        <button
          className="button button-outline"
          onClick={chat}
        >
          Chat & Nego
        </button>

        <button
          className="button button-dark"
          onClick={buy}
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );
}
