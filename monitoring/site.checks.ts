import { test, expect, type Page } from "@playwright/test";

// Эталонные контакты: если на сайте окажутся другие, тест упадёт
const PHONE_DISPLAY = "+7 905 771 6340";
const PHONE_LINK = "tel:+79057716340";
const TELEGRAM_LINK = "https://t.me/MelnikovGV";

// Секции анимируются при прокрутке, а фото могут грузиться лениво,
// поэтому перед проверками медленно проходим страницу до конца
const scrollThroughPage = async (page: Page) => {
  await page.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForLoadState("networkidle");
};

test("сайт открывается и ключевые секции на месте", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/МЕбель/);
  await expect(
    page.getByRole("heading", { name: "Закажите бесплатный замер" }),
  ).toBeAttached();
});

test("все фотографии загружаются без «битых» картинок", async ({ page }) => {
  await page.goto("/");
  await scrollThroughPage(page);
  const brokenImages = await page.evaluate(async () => {
    const images = Array.from(document.images);
    await Promise.all(
      images.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
    return images
      .filter((img) => img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src);
  });
  expect(brokenImages).toEqual([]);
});

test("контакты на сайте совпадают с эталонными", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(`a[href="${PHONE_LINK}"]`).first()).toBeAttached();
  await expect(page.getByText(PHONE_DISPLAY).first()).toBeAttached();
  await expect(
    page.locator(`a[href="${TELEGRAM_LINK}"]`).first(),
  ).toBeAttached();
});

test("форма заявки: тестовая отправка доставляется", async ({ page }) => {
  await page.goto("/");
  await page.locator("#contact-form").scrollIntoViewIfNeeded();
  await page.getByPlaceholder("Ваше имя").fill("ТЕСТ — автопроверка сайта");
  await page.getByPlaceholder("+7 (___) ___-__-__").fill("+7 000 000 00 00");
  await page
    .getByPlaceholder("Расскажите о вашем проекте")
    .fill("Ежедневная автоматическая проверка формы. Не перезванивать.");
  await page.getByRole("button", { name: "Записаться на замер" }).click();
  // «Спасибо!» появляется только если Telegram подтвердил доставку сообщения
  await expect(page.getByText("Спасибо!")).toBeVisible({ timeout: 20_000 });
});
