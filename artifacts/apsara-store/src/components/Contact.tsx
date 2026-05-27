import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Instagram, Navigation } from "lucide-react";
import { buildWhatsAppContactUrl } from "@/lib/whatsapp";

const MAPS_URL =
  "https://maps.google.com/?q=Apsara+Store+Near+Tahesil+Office+Veterinary+Hospital+Shindkheda+Sindkheda+425406+Maharashtra";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-background rounded-3xl overflow-hidden shadow-lg border border-border flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
                Visit Apsara Store
              </h2>
              <p className="text-muted-foreground mb-10 text-sm leading-relaxed">
                Step in for personalised beauty advice or reach out on WhatsApp for quick
                deliveries within Shindkheda.
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Address</h4>
                    <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
                      Near Tahesil Office &amp; Veterinary Hospital,<br />
                      Shindkheda (Sindkheda),<br />
                      Dhule District, Maharashtra – 425406
                    </p>
                    <a
                      href={MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-accent mt-2 hover:underline"
                      data-testid="link-contact-directions"
                    >
                      <Navigation className="h-3 w-3" />
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Phone &amp; WhatsApp</h4>
                    <a
                      href="tel:+919960998672"
                      className="text-muted-foreground text-sm mt-1 hover:text-foreground transition-colors block"
                    >
                      +91 99609 98672
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Clock className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Opening Hours</h4>
                    <p className="text-muted-foreground text-sm mt-1">
                      Monday – Sunday
                      <br />
                      9:00 AM – 9:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Instagram className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground text-sm">Social Media</h4>
                    <a
                      href="https://instagram.com/apsara_store_72"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground text-sm mt-1 hover:text-foreground transition-colors block"
                      data-testid="link-contact-instagram"
                    >
                      @apsara_store_72
                    </a>
                  </div>
                </div>
              </div>

              <a
                href={buildWhatsAppContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 w-full sm:w-auto transition-colors"
                data-testid="btn-contact-whatsapp"
              >
                Message on WhatsApp
              </a>
            </motion.div>
          </div>

          <div className="lg:w-1/2 min-h-[360px] bg-muted relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#E5E3DF]">
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-accent" />
              </div>
              <p className="font-serif text-2xl text-foreground/80 mb-2">Find Us in Shindkheda</p>
              <p className="text-muted-foreground text-sm max-w-xs leading-relaxed mb-2">
                Near Tahesil Office &amp; Veterinary Hospital,
                <br />
                Shindkheda, Dhule Dist., Maharashtra 425406
              </p>
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary border-b border-primary pb-1 hover:opacity-80 transition-opacity"
              >
                <Navigation className="h-4 w-4" />
                Get Directions on Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
