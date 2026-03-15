import { Phone, Mail, Send } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const ContactsSection = () => (
  <section id="contacts" className="py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10">Контакты</h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-3 gap-6 max-w-3xl">
        <AnimatedSection delay={0}>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-primary mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Телефон</p>
              <a href="tel:+79057716340" className="font-medium hover:text-primary transition-colors">
                +7 905 771 6340
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-primary mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <a href="mailto:geomelnikov@gmail.com" className="font-medium hover:text-primary transition-colors">
                geomelnikov@gmail.com
              </a>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex items-start gap-3">
            <Send className="w-5 h-5 text-primary mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-sm text-muted-foreground mb-1">Telegram</p>
              <a
                href="https://t.me/MelnikovGV"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium hover:text-primary transition-colors"
              >
                @MelnikovGV
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.3} className="mt-8">
        <a
          href="https://t.me/MelnikovGV"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-md font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
        >
          <Send className="w-4 h-4" />
          Написать в Telegram
        </a>
      </AnimatedSection>
    </div>
  </section>
);

export default ContactsSection;
