 "use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useRelove } from "../../context/ReloveContext";
import Icon from "../../components/Icon";

const categories = ["Semua", "Fashion", "Buku Kuliah", "Elektronik", "Kosan", "Aksesori"];

export default function ExplorePage() {
  const { products } = useRelove();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Semua");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQuery(params.get("q") || "");
    setCategory(params.get("category") || "Semua");
  }, []);
  const [condition, setCondition] = useState("Semua kondisi");
  const [sort, setSort] = useState("Terbaru");
  const [negotiable, setNegotiable] = useState(false);

  const shown = useMemo(() => products.filter((p) => {
    const q = query.toLowerCase();
    const matchQuery = p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchCategory = category === "Semua" || p.category.toLowerCase().includes(category.toLowerCase());
    const matchCondition = condition === "Semua kondisi" || p.condition === condition;
    return matchQuery && matchCategory && matchCondition && (!negotiable || p.negotiable);
  }).sort((a, b) => sort === "Harga terendah" ? a.price - b.price : sort === "Harga tertinggi" ? b.price - a.price : 0), [products, query, category, condition, sort, negotiable]);

  return (
    <div className="page-content">
      <div className="page-topline"><div><span className="eyebrow">REL0VE • UNNES CAMPUS</span><h1>Explore & Cari Barang</h1><p>Temukan preloved favoritmu di sekitar kampus.</p></div></div>
      <div className="search-box explore-search"><Icon name="search" size={20} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari cardigan, buku kuliah, tote bag..." /><button onClick={() => setQuery("")}>×</button></div>
      <div className="trending-row"><b>Tren mahasiswa</b><span>Cardigan rajut</span><span>Kalkulus Purcell</span><span>Tote bag kanvas</span></div>
      <div className="category-pills">{categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={category === c ? "selected" : ""}>{c}</button>)}</div>
      <div className="filter-panel">
        <label>Urutkan<select value={sort} onChange={(e) => setSort(e.target.value)}><option>Terbaru</option><option>Harga terendah</option><option>Harga tertinggi</option></select></label>
        <label>Kondisi<select value={condition} onChange={(e) => setCondition(e.target.value)}><option>Semua kondisi</option><option>Seperti Baru</option><option>Baik</option><option>Layak Pakai</option></select></label>
        <label className="toggle-label"><input type="checkbox" checked={negotiable} onChange={(e) => setNegotiable(e.target.checked)} /> Bisa nego</label>
      </div>
      <div className="result-line"><b>{shown.length} barang</b><span>COD Kampus Aktif · Sekaran</span></div>
      {shown.length ? <div className="product-grid">{shown.map((p) => <ProductCard key={p.id} product={p} />)}</div> : <div className="empty-state"><span><Icon name="search" size={34} /></span><h3>Belum menemukan barangnya</h3><p>Coba kata kunci atau filter yang berbeda.</p><button className="button button-dark" onClick={() => {setQuery("");setCategory("Semua");setCondition("Semua kondisi");setNegotiable(false);}}>Atur Ulang Filter</button></div>}
    </div>
  );
}
