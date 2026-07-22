import { test, expect } from "@playwright/test";

test.describe("Products catalog", () => {
  test("lists products and lets the user open one", async ({ page }) => {
    await page.goto("/products");
    await expect(page.getByRole("heading", { name: /commercial products/i, level: 1 })).toBeVisible();
    // At least one card link and a "View details" affordance
    const firstCard = page.locator('a[href^="/product/"]').first();
    await expect(firstCard).toBeVisible();
    await firstCard.click();
    await expect(page).toHaveURL(/\/product\//);
    await expect(page.getByRole("link", { name: /back to/i })).toBeVisible();
  });

  test("catalog search filters product cards", async ({ page }) => {
    await page.goto("/products");
    const search = page.getByRole("searchbox", { name: /search products/i });
    await search.fill("dolphin");
    // Filter counter updates once state settles (uses fancy quotes around the query)
    await expect(page.getByText(/matching\s+.dolphin/i)).toBeVisible();
    // Every visible card should mention "dolphin"
    const headings = page.locator('a[href^="/product/"] h3');
    const count = await headings.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      await expect(headings.nth(i)).toContainText(/dolphin/i);
    }
  });

  test("category dropdown filters by category", async ({ page }) => {
    await page.goto("/products");
    await page.getByLabel(/filter by category/i).selectOption("Water Testing");
    await expect(page.getByText(/in Water Testing/i)).toBeVisible();
    // Every visible card should be in Water Testing
    const categoryTags = page.locator('a[href^="/product/"] span:has-text("Water Testing")');
    expect(await categoryTags.count()).toBeGreaterThan(0);
  });

  test("Reset button clears search and category", async ({ page }) => {
    await page.goto("/products?category=Aquarobics&q=belt");
    await expect(page.getByText(/in Aquarobics/)).toBeVisible();
    await page.getByRole("button", { name: /reset/i }).click();
    await expect(page.getByLabel(/filter by category/i)).toHaveValue("All");
  });
});
