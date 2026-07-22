import { test, expect } from "@playwright/test";

test.describe("Admin login", () => {
  test("shows the login form and back-to-site link", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.getByRole("heading", { name: /poolstuff admin/i })).toBeVisible();
    await expect(page.getByLabel(/username/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /back to main site/i })).toBeVisible();
  });

  test("shows an error message for bad credentials", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/username/i).fill("admin");
    await page.getByLabel(/password/i).fill("wrong-password-here");
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page.getByText(/invalid username or password/i)).toBeVisible();
  });

  test("valid credentials land on /admin dashboard", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel(/username/i).fill("admin");
    await page.getByLabel(/password/i).fill("password");
    await page.getByRole("button", { name: /sign in/i }).click();
    await expect(page).toHaveURL(/\/admin\/?$/);
    await expect(page.getByRole("heading", { name: /dashboard/i })).toBeVisible();
  });

  test("visiting /admin without a session redirects to /admin/login", async ({ page, context }) => {
    await context.clearCookies();
    await page.goto("/admin");
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
