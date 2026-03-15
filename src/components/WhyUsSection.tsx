import { Ruler, Palette, ScanLine, Hammer, Truck } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const advantages = [
  { icon: Palette, title: "Индивидуальные проекты", desc: "Каждый заказ создается под конкретный интерьер" },
  { icon: ScanLine, title: "Подбор материалов", desc: "Помогаем выбрать фурнитуру, ткани и решения" },
  { icon: Ruler, title: "Точный замер", desc: "Учитываем все особенности помещения" },
  { icon: Hammer, title: "Качественное изготовление", desc: "Работаем аккуратно и профессионально" },
  { icon: Truck, title: "Монтаж под ключ", desc: "Доставка и установка без лишних хлопот" },
];

const WhyUsSection = () => (
  <section className="py-20 lg:py-28 bg-muted/50">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 max-w-2xl">
          Почему клиенты рекомендуют нас друзьям
        </h2>
      </AnimatedSection>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {advantages.map((a, i) => (
          <AnimatedSection key={a.title} delay={i * 0.08}>
            <div className="bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full">
              <a.icon className="w-7 h-7 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-display text-base font-bold mb-2">{a.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{a.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
