import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, MessageCircle } from "lucide-react";
import { buildWhatsAppContactUrl } from "@/lib/whatsapp";

const navLinks = [
  { label: "Categories", href: "/categories" },
  { label: "Products", href: "/products" },
  { label: "Our Story", href: "/#about" },
  { label: "Visit Us", href: "/#contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex flex-col shrink-0">
          <span className="font-serif text-2xl font-semibold text-primary leading-tight">Apsara Store</span>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest leading-none">Beauty &amp; Personal Care</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${location === link.href ? "text-foreground font-semibold" : "text-foreground/70 hover:text-foreground"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={buildWhatsAppContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2 transition-colors"
            data-testid="button-header-whatsapp"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
          <button
            className="md:hidden p-2 rounded-md text-foreground/70 hover:text-foreground transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-1"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={buildWhatsAppContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-2 transition-colors"
              data-testid="button-mobile-whatsapp"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
