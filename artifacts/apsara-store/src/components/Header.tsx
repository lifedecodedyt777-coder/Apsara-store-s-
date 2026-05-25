import { motion } from "framer-motion";
import { Link } from "wouter";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className="font-serif text-2xl font-semibold text-primary leading-tight">Apsara Store</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Beauty & Personal Care</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="#categories" className="text-foreground/80 hover:text-foreground transition-colors">Categories</a>
          <a href="#best-sellers" className="text-foreground/80 hover:text-foreground transition-colors">Best Sellers</a>
          <a href="#about" className="text-foreground/80 hover:text-foreground transition-colors">Our Story</a>
          <a href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">Visit Us</a>
        </nav>
        <a 
          href="https://wa.me/917898000000" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
          data-testid="button-header-whatsapp"
        >
          WhatsApp Us
        </a>
      </div>
    </header>
  );
}
