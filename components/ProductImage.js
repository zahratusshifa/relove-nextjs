"use client";

import { useState } from "react";

export default function ProductImage({ product, className = "", alt }) {
  const src = product?.image || product?.images?.[0] || "";
  const [failed, setFailed] = useState(false);
  return (
    <div className={`product-image-wrap ${className}`}>
      {src && !failed ? <img src={src} alt={alt || product?.title || "Foto produk"} className="product-image" onError={() => setFailed(true)} /> : <div className="image-placeholder" aria-label="Foto produk belum tersedia"><span>Foto belum tersedia</span></div>}
    </div>
  );
}
