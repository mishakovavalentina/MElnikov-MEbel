import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import curtains1 from "@/assets/portfolio-curtains1.jpg";
import curtains2 from "@/assets/portfolio-curtains2.jpg";

const items = [
  { img: curtains1, desc: "Льняные шторы в гостиную" },
  { img: curtains2, desc: "Портьеры с тюлем для спальни" },
  { img: curtains1, desc: "Рулонные шторы в детскую" },
  { img: curtains2, desc: "Декоративный текстиль для гостиной" },
];

const PortfolioTextile = () => (
  <section className="py-20 lg:py-28 bg-muted/50">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Текстильное оформление интерьера
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl">
          Шторы и текстиль, которые создают уют и подчёркивают стиль интерьера.
        </p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <motion.img
                  src={item.img}
                  alt={item.desc}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <p className="font-body text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioTextile;
