import AnimatedSection from "./AnimatedSection";

const FinalSection = () => {
  const scrollTo = () => {
    document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8 max-w-2xl text-center">
        <AnimatedSection>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 leading-snug">
            <span className="text-me-accent">МЕ</span>льников-
            <span className="text-me-accent">МЕ</span>бель — это мебель и текстиль,
            созданные специально для вашего интерьера.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Мы уделяем внимание деталям, качеству и удобству.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Большинство наших заказчиков приходят по рекомендациям.
          </p>
          <button
            onClick={scrollTo}
            className="bg-primary text-primary-foreground px-8 py-3.5 rounded-md font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-95"
          >
            Получить консультацию
          </button>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FinalSection;
