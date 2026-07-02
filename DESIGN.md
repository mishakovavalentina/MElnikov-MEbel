# DESIGN.md — дизайн-система проекта МЕбель

Правила оформления интерфейса. Источник значений — `src/index.css` и `tailwind.config.ts`.
Живая витрина со всеми примерами — страница **`/design-system`** (`src/pages/DesignSystem.tsx`).

**Главное правило:** использовать токены темы (`primary`, `muted`, `border`…), а не сырые цвета
(`amber-600`, `gray-200`, hex). Существующие отклонения в кабинете и Login — техдолг, при правках
этих файлов приводить к эталонам ниже.

## 1. Цвета

Токены заданы CSS-переменными в `src/index.css` и подключены в `tailwind.config.ts`.

| Токен | Значение | Применение |
|---|---|---|
| `primary` | `hsl(30 44% 60%)` | акцент бренда: кнопки, иконки, «МЕ» в логотипе |
| `primary-foreground` | `hsl(0 0% 100%)` | текст на primary-кнопках |
| `secondary` / `accent` | `hsl(34 30% 74%)` | вторичный бежевый тон, hover-фоны |
| `background` | `hsl(0 0% 97%)` | фон страницы |
| `foreground` | `hsl(0 0% 17%)` | основной текст |
| `card` | `hsl(0 0% 100%)` | фон карточек и форм |
| `muted` | `hsl(30 10% 94%)` | приглушённый фон (секции — `bg-muted/50`) |
| `muted-foreground` | `hsl(0 0% 45%)` | второстепенный текст |
| `input` | `hsl(0 0% 94%)` | фон полей форм |
| `border` | `hsl(0 0% 17% / 0.08)` | границы (foreground с прозрачностью 8%) |
| `ring` | `hsl(30 44% 60%)` | focus-кольцо |
| `destructive` | `hsl(0 84% 60%)` | ошибки, разрушающие действия |

**Правила:**
- Новые цвета не вводить; нужен оттенок — производный от токена (`bg-primary/10`, `text-foreground/80`).
- Замены для legacy-кода: `bg-amber-600 hover:bg-amber-700` → `bg-primary hover:bg-primary/90`;
  `bg-amber-50 text-amber-800` → `bg-primary/10 text-primary`; `focus:border-amber-400` → `focus:ring-primary`;
  `bg-gray-50/100` → `bg-background` / `bg-muted`; `border-gray-200` → `border-border`;
  `text-gray-400…700` → `text-muted-foreground` / `text-foreground`.

## 2. Шрифты и размеры текста

- **Playfair Display** (serif) — заголовки `h1–h6` (задано глобально) и класс `.font-display`.
- **Inter** (sans) — основной текст, класс `.font-body`.

| Элемент | Классы |
|---|---|
| H1 (hero) | `text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight` |
| Подзаголовок hero | `font-display text-xl md:text-2xl text-muted-foreground` |
| H2 секции | `text-3xl md:text-4xl font-bold tracking-tight` |
| H3 карточки | `font-display text-xl font-bold` |
| Лид секции | `text-lg text-muted-foreground` |
| Основной текст | `font-body text-base leading-relaxed` |
| Мелкий текст, списки | `text-sm text-muted-foreground` |
| Лейбл поля | `text-sm font-medium` |

**Правила:** заголовки всегда `font-bold` (не `font-semibold`); H2 везде единого размера
`text-3xl md:text-4xl`; для акцента «МЕ» в названии — класс `.text-me-accent`.

## 3. Отступы

| Значение | Применение |
|---|---|
| `py-20 lg:py-28` | вертикальный ритм всех секций лендинга |
| `container mx-auto px-4 lg:px-8` | контейнер контента |
| `mb-12` | от заголовка секции до контента |
| `p-8` | внутренний отступ карточек и форм |
| `gap-6` | сетка карточек |
| `gap-12` | крупные сетки (hero: текст + фото) |
| `space-y-5` | поля внутри формы |

**Правило:** новые секции строить по схеме
`<section class="py-20 lg:py-28"><div class="container mx-auto px-4 lg:px-8">…`.

## 4. Радиусы и тени

- База: `--radius: 1rem`.
- **`rounded-md` (14px)** — контролы: кнопки, поля.
- **`rounded-2xl` (16px)** — карточки, формы, фото.
- `rounded-xl` (12px) и `rounded-lg` не использовать: из-за переопределения радиусов в
  `tailwind.config.ts` шкала нелинейна (`xl` меньше `md`, `lg` дублирует `2xl`).
- Тени: `shadow-card` — карточки; `shadow-card-hover` — их hover; `hover:shadow-lg` — primary-кнопки.
  `shadow-sm`/`shadow-md` не использовать.

## 5. Кнопки

Базовый компонент — `Button` из `src/components/ui/button.tsx` (варианты default / secondary /
outline / ghost / link / destructive; размеры sm / default / lg / icon).

Крупная кнопка лендинга (CTA): `px-7 py-3.5 rounded-md font-medium`.

Состояния primary-кнопки:

| Состояние | Классы |
|---|---|
| обычное | `bg-primary text-primary-foreground` |
| hover | `hover:bg-primary/90` (на лендинге + `hover:shadow-lg`) |
| нажатие | `active:scale-95` |
| фокус | `focus-visible:ring-2 focus-visible:ring-ring` |
| disabled | `opacity-50` (через `disabled:`) |

Вторичная кнопка (outline на лендинге): `border border-foreground/15 text-foreground hover:bg-foreground/5`.

**Правила:** hover затемнением (`bg-primary/90`), не прозрачностью (`hover:opacity-90` — legacy);
не перекрашивать `Button` через `className` в цвета вне палитры.

## 6. Поля форм

Эталон — форма заявки на лендинге (`ContactFormSection`):

- Поле: `w-full bg-input rounded-md px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary transition-shadow`
- Textarea: то же + `resize-none`
- Лейбл: `block text-sm font-medium mb-1.5`

## 7. Карточки

- База: `bg-card rounded-2xl p-8 shadow-card`
- Интерактивная: + `hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`
- Без собственных границ — тонкое кольцо уже встроено в `shadow-card`.
