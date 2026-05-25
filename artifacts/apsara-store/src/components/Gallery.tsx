import { motion } from "framer-motion";

import galleryFlatlay from "../assets/gallery-flatlay.png";
import galleryLifestyle from "../assets/gallery-lifestyle.png";
import galleryInterior from "../assets/gallery-interior.png";
import galleryPackaging from "../assets/gallery-packaging.png";

export function Gallery() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">The Apsara Experience</h2>
          <p className="text-muted-foreground">Glimpses of beauty, quality, and care.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="aspect-[4/5] rounded-xl overflow-hidden group relative"
          >
            <img src={galleryLifestyle} alt="Lifestyle" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="aspect-[4/5] rounded-xl overflow-hidden group relative lg:translate-y-8"
          >
            <img src={galleryPackaging} alt="Packaging" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="aspect-[4/5] rounded-xl overflow-hidden group relative"
          >
            <img src={galleryFlatlay} alt="Products Flatlay" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="aspect-[4/5] rounded-xl overflow-hidden group relative lg:translate-y-8"
          >
            <img src={galleryInterior} alt="Store Interior" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.div>
        </div>
        
        <div className="text-center mt-20">
          <a 
            href="#" 
            className="inline-flex items-center text-sm font-medium text-foreground hover:text-accent transition-colors"
            data-testid="link-gallery-instagram"
          >
            Follow us on Instagram @apsarastore_shindkheda
          </a>
        </div>
      </div>
    </section>
  );
}
