import { motion } from "framer-motion";
import galleryInterior from "../assets/gallery-interior.png";

export function About() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={galleryInterior} 
                alt="Apsara Store Interior" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 h-32 w-32 bg-secondary rounded-full -z-10 blur-2xl opacity-60"></div>
            <div className="absolute -top-6 -left-6 h-32 w-32 bg-accent rounded-full -z-10 blur-2xl opacity-20"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-6">A Legacy of Beauty in Shindkheda</h2>
            <div className="w-16 h-1 bg-accent rounded-full mb-8"></div>
            
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                Apsara Store began with a simple belief: everyone deserves access to high-quality, authentic personal care products without having to travel to a big city.
              </p>
              <p>
                Nestled in the heart of Shindkheda, Gujarat, our store has grown into a trusted sanctuary for beauty enthusiasts. We don't just sell products; we offer a curated experience. Every item on our shelves is selected for its quality, efficacy, and authenticity.
              </p>
              <p>
                When you walk into Apsara Store, you're not just a customer—you're a neighbor. Our experienced team is always ready to guide you to the perfect skincare routine, the ideal fragrance, or the exact shade of lipstick you've been looking for.
              </p>
            </div>
            
            <div className="mt-10">
              <a 
                href="#contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-11 px-8 transition-colors"
                data-testid="btn-about-visit"
              >
                Visit Our Store
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
