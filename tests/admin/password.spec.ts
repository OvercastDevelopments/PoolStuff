import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "../helpers/login";
import { resetAdmin } from "../helpers/reset-admin";

test.beforeEach(async ({ page }) => {
  await loginAsAdmin(page);
});

test.afterEach(async () => {
  // Reset admin back to known state so the rest of the suite still logs in.
  await resetAdmin();
});

test.describe("Admin change password", () => {
  test("renders the form", async ({ page }) => {
    await page.goto("/admin/password");
    await expect(page.getByRole("heading", { name: /change password/i })).toBeVisible();
    await expect(page.getByLabel(/current password/i)).toBeVisible();
    await expect(page.getByLabel(/^new password/i)).toBeVisible();
    await expect(page.getByLabel(/confirm new password/i)).toBeVisible();
  });

  test("rejects a mismatched confirmation", async ({ page }) => {
    await page.goto("/admin/password");
    await page.getByLabel(/current password/i).fill("password");
    await page.getByLabel(/^new password/i).fill("longpassword1");
    await page.getByLabel(/confirm new password/i).fill("different-one-1");
    await page.getByRole("button", { name: /update password/i }).click();
    await expect(page.getByText(/don't match/i)).toBeVisible();
  });

  test("rejects a wrong current password", async ({ page }) => {
    await page.goto("/admin/password");
    await page.getByLabel(/current password/i).fill("not-the-real-one");
    await page.getByLabel(/^new password/i).fill("longpassword1");
    await page.getByLabel(/confirm new password/i).fill("longpassword1");
    await page.getByRole("button", { name: /update password/i }).click();
    await expect(page.getByText(/current password is incorrect/i)).toBeVisible();
  });

  test("succeeds with correct data and shows the ok banner", async ({ page }) => {
    await page.goto("/admin/password");
    await page.getByLabel(/current password/i).fill("password");
    await page.getByLabel(/^new password/i).fill("newlongpassword1");
    await page.getByLabel(/confirm new password/i).fill("newlongpassword1");
    await page.getByRole("button", { name: /update password/i }).click();
    await expect(page.getByText(/password updated/i)).toBeVisible();
  });
});
