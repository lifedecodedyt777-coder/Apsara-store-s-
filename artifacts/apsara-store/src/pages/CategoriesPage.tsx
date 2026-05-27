import { Link } from "wouter";
import { useGetCategories } from "@workspace/api-client-react";
import { Droplets, Wind, Paintbrush, Heart, Scissors, Sparkles, PenTool, Gift, ShoppingBag } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";

const categoryIcons: Record<string, React.ElementType> = {
  skincare: Droplets,
  haircare: Wind,
  makeup: Paintbrush,
  "personal-care": Heart,
  grooming: Scissors,
  fragrance: Sparkles,
  "beauty-tools": PenTool,
  "gifts-combos": Gift,
};

export function CategoriesPage() {
  const { data: categories, isLoading } = useGetCategories();

  const sorted = [...(categories ?? [])].sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-serif font-medium text-foreground mb-4">Shop by Category</h1>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-4" />
            <p className="text-muted-foreground max-w-md mx-auto text-sm">
              Browse our curated selection of beauty and personal care categories.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-xl" />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="font-serif text-xl">Categories coming soon</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {sorted.map((cat) => {
                const Icon = categoryIcons[cat.slug] ?? ShoppingBag;
                return (
                  <Link
                    key={cat.id}
                    href={`/products?categoryId=${cat.id}`}
                    className="group flex flex-col items-center p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-accent/50 transition-all duration-300 text-center"
                    data-testid={`link-category-${cat.slug}`}
                  >
                    <div className="h-14 w-14 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="h-7 w-7 text-foreground" />
                    </div>
                    <h3 className="font-serif font-medium text-lg text-foreground mb-1 group-hover:text-accent transition-colors">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-xs text-muted-foreground">{cat.description}</p>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
