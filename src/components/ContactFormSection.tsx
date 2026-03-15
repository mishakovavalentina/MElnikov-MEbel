import { useState } from "react";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";

const ContactFormSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Заполните имя и телефон");
      return;
    }
    setSubmitted(true);
    toast.success("Заявка отправлена! Мы перезвоним в течение 30 минут.");
  };

  return (
    <section id="contact-form" className="py-20 lg:py-28 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8 max-w-xl">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
            Закажите бесплатный замер
          </h2>

          {submitted ? (
            <div className="bg-card rounded-2xl p-8 shadow-card text-center">
              <p className="font-display text-xl font-bold text-primary mb-2">Спасибо!</p>
              <p className="text-muted-foreground">Мы перезвоним вам в течение 30 минут.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-card space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">Имя</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-input rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Телефон</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-input rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow"
                  placeholder="+7 (___) ___-__-__"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Комментарий</label>
                <textarea
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  rows={3}
                  className="w-full bg-input rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
                  placeholder="Расскажите о вашем проекте"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
              >
                Записаться на замер
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactFormSection;
