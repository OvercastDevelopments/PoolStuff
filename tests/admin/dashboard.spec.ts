import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "../helpers/login";

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});

test.describe("Admin dashboard", () => {
  test("shows the sidebar with all nav entries", async ({ page }) => {
    const aside = page.locator("aside").first();
    await expect(aside.getByRole("link", { name: /^dashboard$/i })).toBeVisible();
    await expect(aside.getByRole("link", { name: /^products$/i })).toBeVisible();
    await expect(aside.getByRole("link", { name: /^categories$/i })).toBeVisible();
    await expect(aside.getByRole("link", { name: /change password/i })).toBeVisible();
    await expect(aside.getByRole("button", { name: /sign out/i })).toBeVisible();
  });

  test("stat tiles link into the admin sections", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /^dashboard$/i })).toBeVisible();
    // The stat tile that links to categories
    await page.getByRole("link", { name: /categories/i }).first().click();
    await expect(page).toHaveURL(/\/admin\/categories/);
  });

  test("quick actions have working links", async ({ page }) => {
    await page.getByRole("link", { name: /add a product/i }).click();
    await expect(page).toHaveURL(/\/admin\/products\/new/);
  });

  test("sign out returns you to the login page", async ({ page }) => {
    await page.getByRole("button", { name: /sign out/i }).click();
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
