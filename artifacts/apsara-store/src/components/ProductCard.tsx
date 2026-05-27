import { Link } from "wouter";
import { MessageCircle } from "lucide-react";
import { Product } from "@workspace/api-client-react";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ProductCard({
  product,
  categoryName,
}: {
  product: Product;
  categoryName?: string;
}) {
  const defaultImage = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400&h=500";
  const whatsappUrl = buildWhatsAppOrderUrl({
    id: product.id,
    name: product.name,
    price: product.price,
    description: product.shortDescription,
    category: categoryName,
  });

  return (
    <Card className="overflow-hidden flex flex-col h-full border-0 shadow-sm hover:shadow-md transition-shadow group bg-card" data-testid={`product-card-${product.id}`}>
      <Link href={`/products/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={product.imageUrl || defaultImage}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-[2px]">
            <Badge variant="secondary" className="text-sm px-3 py-1 font-medium tracking-wide">
              Out of Stock
            </Badge>
          </div>
        )}
        {product.inStock && product.bestSeller && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground hover:bg-accent border-none px-2.5 py-0.5">
            Best Seller
          </Badge>
        )}
      </Link>
      
      <CardContent className="p-5 flex flex-col flex-1 gap-4">
        <div className="flex-1 space-y-2">
          {categoryName && (
            <span className="text-[11px] font-medium tracking-wider text-muted-foreground uppercase">
              {categoryName}
            </span>
          )}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-serif text-xl font-medium leading-tight line-clamp-2 text-foreground group-hover:text-accent transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.shortDescription}
          </p>
        </div>

        <div className="space-y-4 mt-auto">
          <div className="flex items-end gap-2">
            <span className="text-lg font-semibold text-foreground">
              ₹{product.price.toFixed(2)}
            </span>
            {product.comparePrice && product.comparePrice > product.price && (
              <span className="text-sm text-muted-foreground line-through mb-0.5">
                ₹{product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>

          <Button
            asChild
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11"
            disabled={!product.inStock}
          >
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4 mr-2" />
              Order on WhatsApp
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}