import { Link } from "wouter";
import { Instagram, Facebook, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-1">
            <h3 className="font-serif text-3xl font-medium mb-4 text-background">Apsara Store</h3>
            <p className="text-primary-foreground/70 text-sm mb-6 max-w-xs leading-relaxed">
              Shindkheda's premier destination for authentic beauty, skincare, and personal care products. Where local trust meets premium quality.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-background hover:bg-accent transition-colors" data-testid="social-instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-background hover:bg-accent transition-colors" data-testid="social-facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://wa.me/917898000000" className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-background hover:bg-accent transition-colors" data-testid="social-whatsapp">
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-medium mb-6 text-background">Quick Links</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#about" className="hover:text-accent transition-colors">Our Story</a></li>
              <li><a href="#best-sellers" className="hover:text-accent transition-colors">Best Sellers</a></li>
              <li><a href="#categories" className="hover:text-accent transition-colors">Shop by Category</a></li>
              <li><a href="#contact" className="hover:text-accent transition-colors">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-medium mb-6 text-background">Categories</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-accent transition-colors">Premium Skincare</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Haircare Essentials</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Authentic Makeup</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Luxury Fragrances</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Grooming & Tools</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl font-medium mb-6 text-background">Store Hours</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/70">
              <li className="flex justify-between border-b border-primary-foreground/10 pb-2">
                <span>Mon - Sat:</span>
                <span className="text-background">9:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-primary-foreground/10 pb-2">
                <span>Sunday:</span>
                <span className="text-background">9:00 AM - 9:00 PM</span>
              </li>
            </ul>
            <p className="text-xs text-primary-foreground/50 mt-4 italic">Open all days for your convenience.</p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary-foreground/20 text-center flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} Apsara Store Shindkheda. All rights reserved.
          </p>
          <div className="text-primary-foreground/60 text-sm">
            Designed for local excellence.
          </div>
        </div>
      </div>
    </footer>
  );
}
