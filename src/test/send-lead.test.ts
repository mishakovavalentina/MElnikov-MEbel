import { afterEach, describe, expect, it, vi } from "vitest";
// @ts-expect-error — серверная функция написана на JS без типов
import handler, { buildMessage, normalizePhone } from "../../netlify/functions/send-lead.mjs";
import { isValidPhone } from "@/lib/phone";

const post = (body: unknown) =>
  new Request("https://example.test/.netlify/functions/send-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const valid = { name: "Анна", phone: "8 (916) 123-45-67", comment: "", consent: true };

describe("проверка телефона", () => {
  it.each(["+7 916 123-45-67", "89161234567", "9161234567"])("принимает %s", (p) => {
    expect(isValidPhone(p)).toBe(true);
    expect(normalizePhone(p)).toBe("+79161234567");
  });
  it.each(["123", "+1 212 555 0100 1", "59161234567"])("отклоняет %s", (p) => {
    expect(isValidPhone(p)).toBe(false);
    expect(normalizePhone(p)).toBeNull();
  });
});

describe("сообщение в Telegram", () => {
  it("помечает заявку с именем ТЕСТ как тестовую", () => {
    const text = buildMessage({ name: "ТЕСТ", phone: "+79000000000", comment: "" });
    expect(text).toContain("ТЕСТОВАЯ заявка");
  });
  it("экранирует HTML в имени и комментарии", () => {
    const text = buildMessage({ name: "<b>x</b>", phone: "+79000000000", comment: "a & b" });
    expect(text).toContain("&lt;b&gt;x&lt;/b&gt;");
    expect(text).toContain("a &amp; b");
  });
});

describe("функция send-lead", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  const setup = () => {
    vi.stubEnv("TELEGRAM_LEAD_BOT_TOKEN", "test-token");
    vi.stubEnv("TELEGRAM_LEAD_CHAT_ID", "42");
    const fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  };

  it("отправляет корректную заявку в Telegram", async () => {
    const fetchMock = setup();
    const res = await handler(post(valid));
    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    const sent = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(sent.chat_id).toBe("42");
    expect(sent.text).toContain("+7 916 123-45-67");
  });

  it("не отправляет без согласия на ПДн", async () => {
    const fetchMock = setup();
    const res = await handler(post({ ...valid, consent: false }));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("не отправляет с неверным телефоном", async () => {
    const fetchMock = setup();
    const res = await handler(post({ ...valid, phone: "123" }));
    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("молча отбрасывает спам-ботов", async () => {
    const fetchMock = setup();
    const res = await handler(post({ ...valid, website: "spam.example" }));
    expect(res.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("сообщает об ошибке, если переменные не настроены", async () => {
    vi.stubGlobal("fetch", vi.fn());
    const res = await handler(post(valid));
    expect(res.status).toBe(500);
  });
});
