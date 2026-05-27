import { Link } from "wouter";
import { useGetProducts, useGetCategories } from "@workspace/api-client-react";
import { ProductCard } from "./ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-[4/5] w-full rounded-xl" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function BestSellers() {
  const { data: products, isLoading } = useGetProducts({ featured: true });
  const { data: categories } = useGetCategories();

  const categoryMap = new Map((categories ?? []).map((c) => [c.id, c.name]));

  const visibleProducts = (products ?? []).filter((p) => p.visible);

  return (
    <section id="best-sellers" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">Trending at Apsara</h2>
            <div className="w-16 h-1 bg-accent rounded-full mb-4" />
            <p className="text-muted-foreground text-sm">Our most loved products, handpicked for you.</p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-primary border-b border-primary pb-1 inline-flex w-fit hover:opacity-80 transition-opacity"
            data-testid="link-view-all-products"
          >
            View All Products
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : visibleProducts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="font-serif text-xl mb-2">Products coming soon</p>
            <p className="text-sm">The owner is adding products to the store. Check back shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProducts.slice(0, 6).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                categoryName={product.categoryId ? categoryMap.get(product.categoryId) : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
