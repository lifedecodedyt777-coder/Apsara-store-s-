import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { useGetProduct, useGetCategories, getGetProductQueryKey } from "@workspace/api-client-react";
import { ArrowLeft, MessageCircle, Package, Tag, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { buildWhatsAppOrderUrl } from "@/lib/whatsapp";

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800";

function setMetaTag(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${name}"]`)
    ?? document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    if (name.startsWith("og:") || name.startsWith("twitter:")) {
      el.setAttribute("property", name);
    } else {
      el.setAttribute("name", name);
    }
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);

  const { data: product, isLoading } = useGetProduct(productId, {
    query: { enabled: !isNaN(productId), queryKey: getGetProductQueryKey(productId) },
  });
  const { data: categories } = useGetCategories();

  const categoryMap = new Map((categories ?? []).map((c) => [c.id, c.name]));
  const categoryName = product?.categoryId ? categoryMap.get(product.categoryId) : undefined;

  useEffect(() => {
    if (!product) return;
    const title = `${product.name} – Apsara Store`;
    const description = product.shortDescription || product.description || "Premium beauty product from Apsara Store, Shindkheda.";
    const image = product.imageUrl ?? DEFAULT_IMAGE;
    const url = window.location.href;

    document.title = title;
    setMetaTag("description", description);
    setMetaTag("og:title", title);
    setMetaTag("og:description", description);
    setMetaTag("og:image", image);
    setMetaTag("og:url", url);
    setMetaTag("og:type", "product");
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);
    setMetaTag("twitter:image", image);

    return () => {
      document.title = "Apsara Store – Beauty & Personal Care";
    };
  }, [product]);

  const whatsappUrl = product
    ? buildWhatsAppOrderUrl({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.shortDescription || product.description,
        category: categoryName,
      })
    : "#";

  return (
    <div className="min-h-screen flex flex-col bg-background" data-testid="product-detail-page">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
            data-testid="link-back-to-products"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          {isLoading ? (
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              <Skeleton className="aspect-square w-full rounded-2xl" />
              <div className="space-y-4 py-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          ) : !product ? (
            <div className="text-center py-20 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-4 opacity-30" />
              <p className="font-serif text-2xl mb-2">Product not found</p>
              <p className="text-sm mb-6">This product may no longer be available.</p>
              <Link href="/products">
                <Button variant="outline">Browse All Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.imageUrl ?? DEFAULT_IMAGE}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.bestSeller && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground border-none">
                    Best Seller
                  </Badge>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-background/60 flex items-center justify-center backdrop-blur-sm">
                    <Badge variant="secondary" className="text-lg px-4 py-2">Out of Stock</Badge>
                  </div>
                )}
              </div>

              <div className="flex flex-col py-2">
                {categoryName && (
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      {categoryName}
                    </span>
                  </div>
                )}

                <h1 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-3 leading-tight">
                  {product.name}
                </h1>

                {product.shortDescription && (
                  <p className="text-muted-foreground text-base mb-5 leading-relaxed">
                    {product.shortDescription}
                  </p>
                )}

                <div className="flex items-end gap-3 mb-6">
                  <span className="text-3xl font-semibold text-foreground">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <span className="text-lg text-muted-foreground line-through mb-1">
                      ₹{product.comparePrice.toFixed(2)}
                    </span>
                  )}
                  {product.comparePrice && product.comparePrice > product.price && (
                    <Badge variant="secondary" className="mb-1">
                      {Math.round((1 - product.price / product.comparePrice) * 100)}% off
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2 mb-8">
                  {product.inStock ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">In Stock</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-600">Out of Stock</span>
                    </>
                  )}
                </div>

                {product.description && (
                  <div className="mb-8 p-5 bg-muted/40 rounded-xl border border-border">
                    <h3 className="font-medium text-foreground mb-2 text-sm uppercase tracking-wide">
                      Product Details
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">
                      {product.description}
                    </p>
                  </div>
                )}

                <Button
                  asChild
                  size="lg"
                  className="w-full h-14 text-base"
                  disabled={!product.inStock}
                  data-testid="btn-order-whatsapp"
                >
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-5 w-5 mr-2" />
                    Order on WhatsApp
                  </a>
                </Button>

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  You'll be redirected to WhatsApp with product details pre-filled.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
