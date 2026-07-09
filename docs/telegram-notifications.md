# Telegram-уведомления о сбоях CI

При падении CI (линт, сборка или тесты в `.github/workflows/ci.yml`) бот присылает в Telegram сообщение со ссылкой на логи упавшего запуска.

## Какие секреты нужны

Секреты добавляются в GitHub: **Settings → Secrets and variables → Actions → New repository secret**
(прямая ссылка: `https://github.com/mishakovavalentina/melnikov-mebel/settings/secrets/actions`).

| Секрет | Что это |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Токен бота уведомлений (выдаёт [@BotFather](https://t.me/BotFather)) |
| `TELEGRAM_CHAT_ID` | ID чата, куда слать уведомления (можно узнать через workflow «Telegram Check», см. ниже) |

Это **отдельные** секреты от `VITE_TELEGRAM_BOT_TOKEN` / `VITE_TELEGRAM_CHAT_ID`: те попадают в клиентский бандл сайта и используются формой обратной связи. Токен бота уведомлений в клиентский код не попадает.

## Настройка с нуля

1. Создайте бота у [@BotFather](https://t.me/BotFather) командой `/newbot` и скопируйте токен.
2. Добавьте токен в секрет `TELEGRAM_BOT_TOKEN`.
3. Напишите своему новому боту любое сообщение (например `/start`) — иначе бот не сможет ни узнать ваш chat_id, ни писать вам первым.
4. Запустите workflow **Actions → Telegram Check → Run workflow**. Он:
   - найдёт ваш chat_id через `getUpdates` и покажет его в summary запуска;
   - отправит тестовое сообщение «✅ Бот на связи!».
5. Сохраните показанный chat_id в секрет `TELEGRAM_CHAT_ID`.

После этого при любом сбое CI бот пришлёт уведомление автоматически. Если секреты не заданы, CI не падает из-за этого — шаг уведомления просто пропускается.

## Проверка связи

Workflow «Telegram Check» (`.github/workflows/telegram-check.yml`) можно запускать вручную в любой момент, чтобы убедиться, что бот на связи.
