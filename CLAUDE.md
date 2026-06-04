# CLAUDE.md

## 1. Название проекта и описание

- **Название:** МЕбель (MElnikov-MEbel)
- **Описание:** Сайт-визитка мебельного производства. Одностраничное приложение (SPA) для демонстрации услуг по изготовлению мебели на заказ, текстильного оформления и солнцезащитных систем. Целевая аудитория — частные клиенты, ищущие мебель и текстиль на заказ.

## 2. Технологический стек

- **React** 18 — библиотека UI
- **TypeScript** — язык разработки
- **Vite** 5 — сборщик и dev-сервер
- **Tailwind CSS** 3 — утилитарные стили
- **shadcn/ui** — библиотека UI-компонентов на базе Radix UI
- **React Router DOM** 6 — маршрутизация
- **@tanstack/react-query** — управление серверным состоянием
- **Framer Motion** — анимации
- **React Hook Form** + **Zod** — формы и валидация
- **Recharts** — графики
- **Lucide React** — иконки
- **date-fns** — работа с датами
- **Embla Carousel** — карусель
- **Vitest** — юнит-тесты
- **Playwright** — e2e-тесты
- **ESLint** — линтинг
- **PostCSS** + **Autoprefixer** — обработка CSS
- **Netlify** — хостинг и деплой
- **Lovable** — платформа, на которой изначально создан проект
- **Node.js** 20 (указано в `.nvmrc`)

## 3. Структура проекта

```
├── index.html              — Точка входа HTML (lang="ru"), содержит скрытую Netlify-форму
├── package.json            — Зависимости и скрипты
├── vite.config.ts          — Конфигурация Vite, алиас @ → ./src
├── tailwind.config.ts      — Конфигурация Tailwind CSS с кастомной темой
├── tsconfig.json           — Корневой конфиг TypeScript
├── tsconfig.app.json       — Конфиг TypeScript для приложения
├── tsconfig.node.json      — Конфиг TypeScript для Node-окружения
├── postcss.config.js       — Конфигурация PostCSS (Tailwind + Autoprefixer)
├── netlify.toml            — Конфигурация деплоя на Netlify
├── playwright.config.ts    — Конфигурация Playwright
├── playwright-fixture.ts   — Фикстура Playwright
├── .nvmrc                  — Версия Node.js (20)
├── .gitignore              — Игнорируемые файлы (node_modules/, dist/)
├── public/                 — Статические файлы (favicon.ico, robots.txt, placeholder.svg)
└── src/
    ├── main.tsx            — Точка входа React
    ├── App.tsx             — Корневой компонент с маршрутизацией
    ├── App.css             — Стили приложения
    ├── index.css           — Глобальные стили, CSS-переменные темы, шрифты
    ├── vite-env.d.ts       — Типы Vite
    ├── assets/             — Изображения (два уровня, см. ниже)
    │   ├── hero-kitchen.jpg               — фото для HeroSection
    │   ├── portfolio-curtains1.jpg        — шторы, используется в PortfolioTextile
    │   ├── portfolio-curtains2.jpg        — шторы, используется в PortfolioTextile
    │   ├── portfolio-blinds1.jpg          — жалюзи, используется в SunProtectionSection
    │   ├── portfolio-horizontal-blinds.jpg
    │   ├── portfolio-vertical-blinds.jpg
    │   ├── portfolio-pleated-blinds.jpg
    │   ├── portfolio-kitchen1.jpg         — устаревшие файлы (не используются в компонентах)
    │   ├── portfolio-kitchen2.jpg
    │   ├── portfolio-closet1.jpg
    │   ├── portfolio-wardrobe1.jpg
    │   ├── portfolio-wardrobe2.jpg
    │   ├── 20220419_021335.jpg            — оригинальные фото (не используются напрямую)
    │   ├── 20220419_021450.jpg
    │   ├── IMG-20220829-WA0029.jpg
    │   └── portfolio/                     — фото для PortfolioFurniture (Vite glob import)
    │       ├── kitchens/
    │       │   ├── light/    cover.jpg, photo-2.jpg, photo-3.jpg
    │       │   ├── dark/     cover.jpg, photo-2.jpg … photo-7.jpg
    │       │   ├── blue/     cover.jpg, photo-2.jpg, photo-3.jpg
    │       │   ├── minimal/  cover.jpg, photo-2.jpg
    │       │   └── studio/   cover.jpg, photo-2.jpg, photo-3.jpg
    │       ├── wardrobes/
    │       │   ├── classic/  cover.jpg, photo-2.jpg, photo-3.jpg, photo-4.jpg
    │       │   ├── hallway/  cover.jpg, photo-2.jpg
    │       │   └── bureau/   cover.jpg, photo-2.jpg
    │       └── dressing-rooms/
    │           └── luxury/   cover.jpg
    ├── components/         — React-компоненты
    │   ├── ui/             — shadcn/ui компоненты (button, dialog, card, toast и др.)
    │   ├── Header.tsx      — Шапка сайта
    │   ├── HeroSection.tsx — Главный баннер
    │   ├── DirectionsSection.tsx  — Секция направлений работы
    │   ├── WhyUsSection.tsx       — Секция «Почему мы»
    │   ├── PortfolioFurniture.tsx — Портфолио мебели
    │   ├── PortfolioTextile.tsx   — Портфолио текстиля
    │   ├── SunProtectionSection.tsx — Солнцезащитные системы
    │   ├── ProcessSection.tsx     — Секция процесса работы
    │   ├── ContactFormSection.tsx — Форма обратной связи (отправка в Telegram)
    │   ├── ContactsSection.tsx    — Контактная информация
    │   ├── FinalSection.tsx       — Финальная секция
    │   ├── FooterSection.tsx      — Подвал сайта
    │   ├── ReviewsSection.tsx     — Отзывы
    │   ├── AnimatedSection.tsx    — Обёртка для анимации секций
    │   └── NavLink.tsx            — Навигационная ссылка
    ├── hooks/              — Кастомные хуки
    │   ├── use-mobile.tsx  — Определение мобильного устройства
    │   └── use-toast.ts    — Хук для toast-уведомлений
    ├── lib/
    │   └── utils.ts        — Утилита cn() для объединения CSS-классов
    ├── pages/
    │   ├── Index.tsx       — Главная страница (собирает все секции)
    │   └── NotFound.tsx    — Страница 404
    └── test/
        ├── setup.ts        — Настройка тестов
        └── example.test.ts — Пример теста
```

## 4. Соглашения

### Правила именования
- Компоненты: PascalCase (`HeroSection.tsx`, `ContactFormSection.tsx`)
- Хуки: kebab-case с префиксом `use-` (`use-mobile.tsx`, `use-toast.ts`)
- Утилиты: camelCase (`utils.ts`)
- UI-компоненты shadcn: kebab-case (`alert-dialog.tsx`, `scroll-area.tsx`)
- CSS-переменные: kebab-case с префиксом `--` (`--primary`, `--background`)

### Правила по компонентам
- Каждый компонент — отдельный файл в `src/components/`
- UI-компоненты (shadcn) — в `src/components/ui/`
- Страницы — в `src/pages/`
- Компоненты экспортируются как `export default`
- Используются функциональные компоненты (стрелочные функции)

### Правила по импортам
- Алиас `@` указывает на `./src` (настроено в `vite.config.ts`)
- Импорты используют формат `@/components/...`, `@/hooks/...`, `@/lib/...`

### Правила по стилям
- Основной подход: утилитарные классы Tailwind CSS
- CSS-переменные определены в `src/index.css` для цветовой темы
- Шрифты: `Playfair Display` (заголовки), `Inter` (основной текст)
- Утилитарные классы `.font-display`, `.font-body`, `.shadow-card`, `.shadow-card-hover` определены в `index.css`
- Для объединения классов используется утилита `cn()` из `@/lib/utils`
- Тёмная тема подключена (`darkMode: ["class"]` в `tailwind.config.ts`), но CSS-переменные для тёмной темы не определены

### Общие принципы внесения изменений
- Проект собирается командой `npm run build`
- Dev-сервер запускается командой `npm run dev`
- Линтинг: `npm run lint`
- Тесты: `npm run test`
- Деплой происходит автоматически через Netlify при пуше

## 5. Environment

Переменные окружения, найденные в коде:

- `VITE_TELEGRAM_BOT_TOKEN` — токен Telegram-бота (используется в `ContactFormSection.tsx`)
- `VITE_TELEGRAM_CHAT_ID` — ID чата Telegram (используется в `ContactFormSection.tsx`)

## 6. Что Claude должен знать о проекте

- Это одностраничный сайт (SPA) с единственным маршрутом `/` и страницей 404
- Главная страница (`Index.tsx`) собирает секции в определённом порядке: Header → Hero → Directions → WhyUs → PortfolioFurniture → PortfolioTextile → SunProtection → Process → ContactForm → Contacts → Final → Footer
- Форма обратной связи отправляет данные в Telegram через Bot API (используя переменные окружения `VITE_TELEGRAM_BOT_TOKEN` и `VITE_TELEGRAM_CHAT_ID`)
- В `index.html` также есть скрытая форма Netlify Forms (поля: name, phone, comment)
- Язык сайта — русский (`<html lang="ru">`)
- Проект создан на платформе Lovable (lovable-tagger используется как dev-зависимость)
- Изображения — два уровня: плоские файлы в `src/assets/*.jpg` (герой, шторы, жалюзи) и структурированная папка `src/assets/portfolio/` с подпапками по категориям и наименованиям (kitchens/light, kitchens/dark, kitchens/blue, kitchens/minimal, kitchens/studio, wardrobes/classic, wardrobes/hallway, wardrobes/bureau, dressing-rooms/luxury). `PortfolioFurniture.tsx` загружает фото из `portfolio/` через `import.meta.glob`; остальные компоненты импортируют файлы напрямую
- Бэкенда нет — проект полностью клиентский

## 7. Язык и стиль работы

- Все пояснения к изменениям писать на русском языке
- Все commit messages писать на русском языке
- Сообщения коммитов должны быть короткими, конкретными и деловыми
- Не использовать расплывчатые commit messages вроде `fix`, `update`, `changes` без уточнения сути
- Если инструмент автоматически создаёт технические названия веток на английском, это допустимо
- Код, имена переменных, компонентов и файлов — на английском языке

## 8. Не делать

- Не хардкодить API-ключи и токены — только через `.env` и `import.meta.env`
- Не пушить в main напрямую — все изменения через PR
- Не коммитить `node_modules/`, `.env`, секреты и ключи
- Не коммитить папку `dist/` (она в `.gitignore`)
- Не удалять и не перемещать изображения из `src/assets/` без проверки, что они не используются в компонентах
- Не менять порядок секций на главной странице без явного запроса
- Не модифицировать shadcn/ui компоненты в `src/components/ui/` без необходимости — они генерируются автоматически
- Не удалять скрытую Netlify-форму из `index.html`

## Dogfooding: self-check before "готово"

После любой UI-правки или правки логики, влияющей на интерфейс, ты (Claude) обязан:

1. Сделать правку в коде.
2. Открыть URL приложения через Playwright MCP. URL — опубликованный (Lovable / Vercel / Netlify / GitHub Pages / прод) или локальный `http://localhost:PORT` от `npm run dev`, указан в README или в моём сообщении. Если Playwright MCP не подключён — остановись и попроси меня подключить, не пытайся симулировать проверку из кода.
3. Найти изменённый элемент и **прокликать связанный сценарий**: кнопку — нажать; форму — заполнить и отправить; переход — пройти; вкладку/раскрывашку/окошко — переключить. Сделать скриншоты до и после взаимодействия.
4. Посмотреть на скриншоты: правка реально применилась? клик/submit/переход сработал? не сломал ли соседнее? адаптив не съехал?
5. Если внешний вид или поведение сломаны — поправить и повторить. После двух итераций без прогресса — остановись и расскажи о тупике.
6. Сообщать "готово" только после подтверждения и внешнего вида, и поведения. Скриншоты прикладывай к финальному сообщению.
