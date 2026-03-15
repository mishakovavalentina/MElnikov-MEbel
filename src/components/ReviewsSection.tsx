import { Star } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const reviews = [
  { name: "Анна К.", text: "Заказали кухню — результат превзошёл ожидания. Всё точно по размерам, качество на высоте. Уже порекомендовали друзьям!" },
  { name: "Дмитрий С.", text: "Шкаф-купе идеально вписался в нишу. Ребята внимательно отнеслись ко всем пожеланиям. Монтаж быстрый и аккуратный." },
  { name: "Елена М.", text: "Шторы и покрывала подобрали идеально под интерьер. Чувствуется профессиональный подход к текстилю." },
  { name: "Сергей В.", text: "Гардеробная получилась функциональной и красивой. Продумали каждый сантиметр. Очень довольны!" },
];

const ReviewsSection = () => (
  <section id="reviews" className="py-20 lg:py-28">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">
          Отзывы клиентов
        </h2>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 gap-6">
        {reviews.map((r, i) => (
          <AnimatedSection key={i} delay={i * 0.1}>
            <div className="bg-card rounded-2xl p-8 shadow-card h-full flex flex-col">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 flex-1">«{r.text}»</p>
              <p className="font-display font-bold text-sm">{r.name}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
