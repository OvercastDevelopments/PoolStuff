import { test, expect } from "@playwright/test";

test.describe("Services page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/services");
  });

  test("shows the three headline services", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /our services/i, level: 1 })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /dolphin pool robot service centre/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /lovibond service centre/i }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /commercial aquatics pool fit outs/i }),
    ).toBeVisible();
  });

  test("closing CTA links to contact form", async ({ page }) => {
    await page.getByRole("link", { name: /request a proposal/i }).click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
