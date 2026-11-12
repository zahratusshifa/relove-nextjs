"use client";

import Link from "next/link";
import { useRelove } from "../context/ReloveContext";
import ProductImage from "./ProductImage";
import Icon from "./Icon";

export function rupiah(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist } = useRelove();
  const liked = wishlist.includes(product.id);
  return (
    <article className="product-card">
      <Link href={`/product/${product.id}`} className="product-art">
        <ProductImage product={product} />
        <span className="condition-tag">{product.condition}</span>
      </Link>
      <button className={`heart-button ${liked ? "liked" : ""}`} onClick={() => toggleWishlist(product.id)} aria-label="Simpan ke wishlist"><Icon name="heart" size={19} /></button>
      <div className="product-info">
        <Link href={`/product/${product.id}`} className="product-title">{product.title}</Link>
        <div className="product-price">{rupiah(product.price)}</div>
        <div className="product-meta"><span><Icon name="pin" size={12} /> {product.campus}</span>{product.negotiable && <span className="nego-tag">Nego</span>}</div>
      </div>
    </article>
  );
}
