import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import kitchenLight1 from "@/assets/20220419_021335.jpg";
import kitchenLight2 from "@/assets/20220419_021450.jpg";
import kitchenLight3 from "@/assets/IMG-20220829-WA0029.jpg";
import kitchen2 from "@/assets/portfolio-kitchen2.jpg";
import wardrobe1 from "@/assets/portfolio-wardrobe1.jpg";
import wardrobe2 from "@/assets/portfolio-wardrobe2.jpg";
import closet1 from "@/assets/portfolio-closet1.jpg";
import heroKitchen from "@/assets/hero-kitchen.jpg";

const kitchenLightPhotos = [kitchenLight1, kitchenLight2, kitchenLight3];

const KitchenCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setIndex((i) => (i - 1 + kitchenLightPhotos.length) % kitchenLightPhotos.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setIndex((i) => (i + 1) % kitchenLightPhotos.length);
  };

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={index}
          src={kitchenLightPhotos[index]}
          alt="Кухня в светлых тонах"
          className="absolute inset-0 w-full h-full object-cover"
          custom={direction}
          initial={{ x: direction * 100 + "%" }}
          animate={{ x: 0 }}
          exit={{ x: direction * -100 + "%" }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          loading="lazy"
        />
      </AnimatePresence>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
        aria-label="Предыдущее фото"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition-colors"
        aria-label="Следующее фото"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {kitchenLightPhotos.map((_, i) => (
          <span
            key={i}
            className={`block w-1.5 h-1.5 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
};

const items = [
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
        <AnimatedSection delay={0}>
          <div className="group bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
            <KitchenCarousel />
            <div className="p-5">
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                Кухня
              </span>
              <h3 className="font-display text-base font-bold mt-1">Кухня в светлых тонах</h3>
            </div>
          </div>
        </AnimatedSection>

        {items.map((item, i) => (
          <AnimatedSection key={i} delay={(i + 1) * 0.08}>
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
