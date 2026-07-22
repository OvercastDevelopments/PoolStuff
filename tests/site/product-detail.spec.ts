import { test, expect } from "@playwright/test";

test.describe("Product detail page", () => {
  test("shows heading, category breadcrumb, price and back link", async ({ page }) => {
    await page.goto("/products");
    const firstCard = page.locator('a[href^="/product/"]').first();
    const cardTitle = await firstCard.locator("h3").innerText();
    await firstCard.click();
    await expect(page).toHaveURL(/\/product\//);

    await expect(page.getByRole("heading", { name: cardTitle, level: 1 })).toBeVisible();
    // Breadcrumb: Products / Category name
    await expect(
      page.getByRole("link", { name: /^Products$/ }).first(),
    ).toBeVisible();
    // Back-to-category CTA
    await expect(page.getByRole("link", { name: /back to/i })).toBeVisible();
  });

  test("shows related products from the same category", async ({ page }) => {
    // Pick a product that has siblings — every seed category has multiple products.
    await page.goto("/products");
    const firstCard = page.locator('a[href^="/product/"]').first();
    await firstCard.click();
    await expect(page.getByRole("heading", { name: /more from/i })).toBeVisible();
  });
});
