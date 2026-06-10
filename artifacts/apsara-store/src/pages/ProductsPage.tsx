import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ProductCard } from "@/components/ProductCard";

function ProductSkeleton() {
  return <div className="animate-pulse bg-muted rounded-lg aspect-[4/5]" />;
}

export function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("visible", true)
      .order("sortOrder", { ascending: true })
      .then(({ data }) => {
        setProducts(data ?? []);
        setIsLoading(false);
      });
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl mb-6">All Products</h1>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full border rounded-lg px-4 py-2 mb-8 text-sm"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          [...Array(8)].map((_, i) => <ProductSkeleton key={i} />)
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 text-muted-foreground">
            <p className="font-serif text-2xl mb-3">No products found</p>
            <p className="text-sm">{query ? "Try a different search term." : "Products are being added soon."}</p>
          </div>
        ) : (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
}
