# Спецификация продукта: МЕбель (MElnikov-MEbel)

## Описание

Сайт-визитка мебельного производства на заказ. Компания изготавливает мебель, занимается текстильным оформлением и монтажом солнцезащитных систем для частных клиентов. Сайт принимает заявки и служит витриной портфолио; вся операционная работа ведётся внутренними пользователями.

## Роли

| Роль | Описание |
|------|----------|
| `owner` | Владелец бизнеса, полный доступ |
| `assistant` | Помощник, ведёт сайт и заказы |
| Клиент | Анонимный посетитель, взаимодействует только через форму заявки; личного кабинета нет |

## Ключевые сценарии

1. **Приём заявки** — клиент заполняет форму на сайте, заявка поступает в систему и в Telegram администратору.
2. **Ведение заказа** — заявка конвертируется в заказ, который проходит 8 этапов: заявка → замер → подбор решений → расчёт стоимости → заключение договора → утверждение проекта → изготовление → доставка и монтаж.
3. **Договор** — к заказу прикрепляется внутренний договор с номером, суммой и файлом; клиентам недоступен.
4. **Гарантийное обращение** — после завершения заказа клиент может обратиться по гарантии; обращение фиксируется и ведётся до закрытия.

## Data

### User — внутренний пользователь

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | uuid PK | Идентификатор |
| `name` | text | Имя |
| `email` | text unique | Email для входа |
| `role` | enum | `owner` / `assistant` |
| `created_at` | timestamptz | Дата создания |

---

### Client — клиент

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | uuid PK | Идентификатор |
| `name` | text | Имя |
| `phone` | text | Телефон |
| `email` | text nullable | Email |
| `address` | text nullable | Адрес объекта |
| `notes` | text nullable | Внутренние заметки |
| `created_at` | timestamptz | Дата создания |

---

### Lead — заявка с сайта

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | uuid PK | Идентификатор |
| `client_id` | uuid FK → Client nullable | Привязка к клиенту (после идентификации) |
| `name` | text | Имя из формы |
| `phone` | text | Телефон из формы |
| `comment` | text nullable | Комментарий из формы |
| `source` | enum | `site` / `phone` / `referral` |
| `status` | enum | `new` / `converted` / `cancelled` |
| `created_at` | timestamptz | Дата поступления |

---

### Order — заказ

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | uuid PK | Идентификатор |
| `client_id` | uuid FK → Client | Клиент |
| `lead_id` | uuid FK → Lead nullable | Исходная заявка |
| `type` | enum | `furniture` / `textile` / `sun_protection` |
| `status` | enum | `new` / `measurement` / `solution_selection` / `estimation` / `contract` / `approved` / `production` / `delivery` / `completed` |
| `description` | text nullable | Описание проекта |
| `total_amount` | numeric nullable | Итоговая сумма |
| `created_at` | timestamptz | Дата создания |
| `completed_at` | timestamptz nullable | Дата завершения |

---

### Measurement — замер

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | uuid PK | Идентификатор |
| `order_id` | uuid FK → Order | Заказ |
| `scheduled_at` | timestamptz | Дата и время выезда |
| `address` | text | Адрес объекта |
| `notes` | text nullable | Заметки по замеру |
| `completed_at` | timestamptz nullable | Фактическое выполнение |

---

### Contract — договор (внутренний)

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | uuid PK | Идентификатор |
| `order_id` | uuid FK → Order | Заказ |
| `number` | text unique | Номер договора |
| `signed_at` | date nullable | Дата подписания |
| `amount` | numeric | Сумма по договору |
| `file_url` | text nullable | Ссылка на файл договора |
| `notes` | text nullable | Внутренние заметки |
| `created_at` | timestamptz | Дата создания |

---

### WarrantyClaim — гарантийное обращение

| Поле | Тип | Описание |
|------|-----|----------|
| `id` | uuid PK | Идентификатор |
| `order_id` | uuid FK → Order | Исходный заказ |
| `client_id` | uuid FK → Client | Клиент |
| `description` | text | Описание проблемы |
| `status` | enum | `new` / `in_progress` / `resolved` |
| `created_at` | timestamptz | Дата обращения |
| `resolved_at` | timestamptz nullable | Дата закрытия |

---

### Схема связей

```
[User]
  │
  │ ведёт
  ▼
[Lead] ──────────────────────→ [Client]
  │                                │
  │ конвертируется в               │
  ▼                                │
[Order] ←────────────────────────-┘
  │
  ├──→ [Measurement]
  ├──→ [Contract]
  └──→ [WarrantyClaim] ──→ [Client]
```

**Кардинальность:**

| Откуда | Куда | Связь |
|--------|------|-------|
| Client | Lead | 1 : N — один клиент может оставить несколько заявок |
| Client | Order | 1 : N — один клиент может иметь несколько заказов |
| Lead | Order | 1 : 0..1 — заявка конвертируется в один заказ или остаётся без конверсии |
| Order | Measurement | 1 : 0..1 — один замер на заказ |
| Order | Contract | 1 : 0..1 — один договор на заказ |
| Order | WarrantyClaim | 1 : N — несколько гарантийных обращений на один заказ |
