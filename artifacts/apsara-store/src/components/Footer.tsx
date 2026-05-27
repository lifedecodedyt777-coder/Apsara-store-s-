import { Link } from "wouter";
import { Instagram, MessageCircle, Youtube } from "lucide-react";
import { buildWhatsAppContactUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-1">
            <h3 className="font-serif text-3xl font-medium mb-4 text-background">Apsara Store</h3>
            <p className="text-primary-foreground/70 text-sm mb-6 max-w-xs leading-relaxed">
              Shindkheda's trusted destination for authentic beauty, skincare, and personal care.
              Local love meets premium quality.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/apsara_store_72"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-background hover:bg-accent transition-colors"
                aria-label="Instagram"
                data-testid="social-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com/@apsarastore72"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-background hover:bg-accent transition-colors"
                aria-label="YouTube"
                data-testid="social-youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={buildWhatsAppContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-background hover:bg-accent transition-colors"
                aria-label="WhatsApp"
                data-testid="social-whatsapp"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-serif text-xl font-medium mb-6 text-background">Quick Links</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <Link href="/products" className="hover:text-accent transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-accent transition-colors">
                  Shop by Category
                </Link>
              </li>
              <li>
                <a href="/#about" className="hover:text-accent transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="/#contact" className="hover:text-accent transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <Link href="/admin" className="hover:text-accent transition-colors">
                  Store Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl font-medium mb-6 text-background">Categories</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li>
                <Link href="/products?category=skincare" className="hover:text-accent transition-colors">
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="/products?category=haircare" className="hover:text-accent transition-colors">
                  Haircare
                </Link>
              </li>
              <li>
                <Link href="/products?category=makeup" className="hover:text-accent transition-colors">
                  Makeup
                </Link>
              </li>
              <li>
                <Link href="/products?category=fragrance" className="hover:text-accent transition-colors">
                  Fragrance
                </Link>
              </li>
              <li>
                <Link href="/products?category=grooming" className="hover:text-accent transition-colors">
                  Grooming
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-xl font-medium mb-6 text-background">Store Hours</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex justify-between border-b border-primary-foreground/10 pb-2">
                <span>Mon – Sat</span>
                <span className="text-background">9 AM – 9 PM</span>
              </li>
              <li className="flex justify-between border-b border-primary-foreground/10 pb-2">
                <span>Sunday</span>
                <span className="text-background">9 AM – 9 PM</span>
              </li>
            </ul>
            <div className="mt-6 space-y-1 text-sm text-primary-foreground/70">
              <p className="font-medium text-background">Contact</p>
              <a href="tel:+919960998672" className="hover:text-accent transition-colors block">
                +91 99609 98672
              </a>
              <p className="leading-snug">
                Near Tahesil Office,<br />
                Shindkheda, Dhule Dist.<br />
                Maharashtra – 425406
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} Apsara Store, Shindkheda. All rights reserved.</p>
          <p>Premium beauty, trusted locally.</p>
        </div>
      </div>
    </footer>
  );
}
