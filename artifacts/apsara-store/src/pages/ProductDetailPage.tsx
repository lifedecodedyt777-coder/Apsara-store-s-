import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { supabase } from "../lib/supabase";

export function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;
    supabase.from("products").select("*").eq("id", params.id).single()
      .then(({ data }) => { setProduct(data); setLoading(false); });
  }, [params.id]);

  if (loading) return (
    <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "#888" }}>Loading...</p>
    </div>
  );

  if (!product) return (
    <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
      <p style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "#1a1a1a" }}>Product not found</p>
      <a href="/products" style={{ color: "#c9a84c", textDecoration: "underline" }}>Back to Products</a>
    </div>
  );

  const waMsg = "Hello Apsara Store! I want to order: " + product.name + " (Rs." + product.price + ")";

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
      <a href="/products" style={{ fontSize: 13, color: "#888", textDecoration: "none", display: "inline-block", marginBottom: 24 }}>
        &larr; Back to Products
      </a>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
        <div style={{ borderRadius: 16, overflow: "hidden", background: "#f5f0ea", aspectRatio: "4/5" }}>
          {product.imageUrl
            ? <img src={product.imageUrl} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: 16 }}>No Image</div>
          }
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 600, color: "#1a1a1a", margin: 0 }}>{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a" }}>&#8377;{product.price}</span>
            {product.comparePrice && (
              <span style={{ fontSize: 16, color: "#aaa", textDecoration: "line-through" }}>&#8377;{product.comparePrice}</span>
            )}
          </div>
          {product.shortDescription && (
            <p style={{ fontSize: 14, color: "#555", lineHeight: 1.6, margin: 0 }}>{product.shortDescription}</p>
          )}
          {product.description && (
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, margin: 0 }}>{product.description}</p>
          )}
          <a
            href={"https://wa.me/919960998672?text=" + encodeURIComponent(waMsg)}
            target="_blank" rel="noopener noreferrer"
            style={{ display: "block", padding: "14px 24px", background: "#1a1a1a", color: "#fff", borderRadius: 10, fontWeight: 700, fontSize: 15, textAlign: "center", textDecoration: "none", marginTop: 8 }}
          >
            Order on WhatsApp
          </a>
          <a href="/products" style={{ display: "block", padding: "12px 24px", border: "1px solid #e0d8cc", color: "#555", borderRadius: 10, fontWeight: 500, fontSize: 14, textAlign: "center", textDecoration: "none" }}>
            Browse All Products
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
