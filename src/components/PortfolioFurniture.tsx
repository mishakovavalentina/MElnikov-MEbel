import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import kitchen1 from "@/assets/portfolio-kitchen1.jpg";
import kitchen2 from "@/assets/portfolio-kitchen2.jpg";
import wardrobe1 from "@/assets/portfolio-wardrobe1.jpg";
import wardrobe2 from "@/assets/portfolio-wardrobe2.jpg";
import closet1 from "@/assets/portfolio-closet1.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";

const items = [
  { img: kitchen1, title: "Кухня в светлых тонах", category: "Кухня" },
  { img: wardrobe1, title: "Встроенный шкаф из массива", category: "Шкаф" },
  { img: closet1, title: "Гардеробная с системой хранения", category: "Гардеробная" },
  { img: kitchen2, title: "Кухня в тёмном стиле", category: "Кухня" },
  { img: wardrobe2, title: "Шкаф-витрина с подсветкой", category: "Шкаф" },
  { img: heroKitchen, title: "Минималистичная кухня", category: "Кухня" },
];

const PortfolioFurniture = () => (
  <section id="portfolio-furniture" className="py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Корпусная мебель
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl">
          Кухни, шкафы и гардеробные, выполненные по индивидуальным проектам.
        </p>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <AnimatedSection key={i} delay={i * 0.08}>
            <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
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
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {item.category}
                </span>
                <h3 className="font-display text-base font-bold mt-1">{item.title}</h3>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default PortfolioFurniture;
