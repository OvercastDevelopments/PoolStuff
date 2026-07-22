import { test, expect } from "@playwright/test";

test.describe("Category landing pages", () => {
  const categories = [
    { slug: "aquarobics", heading: /^Aquarobics$/ },
    { slug: "lifeguard-equipment", heading: /^Lifeguard Equipment$/ },
    { slug: "pool-cleaning", heading: /^Pool Cleaning$/ },
    { slug: "water-testing", heading: /^Water Testing$/ },
    { slug: "watertoys", heading: /^Watertoys$/ },
  ];

  for (const { slug, heading } of categories) {
    test(`/${slug} loads with hero and at least one sub-category tile`, async ({ page }) => {
      await page.goto(`/products/${slug}`);
      await expect(page.getByRole("heading", { name: heading, level: 1 })).toBeVisible();
      // Sub-category tiles link back into /products?category=&subcategory=
      const tiles = page.locator('a[href*="/products?category="]');
      const count = await tiles.count();
      expect(count).toBeGreaterThan(0);
    });
  }

  test("clicking a sub-category tile lands on the filtered catalog", async ({ page }) => {
    await page.goto("/products/aquarobics");
    const firstTile = page.locator('a[href*="subcategory="]').first();
    await firstTile.click();
    await expect(page).toHaveURL(/subcategory=/);
    await expect(
      page.getByRole("heading", { name: /commercial products/i, level: 1 }),
    ).toBeVisible();
  });
});
