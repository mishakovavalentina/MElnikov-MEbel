import { Armchair, Scissors, Sun } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const directions = [
  {
    icon: Armchair,
    title: "Корпусная мебель",
    items: ["Кухни", "Шкафы", "Гардеробные", "Мебель по индивидуальным размерам"],
  },
  {
    icon: Scissors,
    title: "Интерьерный текстиль",
    items: ["Дизайн штор", "Пошив штор", "Покрывала", "Декоративный текстиль"],
  },
  {
    icon: Sun,
    title: "Солнцезащитные системы",
    items: ["Горизонтальные жалюзи", "Вертикальные жалюзи", "Рулонные системы", "Жалюзи плиссе"],
  },
];

const DirectionsSection = () => (
  <section id="directions" className="py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Чем мы занимаемся
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl">
          Комплексные решения для интерьера.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-3 gap-6">
        {directions.map((d, i) => (
          <AnimatedSection key={d.title} delay={i * 0.1}>
            <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
              <d.icon className="w-8 h-8 text-primary mb-5" strokeWidth={1.5} />
              <h3 className="font-display text-xl font-bold mb-4">{d.title}</h3>
              <ul className="space-y-2">
                {d.items.map((item) => (
                  <li key={item} className="text-muted-foreground font-body text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default DirectionsSection;
