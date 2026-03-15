import { motion } from "framer-motion";
import heroImage from "@/assets/hero-kitchen.jpg";

const HeroSection = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Text */}
          <motion.div
            className="lg:col-span-3 space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="text-me-accent">МЕ</span>льников —{" "}
              <span className="text-me-accent">МЕ</span>бель
            </h1>
            <p className="font-display text-xl md:text-2xl text-muted-foreground">
              Индивидуальная корпусная мебель
              <br />и текстильное оформление интерьера
            </p>
            <p className="font-body text-muted-foreground leading-relaxed max-w-lg">
              Кухни, шкафы, гардеробные, шторы и системы солнцезащиты.
              Работаем по индивидуальным проектам.
              Нас рекомендуют друзьям.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollTo("#contact-form")}
                className="bg-primary text-primary-foreground px-7 py-3.5 rounded-md font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
              >
                Заказать замер
              </button>
              <button
                onClick={() => scrollTo("#portfolio-furniture")}
                className="border border-foreground/15 text-foreground px-7 py-3.5 rounded-md font-medium transition-all duration-200 hover:bg-foreground/5"
              >
                Смотреть работы
              </button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-card">
              <img
                src={heroImage}
                alt="Интерьер кухни от Мельников-Мебель"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
