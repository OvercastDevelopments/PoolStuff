import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("primary nav links navigate between pages", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation").first();

    await nav.getByRole("link", { name: "New Products" }).first().click();
    await expect(page).toHaveURL(/\/new-products/);
    await expect(page.getByRole("heading", { name: /new products/i, level: 1 })).toBeVisible();

    await nav.getByRole("link", { name: "Services" }).first().click();
    await expect(page).toHaveURL(/\/services/);
    await expect(page.getByRole("heading", { name: /our services/i, level: 1 })).toBeVisible();

    await nav.getByRole("link", { name: "About" }).first().click();
    await expect(page).toHaveURL(/\/about/);
    await expect(page.getByRole("heading", { name: /about poolstuff/i, level: 1 })).toBeVisible();

    await nav.getByRole("link", { name: "Contact" }).first().click();
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.getByRole("heading", { name: /contact us/i, level: 1 })).toBeVisible();
  });

  test("Products dropdown lists All Products plus each category", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /^products$/i }).click();
    const menu = page.getByRole("menu");
    await expect(menu).toBeVisible();
    await expect(menu.getByRole("menuitem", { name: /all products/i })).toBeVisible();
    // At least a handful of categories from the seed data
    for (const cat of ["Aquarobics", "Lifeguard Equipment", "Pool Cleaning", "Water Testing"]) {
      await expect(menu.getByRole("menuitem", { name: cat })).toBeVisible();
    }
  });

  test("clicking a category in the dropdown lands on that landing page", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: /^products$/i }).click();
    await page.getByRole("menuitem", { name: /aquarobics/i }).click();
    await expect(page).toHaveURL(/\/products\/aquarobics/);
    await expect(page.getByRole("heading", { name: /aquarobics/i, level: 1 })).toBeVisible();
  });

  test("nav logo returns to home", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("link", { name: /poolstuff home/i }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});
