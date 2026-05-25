import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Patel",
    location: "Shindkheda",
    text: "Apsara Store is a lifesaver! I used to travel to Dhule for my premium cosmetics, but now I get everything right here. Their recommendations are always spot on.",
    rating: 5
  },
  {
    name: "Neha Desai",
    location: "Shindkheda",
    text: "The quality of products is 100% genuine. I had concerns about authenticity before my first visit, but the staff proved me wrong. My skin has never looked better.",
    rating: 5
  },
  {
    name: "Kiran Patil",
    location: "Nearby Village",
    text: "I just WhatsApp them my list and pick it up when I visit town. It's incredibly convenient, and they always inform me about new arrivals in my favorite brands.",
    rating: 5
  },
  {
    name: "Roshni Shah",
    location: "Shindkheda",
    text: "Such a beautifully organized store! Feels like a high-end boutique. They don't push expensive products; they suggest what actually works for your skin type.",
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">Loved by Locals</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full mb-4"></div>
          <p className="text-muted-foreground">What our wonderful customers in Shindkheda say about us.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((test, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border p-8 rounded-2xl relative shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-accent/20" />
              <div className="flex gap-1 mb-4">
                {[...Array(test.rating)].map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground/80 mb-6 italic leading-relaxed">"{test.text}"</p>
              <div>
                <p className="font-serif font-medium text-lg text-foreground">{test.name}</p>
                <p className="text-sm text-muted-foreground">{test.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
