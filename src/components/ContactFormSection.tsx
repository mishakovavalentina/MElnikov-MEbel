import { useState } from "react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";
import { toast } from "sonner";
import { isValidPhone } from "@/lib/phone";

const FALLBACK_PHONE = "+7 905 771 6340";

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");

// Заявка уходит в серверную функцию Netlify, она пересылает её в Telegram.
// Токен бота хранится только на сервере и в браузер не попадает.
const sendLead = async (payload: { name: string; phone: string; comment: string; website: string }) => {
  const res = await fetch("/.netlify/functions/send-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...payload, consent: true }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Ошибка ${res.status}`);
  }
};

const inputClass =
  "w-full bg-input rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow";

const ContactFormSection = () => {
  const [form, setForm] = useState({ name: "", phone: "", comment: "", website: "" });
  const [consent, setConsent] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Заполните имя и телефон");
      return;
    }
    if (!isValidPhone(form.phone)) {
      setPhoneError("Проверьте номер: нужно 10 цифр после +7");
      return;
    }
    if (!consent) {
      toast.error("Отметьте согласие на обработку персональных данных");
      return;
    }
    setLoading(true);
    try {
      // Netlify Forms — резервная копия заявки, её сбой не считаем ошибкой отправки
      await Promise.all([
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({
            "form-name": "contact",
            name: form.name,
            phone: form.phone,
            comment: form.comment,
            consent: "да",
          }),
        }).catch(() => undefined),
        sendLead(form),
      ]);
      setSubmitted(true);
      toast.success("Заявка отправлена! Мы перезвоним в течение 30 минут.");
    } catch {
      toast.error(`Не удалось отправить заявку. Попробуйте ещё раз или позвоните: ${FALLBACK_PHONE}`);
    } finally {
      setLoading(false);
    }
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
            <form onSubmit={handleSubmit} noValidate className="bg-card rounded-2xl p-8 shadow-card space-y-5">
              <div>
                <label htmlFor="lead-name" className="block text-sm font-medium mb-1.5">Имя</label>
                <input
                  id="lead-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                  placeholder="Ваше имя"
                />
              </div>
              <div>
                <label htmlFor="lead-phone" className="block text-sm font-medium mb-1.5">Телефон</label>
                <input
                  id="lead-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => {
                    setForm({ ...form, phone: e.target.value });
                    if (phoneError) setPhoneError("");
                  }}
                  onBlur={() => {
                    if (form.phone.trim() && !isValidPhone(form.phone)) {
                      setPhoneError("Проверьте номер: нужно 10 цифр после +7");
                    }
                  }}
                  aria-invalid={!!phoneError}
                  aria-describedby={phoneError ? "lead-phone-error" : undefined}
                  className={`${inputClass} ${phoneError ? "ring-2 ring-destructive" : ""}`}
                  placeholder="+7 (___) ___-__-__"
                />
                {phoneError && (
                  <p id="lead-phone-error" className="text-destructive text-xs mt-1.5">{phoneError}</p>
                )}
              </div>
              <div>
                <label htmlFor="lead-comment" className="block text-sm font-medium mb-1.5">Комментарий</label>
                <textarea
                  id="lead-comment"
                  name="comment"
                  maxLength={1000}
                  value={form.comment}
                  onChange={(e) => setForm({ ...form, comment: e.target.value })}
                  rows={3}
                  className={`${inputClass} resize-none`}
                  placeholder="Расскажите о вашем проекте"
                />
              </div>

              {/* Ловушка для спам-ботов: поле скрыто от людей */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                className="hidden"
              />

              <label className="flex items-start gap-3 text-xs text-muted-foreground leading-relaxed cursor-pointer">
                <input
                  type="checkbox"
                  name="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-primary cursor-pointer"
                />
                <span>
                  Я даю{" "}
                  <Link to="/consent" target="_blank" className="underline hover:text-foreground">
                    согласие на обработку персональных данных
                  </Link>{" "}
                  и ознакомлен(а) с{" "}
                  <Link to="/privacy" target="_blank" className="underline hover:text-foreground">
                    политикой конфиденциальности
                  </Link>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading || !consent}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-md font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Отправка..." : "Записаться на замер"}
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
};

export default ContactFormSection;
