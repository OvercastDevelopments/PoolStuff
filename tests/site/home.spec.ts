import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero heading and CTAs", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /commercial pool expertise/i, level: 1 }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: /view products/i })).toBeVisible();
    // "Request a Proposal" appears in both the hero and the closing CTA
    await expect(page.getByRole("link", { name: /request a proposal/i }).first()).toBeVisible();
  });

  test("hero search bar takes the user to /products with a query", async ({ page }) => {
    const search = page.getByRole("searchbox", { name: /search products/i });
    await search.fill("dolphin");
    await page.getByRole("button", { name: /search/i }).click();
    await expect(page).toHaveURL(/\/products\?q=dolphin/);
    await expect(page.getByRole("heading", { name: /commercial products/i })).toBeVisible();
  });

  test("brand strip shows the suppliers heading and 6 logos", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /suppliers of the world/i }),
    ).toBeVisible();
    // The brand strip renders 6 logo images
    const brandNames = ["ANTI Wave", "Empex Water Toys", "Lovibond", "Maytronics", "Para Mobility", "SR Smith"];
    for (const name of brandNames) {
      await expect(page.getByRole("img", { name })).toBeVisible();
    }
  });

  test("has a footer with the PoolStuff address", async ({ page }) => {
    await expect(page.getByText(/PoolStuff Limited/).first()).toBeVisible();
    await expect(page.getByText(/40 Andromeda Crescent/)).toBeVisible();
  });
});
