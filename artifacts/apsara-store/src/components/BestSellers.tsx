import { motion } from "framer-motion";
import { Star, MessageCircle } from "lucide-react";

import serum from "../assets/product-serum.png";
import cream from "../assets/product-cream.png";
import shampoo from "../assets/product-shampoo.png";
import lipstick from "../assets/product-lipstick.png";
import fragrance from "../assets/product-fragrance.png";
import facewash from "../assets/product-facewash.png";

const products = [
  { id: 1, name: "Radiance Vitamin C Serum", benefit: "Brightens & Evens Tone", price: "₹899", rating: 4.9, img: serum },
  { id: 2, name: "Deep Hydration Cream", benefit: "24H Moisture Lock", price: "₹549", rating: 4.8, img: cream },
  { id: 3, name: "Keratin Smooth Shampoo", benefit: "Frizz-Free Shine", price: "₹399", rating: 4.7, img: shampoo },
  { id: 4, name: "Velvet Matte Lipstick", benefit: "Long-Lasting Wear", price: "₹299", rating: 4.6, img: lipstick },
  { id: 5, name: "Signature Aura Perfume", benefit: "Elegant Floral Notes", price: "₹1299", rating: 4.9, img: fragrance },
  { id: 6, name: "Gentle Purifying Face Wash", benefit: "Clear & Fresh Skin", price: "₹249", rating: 4.8, img: facewash },
];

export function BestSellers() {
  return (
    <section id="best-sellers" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">Trending at Apsara</h2>
            <div className="w-16 h-1 bg-accent rounded-full mb-4"></div>
            <p className="text-muted-foreground">Our most loved products, handpicked for you.</p>
          </div>
          <a href="#categories" className="text-sm font-medium text-primary border-b border-primary pb-1 inline-flex w-fit">
            View All Products
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square relative overflow-hidden bg-muted/20 p-6 flex items-center justify-center">
                <img 
                  src={product.img} 
                  alt={product.name}
                  className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span className="text-sm font-medium text-foreground/80">{product.rating}</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-foreground mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{product.benefit}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">{product.price}</span>
                  <a
                    href={`https://wa.me/917898000000?text=I'm interested in ordering ${product.name} (${product.price})`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4"
                    data-testid={`btn-order-${product.id}`}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Order
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
