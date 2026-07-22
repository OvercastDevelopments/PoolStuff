import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "../helpers/login";

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});

test.describe("Admin products list", () => {
  test("shows the search + filter form and the product table", async ({ page }) => {
    await page.goto("/admin/products");
    await expect(page.getByRole("heading", { name: /^products$/i })).toBeVisible();
    await expect(page.getByPlaceholder(/search products/i)).toBeVisible();
    await expect(page.getByRole("combobox").first()).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(page.getByRole("button", { name: /^filter$/i })).toBeVisible();
    // Table headers (exact so "Category" doesn't match "Sub-category")
    for (const header of ["Product", "Category", "Sub-category", "Price", "New", "Actions"]) {
      await expect(page.getByRole("columnheader", { name: header, exact: true })).toBeVisible();
    }
  });

  test("filter form submits and narrows the list", async ({ page }) => {
    await page.goto("/admin/products");
    await page.getByPlaceholder(/search products/i).fill("dolphin");
    await page.getByRole("button", { name: /^filter$/i }).click();
    await expect(page).toHaveURL(/q=dolphin/);
    const rowCount = await page.getByRole("row").count();
    // At least one dolphin row + the header
    expect(rowCount).toBeGreaterThan(1);
  });
});

test.describe("Admin create + edit + delete flow", () => {
  const uniqueName = `E2E Test Widget ${Date.now()}`;

  test("creates a new product", async ({ page }) => {
    await page.goto("/admin/products/new");
    await expect(page.getByRole("heading", { name: /add product/i })).toBeVisible();

    await page.getByLabel(/^Name$/).fill(uniqueName);
    // Category dropdown defaults to first — leave it. Blurb is required.
    await page.getByLabel(/^Blurb$/).fill("Automated test product.");
    await page.getByLabel(/^Price$/).fill("$1");

    await page.getByRole("button", { name: /create product/i }).click();
    await expect(page).toHaveURL(/\/admin\/products/);
    // Toast confirms save
    await expect(page.getByText(/^created\.?$/i)).toBeVisible();
    // Row appears in the table
    await expect(page.getByRole("cell", { name: uniqueName })).toBeVisible();
  });

  test("edits the product just created", async ({ page }) => {
    await page.goto("/admin/products");
    const row = page.getByRole("row", { name: new RegExp(uniqueName, "i") });
    await row.getByRole("link", { name: /^edit$/i }).click();
    await expect(page.getByRole("heading", { name: /edit product/i })).toBeVisible();

    const newBlurb = "Automated test product — edited.";
    await page.getByLabel(/^Blurb$/).fill(newBlurb);
    await page.getByRole("button", { name: /save changes/i }).click();
    await expect(page).toHaveURL(/\/admin\/products/);
    await expect(page.getByText(/^saved\.?$/i)).toBeVisible();
  });

  test("deletes the product just created", async ({ page }) => {
    await page.goto("/admin/products");
    const row = page.getByRole("row", { name: new RegExp(uniqueName, "i") });
    await row.getByRole("button", { name: /^delete$/i }).click();
    await expect(page.getByText(/^deleted\.?$/i)).toBeVisible();
    await expect(page.getByRole("cell", { name: uniqueName })).not.toBeVisible();
  });
});
