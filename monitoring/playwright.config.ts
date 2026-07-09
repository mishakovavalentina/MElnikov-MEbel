import { defineConfig } from "@playwright/test";

// Конфиг ежедневного мониторинга боевого сайта.
// Запуск: npx playwright test --config=monitoring/playwright.config.ts
// Адрес сайта можно переопределить переменной окружения SITE_URL.
export default defineConfig({
  testDir: ".",
  // *.checks.ts, а не *.spec.ts — чтобы файлы мониторинга не подхватывал vitest (npm run test)
  testMatch: "**/*.checks.ts",
  timeout: 60_000,
  retries: 1,
  reporter: [["list"]],
  use: {
    baseURL: process.env.SITE_URL || "https://melnikov-mebel.netlify.app",
    screenshot: "only-on-failure",
    // Для локального запуска можно указать свой браузер: CHROMIUM_PATH=/путь/к/chromium
    ...(process.env.CHROMIUM_PATH
      ? { launchOptions: { executablePath: process.env.CHROMIUM_PATH } }
      : {}),
  },
});
