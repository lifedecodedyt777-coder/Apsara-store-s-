import { motion } from "framer-motion";

export function Offers() {
  return (
    <section className="py-12 bg-background border-y border-border">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-secondary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        >
          {/* Decorative accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <h3 className="text-xs uppercase tracking-widest text-accent font-semibold mb-2">Limited Time</h3>
            <h2 className="text-3xl font-serif font-medium text-foreground mb-4">Festive Glow Combo</h2>
            <p className="text-foreground/80 mb-0">
              Get our signature Vitamin C Serum and Deep Hydration Cream together at a special price. Perfect for the upcoming festive season.
            </p>
          </div>
          
          <div className="relative z-10 shrink-0">
            <a 
              href="https://wa.me/917898000000?text=I'm interested in the Festive Glow Combo offer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-xl shadow-primary/20"
              data-testid="btn-offer-claim"
            >
              Claim Offer via WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
