import { motion } from "framer-motion";
import { ShieldCheck, MapPin, Users, HeartHandshake, MessageSquare, Zap } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "100% Authentic", desc: "Genuine products sourced directly from trusted brands." },
  { icon: MapPin, title: "Local Reputation", desc: "Shindkheda's most trusted beauty destination for years." },
  { icon: Users, title: "Expert Guidance", desc: "Personalized recommendations for your unique needs." },
  { icon: HeartHandshake, title: "Every Budget", desc: "From daily essentials to premium luxury collections." },
  { icon: MessageSquare, title: "WhatsApp Assist", desc: "Easy ordering and instant support right on your phone." },
  { icon: Zap, title: "Fast Response", desc: "Quick local delivery and immediate customer service." },
];

export function WhyUs() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6 text-background">Why Apsara Store?</h2>
          <div className="w-16 h-1 bg-accent mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-start gap-4"
            >
              <div className="h-12 w-12 shrink-0 rounded-full bg-accent/20 flex items-center justify-center text-accent border border-accent/30">
                <feat.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-serif font-medium mb-2 text-background">{feat.title}</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
