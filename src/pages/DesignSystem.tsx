import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Страница-витрина дизайн-системы: /design-system
 * Все значения взяты из реального кода проекта (src/index.css,
 * tailwind.config.ts и компонентов). Ничего не придумано.
 */

const tokens = [
  { name: "primary", value: "hsl(30 44% 60%)", usage: "акцент бренда: кнопки, иконки, «МЕ» в логотипе", className: "bg-primary" },
  { name: "primary-foreground", value: "hsl(0 0% 100%)", usage: "текст на primary-кнопках", className: "bg-[hsl(0_0%_100%)] border border-border" },
  { name: "chocolate", value: "hsl(25 47% 20%)", usage: "тёмно-коричневый CTA «Заказать замер»", className: "bg-chocolate" },
  { name: "secondary / accent", value: "hsl(34 30% 74%)", usage: "вторичный тон (бежевый), hover-фоны", className: "bg-secondary" },
  { name: "background", value: "hsl(0 0% 97%)", usage: "фон страницы", className: "bg-background border border-border" },
  { name: "foreground", value: "hsl(0 0% 17%)", usage: "основной текст", className: "bg-foreground" },
  { name: "card", value: "hsl(0 0% 100%)", usage: "фон карточек и формы", className: "bg-card border border-border" },
  { name: "muted", value: "hsl(30 10% 94%)", usage: "приглушённый фон (секции через bg-muted/50)", className: "bg-muted" },
  { name: "muted-foreground", value: "hsl(0 0% 45%)", usage: "второстепенный текст", className: "bg-muted-foreground" },
  { name: "input", value: "hsl(0 0% 94%)", usage: "фон полей формы на лендинге", className: "bg-input" },
  { name: "border", value: "hsl(0 0% 17% / 0.08)", usage: "границы (foreground с прозрачностью 8%)", className: "bg-foreground/[0.08]" },
  { name: "ring", value: "hsl(30 44% 60%)", usage: "focus-кольцо полей и кнопок", className: "bg-ring" },
  { name: "destructive", value: "hsl(0 84% 60%)", usage: "ошибки, разрушающие действия", className: "bg-destructive" },
];

const strayColors = [
  { name: "amber-600", value: "#d97706", usage: "кнопки в Login и CabinetChat", className: "bg-amber-600" },
  { name: "amber-700", value: "#b45309", usage: "hover тех же кнопок", className: "bg-amber-700" },
  { name: "amber-400", value: "#fbbf24", usage: "focus-граница полей в Login", className: "bg-amber-400" },
  { name: "amber-50 / amber-800", value: "#fffbeb / #92400e", usage: "активный пункт меню кабинета", className: "bg-amber-50 border border-border" },
  { name: "gray-50…700", value: "#f9fafb…#374151", usage: "фоны, границы и текст кабинета и Login", className: "bg-gray-200" },
];

const spacingRows = [
  { cls: "py-20 lg:py-28", px: "80 / 112 px", width: 112, usage: "вертикальный ритм всех 10 секций лендинга" },
  { cls: "px-4 lg:px-8", px: "16 / 32 px", width: 32, usage: "горизонтальные поля контейнера (container mx-auto)" },
  { cls: "mb-12", px: "48 px", width: 48, usage: "отступ от заголовка секции до контента" },
  { cls: "gap-12", px: "48 px", width: 48, usage: "сетка hero (текст + фото)" },
  { cls: "p-8", px: "32 px", width: 32, usage: "внутренний отступ карточек и формы" },
  { cls: "gap-6", px: "24 px", width: 24, usage: "сетка карточек направлений" },
  { cls: "space-y-5", px: "20 px", width: 20, usage: "поля внутри формы заявки" },
  { cls: "space-y-6", px: "24 px", width: 24, usage: "блоки текста в hero" },
];

const radiusRows = [
  { cls: "rounded-md", px: "14 px", note: "кнопки и поля лендинга (calc(var(--radius) − 2px))" },
  { cls: "rounded-lg", px: "16 px", note: "пункты меню кабинета (= var(--radius) = 1rem)" },
  { cls: "rounded-xl", px: "12 px", note: "поля формы в Login (Tailwind по умолчанию)" },
  { cls: "rounded-2xl", px: "16 px", note: "карточки, форма заявки, фото (Tailwind по умолчанию)" },
];

const SectionTitle = ({ title, note }: { title: string; note?: string }) => (
  <div className="mb-8">
    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{title}</h2>
    {note && <p className="text-muted-foreground text-lg max-w-2xl">{note}</p>}
  </div>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">{children}</p>
);

const Divergence = ({ title = "Разнобой в проекте", children }: { title?: string; children: React.ReactNode }) => (
  <div className="mt-8 rounded-2xl border border-primary/40 bg-primary/5 p-6">
    <p className="font-body text-sm font-semibold text-primary mb-3">⚠ {title}</p>
    <div className="font-body text-sm text-foreground/80 leading-relaxed space-y-2">{children}</div>
  </div>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono text-[13px] bg-muted px-1.5 py-0.5 rounded">{children}</code>
);

const DesignSystem = () => (
  <div className="min-h-screen bg-background text-foreground">
    {/* Шапка страницы */}
    <header className="border-b border-border">
      <div className="container mx-auto px-4 lg:px-8 py-10">
        <p className="font-body text-sm text-muted-foreground mb-2">
          <Link to="/" className="hover:text-primary transition-colors">← На главную</Link>
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
          Дизайн-система <span className="text-me-accent">МЕ</span>бель
        </h1>
        <p className="font-body text-muted-foreground max-w-2xl leading-relaxed">
          Живая витрина текущего стиля проекта. Все значения взяты из{" "}
          <Code>src/index.css</Code>, <Code>tailwind.config.ts</Code> и реальных компонентов.
          Жёлтые блоки отмечают места, где стиль разошёлся, и предлагают эталон.
        </p>
      </div>
    </header>

    <main className="container mx-auto px-4 lg:px-8 divide-y divide-border">
      {/* ЦВЕТА */}
      <section className="py-14">
        <SectionTitle title="Цвета" note="Палитра задана CSS-переменными в src/index.css и подключена в tailwind.config.ts." />
        <SubTitle>Токены темы (эталон)</SubTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tokens.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-4 shadow-card">
              <div className={`h-14 rounded-md mb-3 ${t.className}`} />
              <p className="font-mono text-sm font-medium">{t.name}</p>
              <p className="font-mono text-xs text-muted-foreground mb-1">{t.value}</p>
              <p className="font-body text-xs text-muted-foreground">{t.usage}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <SubTitle>Цвета вне палитры (кабинет и Login)</SubTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {strayColors.map((t) => (
              <div key={t.name} className="bg-card rounded-2xl p-4 shadow-card">
                <div className={`h-14 rounded-md mb-3 ${t.className}`} />
                <p className="font-mono text-sm font-medium">{t.name}</p>
                <p className="font-mono text-xs text-muted-foreground mb-1">{t.value}</p>
                <p className="font-body text-xs text-muted-foreground">{t.usage}</p>
              </div>
            ))}
          </div>
        </div>

        <Divergence>
          <p>
            Лендинг использует токены темы, а кабинет и страница входа — захардкоженные{" "}
            <Code>amber-*</Code> и <Code>gray-*</Code>. Рядом живут два «фирменных» оттенка:{" "}
            <Code>primary hsl(30 44% 60%)</Code> и <Code>amber-600 #d97706</Code> — близкие, но разные.
          </p>
          <p>
            <strong>Эталон:</strong> токен <Code>primary</Code>. Замены: <Code>bg-amber-600 hover:bg-amber-700</Code> →{" "}
            <Code>bg-primary hover:bg-primary/90</Code>; <Code>focus:border-amber-400</Code> →{" "}
            <Code>focus:ring-primary</Code>; <Code>bg-amber-50 text-amber-800</Code> →{" "}
            <Code>bg-primary/10 text-primary</Code>; <Code>gray-50/100/200</Code> →{" "}
            <Code>background / muted / border</Code>; <Code>text-gray-400…700</Code> →{" "}
            <Code>text-muted-foreground / text-foreground</Code>.
          </p>
        </Divergence>
      </section>

      {/* ТИПОГРАФИКА */}
      <section className="py-14">
        <SectionTitle title="Типографика" note="Playfair Display — заголовки (задано глобально для h1–h6), Inter — основной текст. Подключены в src/index.css." />
        <div className="space-y-8">
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-2">H1 · text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight · Playfair Display (HeroSection)</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              <span className="text-me-accent">МЕ</span>льников — <span className="text-me-accent">МЕ</span>бель
            </h1>
          </div>
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-2">Подзаголовок · font-display text-xl md:text-2xl text-muted-foreground</p>
            <p className="font-display text-xl md:text-2xl text-muted-foreground">Индивидуальная корпусная мебель и текстильное оформление интерьера</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-2">H2 секции · text-3xl md:text-4xl font-bold tracking-tight</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Чем мы занимаемся</h2>
          </div>
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-2">H3 карточки · font-display text-xl font-bold</p>
            <h3 className="font-display text-xl font-bold">Корпусная мебель</h3>
          </div>
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-2">Лид секции · text-lg text-muted-foreground</p>
            <p className="font-body text-lg text-muted-foreground">Комплексные решения для интерьера.</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-2">Основной текст · font-body (Inter) text-base leading-relaxed</p>
            <p className="font-body leading-relaxed max-w-lg">Кухни, шкафы, гардеробные, шторы и системы солнцезащиты. Работаем по индивидуальным проектам.</p>
          </div>
          <div>
            <p className="font-mono text-xs text-muted-foreground mb-2">Мелкий текст · text-sm · подписи, пункты списков, лейблы форм (font-medium)</p>
            <p className="font-body text-sm text-muted-foreground">Пошив штор, покрывала, декоративный текстиль</p>
          </div>
        </div>

        <Divergence>
          <p>
            H2 в <Code>FinalSection</Code> — <Code>text-2xl md:text-3xl</Code>, во всех остальных секциях —{" "}
            <Code>text-3xl md:text-4xl</Code>. В кабинете заголовок входа — <Code>text-2xl font-semibold</Code>,
            хотя везде используется <Code>font-bold</Code>.
          </p>
          <p>
            <strong>Эталон:</strong> H2 = <Code>text-3xl md:text-4xl font-bold tracking-tight</Code> (в FinalSection
            уменьшение оправдано длинной фразой — если оставлять, то осознанно как «H2-компакт»).
          </p>
        </Divergence>
      </section>

      {/* КНОПКИ */}
      <section className="py-14">
        <SectionTitle title="Кнопки" note="В проекте три несвязанных вида кнопок: «сырые» кнопки лендинга, shadcn/ui Button и amber-кнопки кабинета." />

        <SubTitle>Кнопки лендинга (Hero, FinalSection, форма) — эталон внешнего вида</SubTitle>
        <div className="flex flex-wrap items-center gap-4">
          <button className="bg-chocolate text-chocolate-foreground px-7 py-3.5 rounded-md font-medium transition-all duration-200 hover:bg-chocolate/90 hover:shadow-lg active:scale-95">
            Заказать замер
          </button>
          <button className="border border-foreground/15 text-foreground px-7 py-3.5 rounded-md font-medium transition-all duration-200 hover:bg-foreground/5">
            Смотреть работы
          </button>
          <button disabled className="bg-primary text-primary-foreground px-7 py-3.5 rounded-md font-medium disabled:opacity-60">
            Отправка… (disabled)
          </button>
        </div>
        <p className="font-mono text-xs text-muted-foreground mt-3">
          px-7 py-3.5 rounded-md font-medium · hover:opacity-90 hover:shadow-lg · active:scale-95 · disabled:opacity-60
        </p>

        <div className="mt-10">
          <SubTitle>shadcn/ui Button — варианты (components/ui/button.tsx)</SubTitle>
          <div className="flex flex-wrap items-center gap-4">
            <Button>default</Button>
            <Button variant="secondary">secondary</Button>
            <Button variant="outline">outline</Button>
            <Button variant="ghost">ghost</Button>
            <Button variant="link">link</Button>
            <Button variant="destructive">destructive</Button>
            <Button disabled>disabled</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Button size="sm">size sm · h-9</Button>
            <Button size="default">size default · h-10</Button>
            <Button size="lg">size lg · h-11</Button>
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-3">
            h-10 px-4 py-2 rounded-md text-sm font-medium · hover:bg-primary/90 · focus-visible:ring-2 ring-ring · disabled:opacity-50
          </p>
        </div>

        <div className="mt-10">
          <SubTitle>Amber-кнопка кабинета (Login, CabinetChat) — вне палитры</SubTitle>
          <div className="flex flex-wrap items-center gap-4">
            <Button className="bg-amber-600 hover:bg-amber-700">Войти</Button>
            <Button disabled className="bg-amber-600">Вход… (disabled)</Button>
          </div>
          <p className="font-mono text-xs text-muted-foreground mt-3">Button + переопределение bg-amber-600 hover:bg-amber-700</p>
        </div>

        <Divergence>
          <p>
            Одна и та же «главная» кнопка существует в трёх версиях: лендинг — крупная{" "}
            <Code>px-7 py-3.5</Code> с <Code>hover:opacity-90</Code> и <Code>active:scale-95</Code>;
            shadcn — <Code>h-10</Code> с <Code>hover:bg-primary/90</Code>; кабинет — shadcn, перекрашенная в amber.
            Ещё расходятся hover (прозрачность против затемнения) и disabled (<Code>opacity-60</Code> против <Code>opacity-50</Code>).
          </p>
          <p>
            <strong>Эталон:</strong> единый компонент <Code>Button</Code> из shadcn. Для лендинга добавить размер{" "}
            <Code>xl: "h-auto px-7 py-3.5 rounded-md"</Code> в <Code>buttonVariants</Code> и перевести «сырые» кнопки
            на <Code>&lt;Button size="xl"&gt;</Code>. Hover — единый <Code>hover:bg-primary/90</Code>, disabled —{" "}
            <Code>opacity-50</Code>, эффект <Code>active:scale-95</Code> можно перенести в базовые классы варианта.
            Amber-переопределения убрать (см. раздел «Цвета»).
          </p>
        </Divergence>
      </section>

      {/* КАРТОЧКИ */}
      <section className="py-14">
        <SectionTitle title="Карточки" note="Основной контейнер контента на лендинге." />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
            <h3 className="font-display text-xl font-bold mb-4">Карточка лендинга</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              <Code>bg-card rounded-2xl p-8 shadow-card</Code>, на hover — <Code>shadow-card-hover</Code> и подъём{" "}
              <Code>-translate-y-1</Code>. Наведите курсор.
            </p>
          </div>
          <div className="bg-card rounded-2xl p-8 shadow-card">
            <h3 className="font-display text-xl font-bold mb-4">Карточка формы</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Та же основа без hover-эффекта: <Code>bg-card rounded-2xl p-8 shadow-card</Code> (форма заявки, сообщение «Спасибо!»).
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="font-display text-xl font-bold mb-4">Карточка Login</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Отклонение: <Code>bg-white border-gray-200 shadow-sm</Code> вместо токенов и фирменной тени.
            </p>
          </div>
        </div>

        <Divergence>
          <p>
            Карточка Login задаёт границу и тень по-своему (<Code>border-gray-200 shadow-sm</Code>), остальные —
            фирменной тенью <Code>shadow-card</Code> без явной границы (тонкое кольцо уже встроено в тень).
          </p>
          <p>
            <strong>Эталон:</strong> <Code>bg-card rounded-2xl p-8 shadow-card</Code>; интерактивным карточкам —{" "}
            <Code>hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300</Code>.
          </p>
        </Divergence>
      </section>

      {/* ПОЛЯ ФОРМ */}
      <section className="py-14">
        <SectionTitle title="Поля форм" note="Три реализации: форма заявки на лендинге, поля Login и компонент Input из shadcn/ui." />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <SubTitle>Лендинг (форма заявки) — эталон</SubTitle>
            <label className="block text-sm font-medium mb-1.5">Имя</label>
            <input
              type="text"
              className="w-full bg-input rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow mb-4"
              placeholder="Ваше имя"
            />
            <label className="block text-sm font-medium mb-1.5">Комментарий</label>
            <textarea
              rows={2}
              className="w-full bg-input rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow resize-none"
              placeholder="Расскажите о вашем проекте"
            />
            <p className="font-mono text-xs text-muted-foreground mt-3">bg-input rounded-md px-4 py-3 text-sm · focus:ring-2 ring-primary</p>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <SubTitle>Login — вне палитры</SubTitle>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400"
              placeholder="you@example.com"
            />
            <p className="font-mono text-xs text-muted-foreground mt-3">border-gray-200 rounded-xl px-4 py-2.5 · focus:border-amber-400</p>
          </div>
          <div className="bg-card rounded-2xl p-6 shadow-card">
            <SubTitle>shadcn/ui Input</SubTitle>
            <label className="block text-sm font-medium mb-1.5">Поле</label>
            <Input placeholder="Компонент ui/input.tsx" />
            <p className="font-mono text-xs text-muted-foreground mt-3">h-10 border-input bg-background rounded-md px-3 · focus-visible:ring-2 ring-ring</p>
          </div>
        </div>

        <Divergence>
          <p>
            Разные фоны (<Code>bg-input</Code> / белый с границей), радиусы (<Code>rounded-md</Code> 14px /{" "}
            <Code>rounded-xl</Code> 12px), высоты (<Code>py-3</Code> / <Code>py-2.5</Code> / <Code>h-10</Code>) и
            focus-состояния (кольцо primary / граница amber / кольцо ring со смещением).
          </p>
          <p>
            <strong>Эталон:</strong> стиль лендинга — <Code>bg-input rounded-md px-4 py-3 text-sm focus:ring-2
            focus:ring-primary</Code>, лейбл <Code>text-sm font-medium mb-1.5</Code>. Практично зашить его в{" "}
            <Code>ui/input.tsx</Code> (заменить дефолтные классы) и использовать компонент везде, включая Login.
          </p>
        </Divergence>
      </section>

      {/* ОТСТУПЫ, РАДИУСЫ, ТЕНИ */}
      <section className="py-14">
        <SectionTitle title="Отступы, радиусы, тени" note="Пространственная система лендинга единообразна: у всех 10 секций одинаковый вертикальный ритм." />

        <SubTitle>Шкала отступов</SubTitle>
        <div className="bg-card rounded-2xl p-6 shadow-card space-y-3">
          {spacingRows.map((s) => (
            <div key={s.cls} className="grid grid-cols-[8rem_1fr] md:grid-cols-[10rem_8rem_1fr] items-center gap-3">
              <code className="font-mono text-xs">{s.cls}</code>
              <div className="hidden md:flex items-center gap-2">
                <div className="h-3 bg-primary/40 rounded-sm" style={{ width: `${s.width}px` }} />
                <span className="font-mono text-xs text-muted-foreground">{s.px}</span>
              </div>
              <span className="font-body text-xs text-muted-foreground">{s.usage}</span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <SubTitle>Радиусы (база --radius: 1rem)</SubTitle>
          <div className="flex flex-wrap gap-6">
            {radiusRows.map((r) => (
              <div key={r.cls} className="w-52">
                <div className={`h-20 bg-secondary/60 border border-foreground/10 ${r.cls} mb-2`} />
                <p className="font-mono text-xs">{r.cls} · {r.px}</p>
                <p className="font-body text-xs text-muted-foreground">{r.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <SubTitle>Тени</SubTitle>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-2xl p-6 shadow-card">
              <p className="font-mono text-xs mb-1">shadow-card</p>
              <p className="font-body text-xs text-muted-foreground">карточки и форма (кастомная, src/index.css)</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-card-hover">
              <p className="font-mono text-xs mb-1">shadow-card-hover</p>
              <p className="font-body text-xs text-muted-foreground">hover-состояние карточек</p>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-gray-200">
              <p className="font-mono text-xs mb-1">shadow-sm + border-gray-200</p>
              <p className="font-body text-xs text-muted-foreground">отклонение: карточка Login</p>
            </div>
          </div>
        </div>

        <Divergence>
          <p>
            Из-за переопределения радиусов в <Code>tailwind.config.ts</Code> шкала нелинейна:{" "}
            <Code>rounded-xl</Code> (12px, Tailwind по умолчанию) визуально <em>меньше</em>{" "}
            <Code>rounded-md</Code> (14px), а <Code>rounded-lg</Code> и <Code>rounded-2xl</Code> — одно и то же (16px).
          </p>
          <p>
            <strong>Эталон:</strong> два радиуса — <Code>rounded-md</Code> (14px) для контролов (кнопки, поля) и{" "}
            <Code>rounded-2xl</Code> (16px) для карточек и фото. <Code>rounded-xl</Code> в Login заменить на{" "}
            <Code>rounded-md</Code>. Тени — только <Code>shadow-card</Code> / <Code>shadow-card-hover</Code>{" "}
            (+ <Code>shadow-lg</Code> на hover primary-кнопок лендинга).
          </p>
        </Divergence>
      </section>
    </main>

    <footer className="border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <p className="font-body text-sm text-muted-foreground">
          Источники значений: <Code>src/index.css</Code> · <Code>tailwind.config.ts</Code> ·{" "}
          <Code>components/ui/button.tsx</Code> · <Code>HeroSection</Code> · <Code>ContactFormSection</Code> ·{" "}
          <Code>DirectionsSection</Code> · <Code>Login</Code> · <Code>CabinetLayout</Code>
        </p>
      </div>
    </footer>
  </div>
);

export default DesignSystem;
