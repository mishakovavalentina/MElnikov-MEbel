// Серверная функция Netlify: принимает заявку с сайта и отправляет её в Telegram.
// Токен бота и chat_id берутся из переменных окружения Netlify и в браузер не попадают.
// Адрес функции: /.netlify/functions/send-lead

const TEST_NAME = "ТЕСТ";

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });

// Приводит номер к виду +7XXXXXXXXXX; возвращает null, если номер не российский мобильный/городской
export const normalizePhone = (raw) => {
  const digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length === 10) return `+7${digits}`;
  if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) return `+7${digits.slice(1)}`;
  return null;
};

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const formatPhone = (p) =>
  `${p.slice(0, 2)} ${p.slice(2, 5)} ${p.slice(5, 8)}-${p.slice(8, 10)}-${p.slice(10, 12)}`;

export const buildMessage = ({ name, phone, comment, now = new Date() }) => {
  const when = now.toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const isTest = name.trim().toUpperCase() === TEST_NAME;
  const lines = [
    isTest ? "🧪 <b>ТЕСТОВАЯ заявка</b> — проверка сайта, не перезванивать" : "📋 <b>Новая заявка на замер!</b>",
    "",
    `👤 Имя: ${escapeHtml(name)}`,
    `📞 Телефон: ${formatPhone(phone)}`,
  ];
  if (comment) lines.push(`💬 Комментарий: ${escapeHtml(comment)}`);
  lines.push("", `🕒 ${when} (МСК)`, "✅ Согласие на обработку ПДн получено");
  return lines.join("\n");
};

export default async (req) => {
  if (req.method !== "POST") return json(405, { error: "Метод не поддерживается" });

  const token = process.env.TELEGRAM_LEAD_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_LEAD_CHAT_ID;
  if (!token || !chatId) return json(500, { error: "Отправка заявок не настроена" });

  let data;
  try {
    data = await req.json();
  } catch {
    return json(400, { error: "Некорректные данные" });
  }

  // Ловушка для ботов: скрытое поле, которое человек не заполняет
  if (data.website) return json(200, { ok: true });

  const name = String(data.name ?? "").trim().slice(0, 100);
  const comment = String(data.comment ?? "").trim().slice(0, 1000);
  const phone = normalizePhone(data.phone);

  if (!name) return json(400, { error: "Укажите имя" });
  if (!phone) return json(400, { error: "Укажите телефон в формате +7 XXX XXX-XX-XX" });
  if (data.consent !== true) return json(400, { error: "Нужно согласие на обработку персональных данных" });

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: buildMessage({ name, phone, comment }),
      parse_mode: "HTML",
    }),
  });

  if (!res.ok) {
    console.error("Telegram API error", res.status, await res.text());
    return json(502, { error: "Не удалось доставить заявку" });
  }
  return json(200, { ok: true });
};
