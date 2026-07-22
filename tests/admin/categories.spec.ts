import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "../helpers/login";

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});

test.describe("Admin categories", () => {
  const testCategoryName = `E2E Category ${Date.now()}`;
  const testSubName = `E2E Sub ${Date.now()}`;

  const findNameInput = (value: string) =>
    `xpath=//input[@name='name' and @value=${JSON.stringify(value)}]`;

  test("shows the add-category form and the existing category rows", async ({ page }) => {
    await page.goto("/admin/categories");
    await expect(page.getByRole("heading", { name: /^categories$/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /add category/i })).toBeVisible();
    // Editable name inputs — expect several seed categories present
    const nameInputs = page.locator("form input[name='name']");
    expect(await nameInputs.count()).toBeGreaterThan(5);
  });

  test("creates a new category", async ({ page }) => {
    await page.goto("/admin/categories");
    const addForm = page.locator("form").filter({ hasText: /add category/i }).first();
    await addForm.locator('input[name="name"]').fill(testCategoryName);
    await addForm.locator('input[name="heroBlurb"]').fill("Automated test category.");
    await addForm.getByRole("button", { name: /add category/i }).click();
    await expect(page).toHaveURL(/saved=create/);
    await expect(page.getByText(/^created\.?$/i)).toBeVisible();
    // New category appears as an editable input with the new name in its value
    await expect(page.locator(findNameInput(testCategoryName))).toBeVisible();
  });

  test("adds a sub-category to the new category", async ({ page }) => {
    await page.goto("/admin/categories");
    const catInput = page.locator(findNameInput(testCategoryName));
    const categoryBlock = catInput
      .locator("xpath=ancestor::div[contains(@class,'rounded-2xl')][1]");
    const subForm = categoryBlock
      .locator("form")
      .filter({ has: page.getByRole("button", { name: /^\+ Add$/ }) })
      .first();
    await subForm.locator('input[name="name"]').fill(testSubName);
    await subForm.locator('input[name="icon"]').fill("🧪");
    await subForm.locator('input[name="blurb"]').fill("Automated test sub-category.");
    await subForm.getByRole("button", { name: /^\+ Add$/ }).click();
    await expect(page).toHaveURL(/saved=create/);
    await expect(page.locator(findNameInput(testSubName))).toBeVisible();
  });

  test("deletes the sub-category and then the category", async ({ page }) => {
    await page.goto("/admin/categories");

    // Delete the sub-category first
    const subInput = page.locator(findNameInput(testSubName));
    const subBlock = subInput.locator(
      "xpath=ancestor::div[contains(@class,'bg-white')][1]",
    );
    await subBlock.getByRole("button", { name: /^Delete$/ }).click();
    await expect(page.locator(findNameInput(testSubName))).toHaveCount(0);

    // Then delete the parent category
    const catInput = page.locator(findNameInput(testCategoryName));
    const catBlock = catInput.locator(
      "xpath=ancestor::div[contains(@class,'rounded-2xl')][1]",
    );
    await catBlock.getByRole("button", { name: /delete category/i }).click();
    await expect(page.locator(findNameInput(testCategoryName))).toHaveCount(0);
  });
});
