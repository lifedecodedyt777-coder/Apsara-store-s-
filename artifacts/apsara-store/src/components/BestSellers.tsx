import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { ProductCard } from "./ProductCard";

function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-muted rounded-lg aspect-[4/5]" />
  );
}

export function BestSellers() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-serif text-3xl mb-2">Best Sellers</h2>
            <p className="text-muted-foreground text-sm">Our most loved products, handpicked for you.</p>
          </div>
          <a href="/products" className="text-sm font-medium underline">View All Products</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading ? (
            [...Array(3)].map((_, i) => <ProductSkeleton key={i} />)
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              <p className="font-serif text-xl mb-2">Products coming soon</p>
              <p className="text-sm">The owner is adding products to the store. Check back shortly.</p>
            </div>
          ) : (
            products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

