import { motion } from "framer-motion";

const concerns = [
  { name: "Acne & Blemishes", category: "Skin" },
  { name: "Hair Fall", category: "Hair" },
  { name: "Dullness", category: "Glow" },
  { name: "Damage Repair", category: "Repair" },
  { name: "Everyday Hydration", category: "Daily Care" },
];

export function Concerns() {
  return (
    <section className="py-20 bg-secondary/30 border-y border-border/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">Shop by Concern</h2>
          <p className="text-muted-foreground">Targeted solutions for your unique beauty needs.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {concerns.map((concern, i) => (
            <motion.a
              href="#best-sellers"
              key={concern.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="px-6 py-3 rounded-full border border-primary/20 bg-background text-foreground hover:bg-primary hover:text-primary-foreground transition-colors duration-300 font-medium shadow-sm flex flex-col items-center"
              data-testid={`link-concern-${concern.category.toLowerCase().replace(/ /g, '-')}`}
            >
              <span className="text-xs uppercase tracking-wider opacity-70 mb-1">{concern.category}</span>
              <span>{concern.name}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
