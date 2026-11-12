
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useRelove } from "../context/ReloveContext";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import Icon from "../components/Icon";

const filters = [
  "Semua",
  "Sekaran",
  "Bisa Nego",
  "Di Bawah 30rb",
  "Verifikasi Mahasiswa"
];

const categories = [
  ["Fashion", "shirt"],
  ["Buku Kuliah", "book"],
  ["Elektronik", "laptop"],
  ["Kosan", "home"],
  ["Aksesori", "bag"],
  ["Lainnya", "grid"]
];

export default function HomePage() {
  const { products } = useRelove();

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("Semua");

  const router = useRouter();

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const match = product.title
          .toLowerCase()
          .includes(query.toLowerCase());

        const quick =
          filter === "Semua" ||
          (filter === "Sekaran" &&
            product.campus.toLowerCase().includes("sekaran")) ||
          (filter === "Bisa Nego" && product.negotiable) ||
          (filter === "Di Bawah 30rb" && product.price < 30000) ||
          filter === "Verifikasi Mahasiswa";

        return match && quick;
      }),
    [products, query, filter]
  );

  const submitSearch = (event) => {
    event.preventDefault();

    router.push(`/explore?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="page-content home-page">
      <div className="greeting-row">
        <div>
          <h1>Halo, Andini!</h1>

          <p className="location-line">
            <Icon name="pin" size={14} />
            <span>Kampus UNNES Sekaran, Gunungpati</span>
          </p>
        </div>

        <Link
          href="/account"
          className="round-icon"
          aria-label="Akun"
        >
          <Icon name="heart" size={22} />
        </Link>
      </div>

      <form className="search-row" onSubmit={submitSearch}>
        <div className="search-box">
          <Icon name="search" size={20} />

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari cardigan, buku kuliah, tote bag..."
          />
        </div>

        <Link
          href="/explore"
          className="filter-square"
          aria-label="Filter"
        >
          <Icon name="filter" size={21} />
        </Link>
      </form>

      <div className="quick-filters">
        {filters.map((item) => (
          <button
            type="button"
            key={item}
            className={filter === item ? "selected" : ""}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="eco-banner eco-banner-simple">
        <div className="eco-copy">
          <span className="eyebrow">
            UNNES SEKARAN CIRCULAR MARKET
          </span>

          <h2>Yuk, kasih barang kesempatan ke-2!</h2>

          <p>
            Barangmu punya cerita baru. Temukan pemilik
            berikutnya di sekitar kampus.
          </p>

          <Link
            href="/sell"
            className="button button-dark button-small"
          >
            Mulai Jual
            <Icon name="arrow" size={14} />
          </Link>
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          title="Kategori Pilihan"
          href="/explore"
        />

        <div className="category-strip">
          {categories.map(([label, icon]) => (
            <Link
              href={`/explore?category=${encodeURIComponent(label)}`}
              className="category-item"
              key={label}
            >
              <span>
                <Icon name={icon} size={25} />
              </span>

              <small>{label}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          title="Baru di Relove"
          subtitle="Temukan barang preloved yang baru diunggah"
          href="/explore"
        />

        <div className="product-grid">
          {filtered.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          title="Dekat denganmu"
          subtitle="Barang preloved di sekitar Sekaran & Gunungpati"
          href="/explore"
        />

        <div className="product-grid">
          {products.slice(2, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <section className="green-promo">
        <div>
          <span className="eyebrow">HARGA MAHASISWA</span>

          <h2>Punya barang menumpuk di kos?</h2>

          <p>
            Ubah barang yang sudah tidak terpakai jadi uang
            saku tambahan.
          </p>

          <Link
            href="/sell"
            className="button button-pink"
          >
            Pasang Iklan Gratis
          </Link>
        </div>
      </section>

      <section className="section-block">
        <SectionTitle
          title="Rekomendasi Untukmu"
          href="/explore"
        />

        <div className="product-grid">
          {products.slice(6, 10).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </section>

      <style jsx>{`
        .eco-banner-simple {
          display: block;
          min-height: 0;
          padding: 25px 22px;
          margin-top: 12px;
          margin-bottom: 25px;
          border-radius: 20px;
          background: #f6e9ed;
        }

        .eco-banner-simple .eco-copy {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 100%;
        }

        .eco-banner-simple .eco-copy h2 {
          max-width: 330px;
          margin: 10px 0 9px;
          color: #294b37;
          font-size: 24px;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }

        .eco-banner-simple .eco-copy p {
          max-width: 340px;
          margin: 0 0 16px;
          color: #68665f;
          font-size: 12px;
          line-height: 1.6;
        }

        @media (min-width: 500px) {
          .eco-banner-simple {
            padding: 30px;
          }
        }
      `}</style>
    </div>
  );
}
