import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import horizontal from "@/assets/portfolio-horizontal-blinds.jpg";
import vertical from "@/assets/portfolio-vertical-blinds.jpg";
import roller from "@/assets/portfolio-blinds1.jpg";
import pleated from "@/assets/portfolio-pleated-blinds.jpg";

const items = [
  { img: horizontal, title: "Горизонтальные жалюзи", desc: "Классическое решение для контроля света" },
  { img: vertical, title: "Вертикальные жалюзи", desc: "Идеальны для панорамных окон" },
  { img: roller, title: "Рулонные системы", desc: "Компактные и функциональные" },
  { img: pleated, title: "Жалюзи плиссе", desc: "Элегантное решение для нестандартных окон" },
];

const SunProtectionSection = () => (
  <section className="py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Системы солнцезащиты
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-square overflow-hidden">
                <motion.img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-bold mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default SunProtectionSection;
