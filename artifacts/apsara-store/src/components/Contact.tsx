import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-background rounded-3xl overflow-hidden shadow-lg border border-border flex flex-col lg:flex-row">
          
          <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-6">Visit Apsara Store</h2>
            <p className="text-muted-foreground mb-10">Step in for personalized beauty advice or reach out to us for quick deliveries within Shindkheda.</p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Address</h4>
                  <p className="text-muted-foreground text-sm mt-1">Main Market Road, Near City Square<br />Shindkheda, Gujarat, India 39XXXX</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Phone & WhatsApp</h4>
                  <p className="text-muted-foreground text-sm mt-1">+91 78980 00000</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="mt-1 h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Opening Hours</h4>
                  <p className="text-muted-foreground text-sm mt-1">Monday - Sunday<br />9:00 AM - 9:00 PM</p>
                </div>
              </div>
            </div>
            
            <a 
              href="https://wa.me/917898000000" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 w-full sm:w-auto"
              data-testid="btn-contact-whatsapp"
            >
              Message us on WhatsApp
            </a>
          </div>
          
          <div className="lg:w-1/2 min-h-[400px] bg-muted relative">
            {/* Minimal Map Placeholder to avoid external scripts. Looks premium and fits the vibe. */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-[#E5E3DF] dark:bg-muted">
               <MapPin className="h-12 w-12 text-accent mb-4 opacity-50" />
               <p className="font-serif text-2xl text-foreground/80 mb-2">Find Us in Shindkheda</p>
               <p className="text-muted-foreground max-w-xs">We are centrally located. Use Google Maps for precise directions.</p>
               <a 
                 href="#" 
                 className="mt-6 inline-flex items-center text-sm font-medium text-primary border-b border-primary pb-1"
                 data-testid="link-contact-directions"
               >
                 Get Directions
               </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
