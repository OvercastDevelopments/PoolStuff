import type { Page } from "@playwright/test";

export async function loginAsAdmin(page: Page) {
  await page.goto("/admin/login");
  await page.getByLabel(/username/i).fill("admin");
  await page.getByLabel(/password/i).fill("password");
  await page.getByRole("button", { name: /sign in/i }).click();
  await page.waitForURL(/\/admin\/?$/);
}
