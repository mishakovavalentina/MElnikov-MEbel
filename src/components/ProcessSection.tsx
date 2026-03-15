import AnimatedSection from "./AnimatedSection";

const steps = [
  { num: "01", title: "Заявка и первичная консультация", desc: "Вы оставляете заявку на сайте или связываетесь по телефону." },
  { num: "02", title: "Выезд на замер", desc: "Мы приезжаем на объект и выполняем точные замеры." },
  { num: "03", title: "Подбор решений", desc: "Предлагаем варианты мебели, тканей и систем." },
  { num: "04", title: "Расчёт стоимости", desc: "Подготавливаем детальный расчёт проекта." },
  { num: "05", title: "Заключение договора", desc: "Фиксируем стоимость и сроки." },
  { num: "06", title: "Утверждение проекта", desc: "Согласовываем окончательную конфигурацию." },
  { num: "07", title: "Изготовление", desc: "Производим мебель или шьём текстиль." },
  { num: "08", title: "Доставка и монтаж", desc: "Доставляем и аккуратно устанавливаем изделия." },
];

const ProcessSection = () => (
  <section id="process" className="py-20 lg:py-28 bg-muted/50">
    <div className="container mx-auto px-4 lg:px-8">
      <AnimatedSection>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Как проходит работа
        </h2>
        <p className="text-muted-foreground text-lg mb-12 max-w-xl">
          Мы сопровождаем проект от идеи до установки.
        </p>
      </AnimatedSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <AnimatedSection key={s.num} delay={i * 0.06}>
            <div className="relative bg-card rounded-2xl p-6 shadow-card h-full">
              <span className="absolute top-4 right-4 font-display text-4xl font-bold text-foreground/[0.06]">
                {s.num}
              </span>
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mb-4">
                <span className="text-primary-foreground text-xs font-bold">{s.num}</span>
              </div>
              <h3 className="font-display text-base font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSection;
