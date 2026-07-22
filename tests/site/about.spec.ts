import { test, expect } from "@playwright/test";

test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("renders the story and the signature", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /our story/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /customer support/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /experience/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /the finest products/i })).toBeVisible();
    // Signature line — the "& Sharlene" chunk only appears in the sign-off, not the team cards
    await expect(page.getByText("Scott & Sharlene Brearley")).toBeVisible();
  });

  test("shows both directors under Meet the Team", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /meet the team/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Scott Brearley" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Sharlene Brearley" })).toBeVisible();
    await expect(page.getByText("Director").first()).toBeVisible();
  });

  test('shows "What We Stand For" values', async ({ page }) => {
    await expect(page.getByRole("heading", { name: /what we stand for/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^reliability$/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^compliance$/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /^responsiveness$/i })).toBeVisible();
  });

  test("renders the shared brand strip", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: /suppliers of the world/i }),
    ).toBeVisible();
    await expect(page.getByRole("img", { name: "Maytronics" })).toBeVisible();
  });

  test("CTA panel Contact Us link goes to /contact", async ({ page }) => {
    await page.getByRole("link", { name: /contact us/i }).first().click();
    await expect(page).toHaveURL(/\/contact/);
  });
});
