import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ProductCard } from "@/components/ProductCard";

function ProductSkeleton() {
  return <div style={{ background: "#f5f0ea", borderRadius: 12, aspectRatio: "4/5" }} />;
}

export function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  const params = new URLSearchParams(window.location.search);
  const categoryId = params.get("categoryId");
  const categorySlug = params.get("category");

  useEffect(() => {
    let q = supabase.from("products").select("*").eq("visible", true);
    if (categoryId) q = q.eq("categoryId", categoryId);
    q.order("sortOrder", { ascending: true }).then(({ data }) => {
      setProducts(data ?? []);
      setIsLoading(false);
    });
  }, [categoryId]);

  const filtered = (products ?? []).filter((p) =>
    (p.name ?? "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}>
        {categoryId || categorySlug ? "Category Products" : "All Products"}
      </h1>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", border: "1px solid #e0d8cc", borderRadius: 10, padding: "10px 16px", fontSize: 14, marginBottom: 24, boxSizing: "border-box" }}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {isLoading
          ? [0,1,2,3,4,5,6,7].map((i) => <ProductSkeleton key={i} />)
          : filtered.length === 0
            ? <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "64px 0", color: "#888" }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 22, marginBottom: 8 }}>No products found</p>
                <p style={{ fontSize: 14 }}>{query ? "Try a different search term." : "Products are being added soon."}</p>
              </div>
            : filtered.map((product) => <ProductCard key={product.id} product={product} />)
        }
      </div>
    </div>
  );
}

export default ProductsPage;
