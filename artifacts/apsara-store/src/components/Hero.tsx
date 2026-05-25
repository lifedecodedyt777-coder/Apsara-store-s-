import { motion } from "framer-motion";
import { CheckCircle2, Heart, MapPin, Sparkles } from "lucide-react";

import lifestyleImg from "../assets/gallery-lifestyle.png";
import flatlayImg from "../assets/gallery-flatlay.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent mb-6">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>Shindkheda's Premier Beauty Destination</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-foreground mb-4">
              Curated Beauty, <br />
              <span className="text-muted-foreground italic">Tailored For You.</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-2 font-serif text-accent">
              सौंदर्य और देखभाल, आपके शहर में।
            </p>
            <p className="text-base text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Discover authentic skincare, luxurious makeup, and premium fragrances. Apsara Store brings world-class personal care to your neighborhood with expert, personalized guidance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a 
                href="https://wa.me/917898000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md text-base font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                data-testid="link-hero-whatsapp"
              >
                WhatsApp Now
              </a>
              <a 
                href="#best-sellers"
                className="inline-flex items-center justify-center rounded-md text-base font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
                data-testid="link-hero-explore"
              >
                Explore Products
              </a>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 sm:flex sm:gap-6 text-sm font-medium text-foreground/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                Original Products
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-accent" />
                Local Service
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                Beauty Experts
              </div>
            </div>
          </motion.div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto"
            >
              <img 
                src={lifestyleImg} 
                alt="Beautiful glowing skin" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-10 -right-4 md:-right-12 w-48 md:w-64 rounded-xl overflow-hidden shadow-xl border-4 border-background z-20 aspect-square hidden sm:block"
            >
              <img 
                src={flatlayImg} 
                alt="Premium beauty products flatlay" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full aspect-square bg-secondary rounded-full blur-3xl opacity-50 z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
