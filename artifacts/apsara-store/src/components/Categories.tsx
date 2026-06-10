import { motion } from "framer-motion";
import { Droplets, Sparkles, Paintbrush, Heart, Scissors, Wind, PenTool, Gift } from "lucide-react";

const categories = [
  { name: "Skincare", icon: Droplets, desc: "Nourish & protect" },
  { name: "Haircare", icon: Wind, desc: "Strength & shine" },
  { name: "Makeup", icon: Paintbrush, desc: "Color & confidence" },
  { name: "Personal Care", icon: Heart, desc: "Daily essentials" },
  { name: "Grooming", icon: Scissors, desc: "Refined routines" },
  { name: "Fragrance", icon: Sparkles, desc: "Signature scents" },
  { name: "Beauty Tools", icon: PenTool, desc: "Expert precision" },
  { name: "Gifts & Combos", icon: Gift, desc: "Curated sets" },
];

export function Categories() {
  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">Shop by Category</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.a
              href="#best-sellers"
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group flex flex-col items-center p-6 bg-card border border-border rounded-xl hover:shadow-lg hover:border-accent/50 transition-all duration-300 text-center"
              data-testid={`link-category-${cat.name.toLowerCase().replace(/ /g, '-')}`}
            >
              <div className="h-12 w-12 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <cat.icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif font-medium text-lg text-foreground mb-1">{cat.name}</h3>
              <p className="text-xs text-muted-foreground">{cat.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}


