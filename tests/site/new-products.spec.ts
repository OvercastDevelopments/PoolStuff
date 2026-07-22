import { test, expect } from "@playwright/test";

test.describe("New Products page", () => {
  test("renders hero and either card grid or empty state", async ({ page }) => {
    await page.goto("/new-products");
    await expect(page.getByRole("heading", { name: /new products/i, level: 1 })).toBeVisible();
    await expect(page.getByText(/just added/i).first()).toBeVisible();

    const emptyState = page.getByText(/no new products at the moment/i);
    const anyCard = page.locator('a[href^="/product/"]');
    // Either the empty state OR at least one card must be visible
    const showsEmpty = await emptyState.isVisible().catch(() => false);
    if (!showsEmpty) {
      expect(await anyCard.count()).toBeGreaterThan(0);
    }
  });

  test('CTA panel "View All Products" links to /products', async ({ page }) => {
    await page.goto("/new-products");
    await page.getByRole("link", { name: /view all products/i }).first().click();
    await expect(page).toHaveURL(/\/products/);
  });
});
